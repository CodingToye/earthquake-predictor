import {JSX, useEffect, useRef} from "react";
import * as d3 from "d3";

import {getMetricStyles} from "@/config/metricStyleConfig";
import {EarthquakeData} from "@/hooks/types";

type Props = {
  earthquakes: EarthquakeData[];
  metricKey: keyof EarthquakeData;
  label: string;
  width?: number;
  height?: number;
};

const Margin = {top: 20, right: 30, bottom: 40, left: 40};

export default function LineChartByMetric({
  earthquakes,
  metricKey,
  label,
  width = 400,
  height = 200,
}: Props): JSX.Element {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || earthquakes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - Margin.left - Margin.right;
    const innerHeight = height - Margin.top - Margin.bottom;

    // Parse and sort data
    const data = earthquakes
      .filter((d) => d[metricKey] !== null && d.date_time)
      .map((d) => ({
        date: new Date(d.date_time),
        value: d[metricKey] as number,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    // Scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)!])
      .nice()
      .range([innerHeight, 0]);

    // Axes
    const xAxis = d3
      .axisBottom<Date>(x)
      .ticks(5)
      .tickFormat(d3.timeFormat("%b %d"));
    const yAxis = d3.axisLeft(y).ticks(5);

    const {stroke, fill} = getMetricStyles(metricKey);

    const g = svg
      .append("g")
      .attr("transform", `translate(${Margin.left},${Margin.top})`);

    g.append("g").attr("transform", `translate(0,${innerHeight})`).call(xAxis);

    g.append("g").call(yAxis);

    // Line generator
    const line = d3
      .line<{date: Date; value: number}>()
      .x((d) => x(d.date))
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", stroke)
      .attr("stroke-width", 2)
      .attr("d", line);

    // Optional: Circles for each point
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.value))
      .attr("r", 3)
      .attr("fill", fill);
  }, [earthquakes, metricKey, label, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
}

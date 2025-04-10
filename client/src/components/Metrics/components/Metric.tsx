// components/Metrics/components/Metric.tsx

import Icon from "@mui/material/Icon";

import Tooltip from "@/shared/Tooltip";

import {BaseMetricProps} from "./types";

export default function Metric({
  label,
  realValue,
  predictedValue,
  showPredicted,
  format,
  fixedPoint,
  valueSuffix,
  iconClass,
  iconName,
  barClass,
  tooltip,
}: BaseMetricProps) {
  const valueToShow =
    showPredicted && predictedValue !== undefined ? predictedValue : realValue;

  return (
    <div className="text-white flex flex-col items-center gap-1  p-4 cursor-pointer">
      <span className="group">
        <Tooltip text={tooltip}>
          <span className="text-white/60 uppercase text-xs flex gap-1 items-center">
            <Icon className={iconClass} sx={{fontSize: 16}}>
              {iconName}
            </Icon>{" "}
            {label}
          </span>
        </Tooltip>
      </span>
      {!barClass ? (
        <span className="text-1xl">
          {format
            ? format(valueToShow as string | number)
            : typeof valueToShow === "number" && fixedPoint !== undefined
            ? valueToShow.toFixed(fixedPoint)
            : valueToShow ?? "-"}
          {valueSuffix && <small className="text-xs"> {valueSuffix}</small>}
        </span>
      ) : (
        <span className={`block w-full h-1 grow rounded ${barClass}`}></span>
      )}
    </div>
  );
}

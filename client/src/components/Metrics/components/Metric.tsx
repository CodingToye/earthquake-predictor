// components/Metrics/components/Metric.tsx

import Icon from "@mui/material/Icon";
import clsx from "clsx";

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
  onClick,
  predictionAvailable,
}: BaseMetricProps) {
  const valueToShow =
    showPredicted && predictedValue !== undefined ? predictedValue : realValue;

  return (
    <div
      className="text-white flex flex-col items-center gap-1  p-4 cursor-pointer relative"
      onClick={onClick}
    >
      <span className="group">
        <Tooltip text={tooltip}>
          <span className="text-white/60 uppercase text-xs flex gap-1 items-center">
            <Icon className={iconClass} sx={{fontSize: 16}}>
              {iconName}
            </Icon>
            {label}
          </span>
        </Tooltip>
      </span>
      {!barClass ? (
        <span
          className={clsx(
            "text-sm transition-colors",
            showPredicted
              ? predictedValue !== undefined
                ? "text-blue-400 animate-pulse"
                : "text-white/20"
              : "text-white/80"
          )}
        >
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

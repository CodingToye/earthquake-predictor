import Icon from "@mui/material/Icon";

import Tooltip from "@/shared/Tooltip";
import {MetricProps} from "./types";

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
}: MetricProps) {
  const valueToShow =
    showPredicted && predictedValue !== undefined ? predictedValue : realValue;

  return (
    <div className="text-white flex flex-col items-center gap-1 border p-4 cursor-pointer">
      <Icon className={iconClass}>{iconName}</Icon>
      <span className="group">
        <Tooltip text={tooltip}>
          <span className="text-white/60 uppercase text-xs">{label}</span>
        </Tooltip>
      </span>
      {!barClass ? (
        <span className="text-3xl">
          {format
            ? format(valueToShow as string | number)
            : typeof valueToShow === "number" && fixedPoint !== undefined
            ? valueToShow.toFixed(fixedPoint)
            : valueToShow ?? "-"}
          {valueSuffix && <small className="text-xs">{valueSuffix}</small>}
        </span>
      ) : (
        <span className={`block w-18 h-1 grow rounded ${barClass}`}></span>
      )}
    </div>
  );
}

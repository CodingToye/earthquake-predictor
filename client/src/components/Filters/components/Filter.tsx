// components/Filters/components/Filter.tsx

import {getTrackBackground, Range} from "react-range";
import Icon from "@mui/material/Icon";

import {FilterProps} from "./types";

export default function Filter({
  label,
  unit,
  min,
  max,
  step,
  values,
  isActive,
  onToggle,
  onChange,
  extraClass,
}: FilterProps) {
  return (
    <div
      className={`${extraClass} flex items-center gap-4 transition-opacity relative ${
        isActive ? "opacity-75" : "opacity-25"
      }  `}
    >
      <div
        className="flex flex-col items-start gap-4 p-4 text-white/60 text-sm w-full rounded hover:bg-white/10 border-1 border-transparent hover:border-black/80 inset-shadow-sm hover:inset-shadow-black/30 transition cursor-pointer"
        onClick={onToggle}
      >
        <label className="flex flex-col items-start">
          <div className="flex items-center gap-1 mb-1">
            <Icon
              className={`${isActive ? "text-yellow-500" : "text-white/60"}`}
              sx={{fontSize: 12}}
              data-testid="toggle-icon"
            >
              lightbulb
            </Icon>
            {label}{" "}
          </div>
          <span className="text-green-100">
            {values.join(" - ")}
            {unit && ` ${unit}`}
          </span>
        </label>
        <Range
          step={step}
          min={min}
          max={max}
          values={values}
          onChange={onChange}
          disabled={!isActive}
          renderTrack={({props, children}) => (
            <div
              {...props}
              className="w-full h-2 rounded inset-shadow-sm inset-shadow-black/30"
              style={{
                ...props.style,
                background: getTrackBackground({
                  values,
                  colors:
                    values.length === 2
                      ? [
                          "rgb(6, 13, 23)",
                          "rgb(11, 110, 181)",
                          "rgb(6, 13, 23)",
                        ]
                      : ["rgb(11, 110, 181)", "rgb(6, 13, 23)"],
                  min,
                  max,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({props}) => (
            <div
              {...props}
              key={props.key}
              className="w-4 h-4 rounded-full bg-blue-400 border-1 border-black/70 shadow"
            />
          )}
        />
      </div>
    </div>
  );
}

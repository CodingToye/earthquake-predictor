import {getTrackBackground, Range} from "react-range";

import {FilterProps} from "@/components/Filters/components/types";
export default function ZoomControl({
  min,
  max,
  step,
  values,
  isActive,
  onChange,
}: FilterProps) {
  return (
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
          className="w-full h-2 rounded"
          style={{
            ...props.style,
            background: getTrackBackground({
              values,
              colors:
                values.length === 2
                  ? ["#d1d5db", "rgb(186, 255, 102)", "#d1d5db"]
                  : ["rgb(186, 255, 102)", "#d1d5db"],
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
          className="w-4 h-4 rounded-full bg-white border-2 border-green-100 shadow"
        />
      )}
    />
  );
}

// shared/Tooltip.tsx

import {TooltipProps} from "./types";
export default function Tooltip({
  children,
  text,
  position = "top",
}: TooltipProps) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };
  return (
    <div className="group inline-block">
      {children}
      <div
        className={`absolute z-50 p-4 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${positionClasses[position]}`}
      >
        {text}
      </div>
    </div>
  );
}

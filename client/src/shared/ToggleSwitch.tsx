// shared/ToggleSwitch.tsx

import {ToggleSwitchProps} from "./types";

export default function ToggleSwitch({
  labelLeft = "Off",
  labelRight = "On",
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`${
          checked ? "text-white/10" : "text-white/50"
        } text-sm transition`}
      >
        {labelLeft}
      </span>
      <label className="relative inline-flex items-center cursor-pointer w-11 h-6">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-full h-full bg-black/40 inset-shadow-sm inset-shadow-black/30 rounded-full peer-checked:bg-blue-200/10 transition-colors duration-300" />
        <div className="absolute left-1 top-1 w-4 h-4 bg-blue-400 border-black/70 peer-checked:border-black/40 border rounded-full shadow-md transition-transform duration-300 transform peer-checked:translate-x-5" />
      </label>
      <span
        className={`${
          checked ? "text-white/50" : "text-white/10"
        } text-sm transition`}
      >
        {labelRight}
      </span>
    </div>
  );
}

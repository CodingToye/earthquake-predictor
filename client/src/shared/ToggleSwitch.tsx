// shared/ToggleSwitch.tsx

import {ToggleSwitchProps} from "./types";

export default function ToggleSwitch({
  labelLeft = "Off",
  labelRight = "On",
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-white/50 text-sm">{labelLeft}</span>
      <label className="relative inline-flex items-center cursor-pointer w-11 h-6">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
        />
        <div className="w-full h-full bg-white/60 rounded-full peer-checked:bg-green-100 transition-colors duration-300" />
        <div className="absolute left-1 top-1 w-4 h-4 bg-white border-green-100 peer-checked:border-black/40 border rounded-full shadow-md transition-transform duration-300 transform peer-checked:translate-x-5" />
      </label>
      <span className="text-white/50 text-sm">{labelRight}</span>
    </div>
  );
}

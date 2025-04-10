// shared/Input.tsx

import {Icon} from "@mui/material";

import {InputProps} from "./types";
export default function Input({inputType, placeholder, onKeyDown}: InputProps) {
  const inputClasses = "block w-full flex items-center relative text-2xl     ";
  return (
    <div className={inputClasses}>
      <Icon className="absolute left-2 text-white/20 peer-focus:text-blue-100">
        search
      </Icon>
      <input
        className="peer w-full py-1 pl-10 text-white/60 placeholder:text-white/20 focus:placeholder:text-white/40 bg-black/40 focus:bg-blue-200/10 outline-0 focus:ring-0 focus:ring-offset-0 inset-shadow-sm focus:inset-shadow-black/30 rounded transition-all"
        type={inputType}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

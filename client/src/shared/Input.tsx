import {KeyboardEventHandler} from "react";

type InputProps = {
  inputType: string;
  placeholder: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export default function Input({inputType, placeholder, onKeyDown}: InputProps) {
  const inputClasses = "block w-full py-1 px-2 bg-gray-100";
  return (
    <input
      type={inputType}
      placeholder={placeholder}
      className={inputClasses}
      onKeyDown={onKeyDown}
    />
  );
}

// shared/types.ts

import {KeyboardEventHandler, ReactNode} from "react";

export type ToggleSwitchProps = {
  labelLeft?: string;
  labelRight?: string;
  checked: boolean;
  onChange: () => void;
};

export type InputProps = {
  inputType: string;
  placeholder: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export type TooltipProps = {
  children: ReactNode;
  text?: string;
  position?: "top" | "bottom" | "left" | "right";
};

// shared/Drawer.tsx

import {useEffect, useRef} from "react";
import clsx from "clsx";

type DrawerProps = {
  isOpen: boolean;
  children: React.ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
  duration?: number;
};

export default function Drawer({
  isOpen,
  children,
  direction = "bottom",
  duration = 300,
}: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isVertical = direction === "top" || direction === "bottom";
    const styleProp = isVertical ? "height" : "width";
    const scrollProp = isVertical ? "scrollHeight" : "scrollWidth";

    const transitionEnd = () => {
      if (isOpen && el) {
        el.style[styleProp] = "auto";
      }
      el.removeEventListener("transitionend", transitionEnd);
    };

    if (isOpen) {
      el.style.opacity = "0";
      el.style[styleProp] = "0px";

      requestAnimationFrame(() => {
        el.style[styleProp] = `${el[scrollProp]}px`;
        el.style.opacity = "1";
        el.addEventListener("transitionend", transitionEnd);
      });
    } else {
      el.style[styleProp] = `${el[scrollProp]}px`;
      el.style.opacity = "1";
      requestAnimationFrame(() => {
        el.style[styleProp] = "0px";
        el.style.opacity = "0";
      });
    }
  }, [isOpen, direction]);

  const transitionTarget =
    direction === "top" || direction === "bottom" ? "height" : "width";

  const baseStyle = {
    transition: `${transitionTarget} ${duration}ms ease, opacity ${duration}ms ease`,
    overflow: "hidden",
    opacity: isOpen ? 1 : 0,
  };

  return (
    <div
      ref={ref}
      style={baseStyle}
      className={clsx(
        "w-full",
        direction === "top" && "origin-top",
        direction === "bottom" && "origin-bottom",
        direction === "left" && "origin-left",
        direction === "right" && "origin-right",
        "transition-all"
      )}
    >
      {children}
    </div>
  );
}

import React from "react";

type PanelProps = {
  children: React.ReactNode;
  padding?: string | number;
};

export default function Panel({children, padding}: PanelProps) {
  return (
    <section
      className={`p-${
        padding ? padding : 0
      } w-100 bg-linear-to-b from-black/30 to-black/40 text-white/80 border-1 border-black/60 shadow-md rounded flex flex-col items-start backdrop-blur-xs`}
    >
      {children}
    </section>
  );
}

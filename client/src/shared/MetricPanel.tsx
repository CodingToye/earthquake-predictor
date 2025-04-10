// shared/MetricPanel.tsx

import {useEffect, useRef} from "react";
import {Icon} from "@mui/material";

import {AllMetricConfig} from "@/hooks/types";
type MetricPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  activeMetric: AllMetricConfig | null;
};

export default function MetricPanel({
  isOpen,
  onClose,
  children,
  activeMetric,
}: MetricPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="fixed w-100 right-4 top-100 bg-linear-to-b from-black/30 to-black/40 text-white/80 border-1 border-black/60 shadow-md rounded flex flex-col items-start backdrop-blur-xs"
    >
      <header
        className={`"text-white/80 hover:text-white/80" "text-white/30"
        flex justify-between items-center gap-2 w-full px-4 py-2 `}
      >
        <div className="flex items-center gap-2">
          <Icon className={activeMetric?.iconClass} sx={{fontSize: 16}}>
            {activeMetric?.iconName}
          </Icon>
          <h3 className="">{activeMetric?.label}</h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Close panel"
          type="button"
          className="cursor-pointer"
        >
          <Icon sx={{fontSize: 16}}>close</Icon>
        </button>
      </header>
      <main className="p-4">
        {children || <p className="text-sm text-gray-500">No content yet.</p>}
      </main>
    </div>
  );
}

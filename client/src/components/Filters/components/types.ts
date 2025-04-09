// components/Filters/components/types

export type FilterProps = {
  label: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  values: number[];
  isActive: boolean;
  extraClass?: string;
  onToggle: () => void;
  onChange: (values: number[]) => void;
};

// components/Filters/Filters.tsx

import {useState} from "react";
import Icon from "@mui/material/Icon";

import {useDistanceUnit} from "@/hooks/useDistanceUnit";
import Drawer from "@/shared/Drawer";

import Filter from "./components/Filter";
import {FiltersProps} from "./types";

export default function Filters({
  filters,
  setFilterActive,
  setFilterValue,
  showImperial,
  nearbyCount,
}: FiltersProps) {
  const [toggleFilters, setToggleFilters] = useState(false);
  const {convertDistance, suffix} = useDistanceUnit(showImperial);
  const toKm = (mi: number): number => mi / 0.621371;

  function handleToggleFilters() {
    setToggleFilters(!toggleFilters);
  }
  return (
    <>
      <header
        className={`${
          toggleFilters ? "text-white/80 hover:text-white/80" : "text-white/30"
        } flex items-center gap-2 py-2 px-2 transition-all  w-full hover:text-white/50 `}
      >
        <Icon>filter_list</Icon>
        <h3 className="cursor-pointer" onClick={handleToggleFilters}>
          Filters
        </h3>
      </header>
      <Drawer isOpen={toggleFilters} direction="bottom">
        <div className="w-full px-2 pb-4 grid grid-cols-2 items-start gap-0 debug">
          <Filter
            label="Radius"
            unit={suffix}
            min={convertDistance(10, 0)}
            max={convertDistance(4000, 0)}
            step={convertDistance(10, 0)}
            values={[
              showImperial
                ? convertDistance(filters.radius.value, 0)
                : Math.round(filters.radius.value),
            ]}
            isActive={filters.radius.active}
            onToggle={() => setFilterActive("radius", !filters.radius.active)}
            onChange={([val]) =>
              setFilterValue("radius", {
                value: showImperial ? toKm(val) : val,
              })
            }
            extraClass="col-span-2"
          />

          <Filter
            label="Magnitude"
            min={0}
            max={10}
            step={0.1}
            values={[filters.magnitude.min, filters.magnitude.max]}
            isActive={filters.magnitude.active}
            onToggle={() =>
              setFilterActive("magnitude", !filters.magnitude.active)
            }
            onChange={([min, max]) => setFilterValue("magnitude", {min, max})}
          />

          <Filter
            label="Year"
            min={1993}
            max={2023}
            step={1}
            values={[filters.yearRange.min, filters.yearRange.max]}
            isActive={filters.yearRange.active}
            onToggle={() =>
              setFilterActive("yearRange", !filters.yearRange.active)
            }
            onChange={([min, max]) => setFilterValue("yearRange", {min, max})}
          />
        </div>
      </Drawer>
      <footer className="p-2 bg-black/40 w-full border-t-1 border-black/60">
        {nearbyCount ? (
          <p className="text-white/50 text-sm">
            Showing {nearbyCount} nearby earthquake(s)
          </p>
        ) : (
          <p className="text-white/50 text-sm">0 earthquakes nearby</p>
        )}
      </footer>
    </>
  );
}

import {useState} from "react";
import {Range, getTrackBackground} from "react-range";
import Icon from "@mui/material/Icon";
import {FiltersProps} from "./types";

export default function Filters({
  filters,
  setFilterActive,
  setFilterValue,
  nearbyCount,
}: FiltersProps) {
  const [toggleFilters, setToggleFilters] = useState(true);
  const MAG_MIN = 0;
  const MAG_MAX = 10;
  const STEP = 0.1;
  const YEAR_MIN = 1993;
  const YEAR_MAX = 2023;

  function handleToggleFilters() {
    setToggleFilters(!toggleFilters);
  }
  return (
    <section className="filters flex flex-col items-start mb-4">
      <header
        className={`${
          toggleFilters ? "text-green-100" : "text-white/30"
        } flex items-center gap-2 mb-4 transition-all`}
      >
        <Icon>filter_list</Icon>
        <h3 className="cursor-pointer" onClick={handleToggleFilters}>
          Filters
        </h3>
        {nearbyCount ? (
          <p className="text-white/50 text-sm">
            Showing {nearbyCount} nearby earthquake(s)
          </p>
        ) : (
          <p className="text-white/50 text-sm">0 earthquakes nearby</p>
        )}
      </header>
      <div
        className={`bg-white/10 p-4 w-full rounded-2xl grid grid-cols-2 items-start gap-4 mb-4 ${
          toggleFilters ? "flex" : "hidden"
        }`}
      >
        <div
          className={`col-span-2 flex items-center gap-2 transition-opacity relative ${
            filters.radius.active ? "opacity-75" : "opacity-25"
          } px-4 py-2 rounded-2xl bg-white/20`}
        >
          <Icon
            className={`absolute top-2 right-2 cursor-pointer ${
              filters.radius.active ? "text-yellow-500" : "text-white/60"
            }`}
            fontSize="small"
            onClick={() => setFilterActive("radius", !filters.radius.active)}
          >
            lightbulb
          </Icon>
          <div className="flex flex-col items-start gap-4 py-2 text-white/60 text-sm w-full">
            <label htmlFor="radiusRange" className="text-white/50 text-sm">
              Radius -{" "}
              <span className="text-green-100">{filters.radius.value}km</span>
            </label>
            <Range
              values={[filters.radius.value]}
              step={10}
              min={10}
              max={4000}
              onChange={([value]) => setFilterValue("radius", {value})}
              disabled={!filters.radius.active}
              renderTrack={({props, children}) => (
                <div
                  {...props}
                  className="w-full h-2 rounded bg-gray-300"
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: [filters.radius.value],
                      colors: ["rgb(186, 255, 102)", "#d1d5db"], // green to gray
                      min: 10,
                      max: 4000,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({props}) => (
                <div
                  {...props}
                  key={props.key}
                  className="w-4 h-4 rounded-full bg-white border-2 border-green-100 shadow"
                />
              )}
            />
          </div>
        </div>

        <div
          className={`flex items-center gap-4 transition-opacity relative ${
            filters.magnitude.active ? "opacity-75" : "opacity-25"
          } px-4 py-2 rounded-2xl bg-white/20`}
        >
          <Icon
            className={`absolute top-2 right-2 cursor-pointer ${
              filters.magnitude.active ? "text-yellow-500" : "text-white/60"
            }`}
            onClick={() =>
              setFilterActive("magnitude", !filters.magnitude.active)
            }
            fontSize="small"
          >
            lightbulb
          </Icon>
          <div className="flex flex-col items-start gap-4 py-2  text-white/60 text-sm w-full">
            <label>
              Magnitude Range{" "}
              <span className="text-green-100">
                {filters.magnitude.min.toFixed(1)} -{" "}
                {filters.magnitude.max.toFixed(1)}
              </span>
            </label>

            <Range
              values={[filters.magnitude.min, filters.magnitude.max]}
              step={STEP}
              min={MAG_MIN}
              max={MAG_MAX}
              onChange={([min, max]) => setFilterValue("magnitude", {min, max})}
              disabled={!filters.magnitude.active}
              renderTrack={({props, children}) => (
                <div
                  {...props}
                  className="w-full h-2 rounded"
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: [filters.magnitude.min, filters.magnitude.max],
                      colors: ["#d1d5db", "rgb(186, 255, 102)", "#d1d5db"],
                      min: MAG_MIN,
                      max: MAG_MAX,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({props}) => (
                <div
                  {...props}
                  key={props.key}
                  className="w-4 h-4 rounded-full bg-white border-2 border-green-100 shadow"
                />
              )}
            />
          </div>
        </div>
        <div
          className={`flex items-center gap-4 transition-opacity relative ${
            filters.yearRange.active ? "opacity-75" : "opacity-25"
          } px-4 py-2 rounded-2xl bg-white/20`}
        >
          <Icon
            className={`absolute top-2 right-2 cursor-pointer ${
              filters.yearRange.active ? "text-yellow-500" : "text-white/60"
            }`}
            onClick={() =>
              setFilterActive("yearRange", !filters.yearRange.active)
            }
            fontSize="small"
          >
            lightbulb
          </Icon>
          <div className="flex flex-col items-start gap-4 py-2  text-white/60 text-sm w-full">
            <label>
              Year Range{" "}
              <span className="text-green-100">
                {filters.yearRange.min} - {filters.yearRange.max}
              </span>
            </label>
            <Range
              step={1}
              min={YEAR_MIN}
              max={YEAR_MAX}
              values={[filters.yearRange.min, filters.yearRange.max]}
              onChange={([min, max]) => setFilterValue("yearRange", {min, max})}
              disabled={!filters.yearRange.active}
              renderTrack={({props, children}) => (
                <div
                  {...props}
                  className="w-full h-2 rounded"
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: [filters.yearRange.min, filters.yearRange.max],
                      colors: ["#d1d5db", "rgb(186, 255, 102)", "#d1d5db"],
                      min: YEAR_MIN,
                      max: YEAR_MAX,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({props}) => (
                <div
                  {...props}
                  key={props.key}
                  className="w-4 h-4 rounded-full bg-white border-2 border-green-100 shadow"
                />
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

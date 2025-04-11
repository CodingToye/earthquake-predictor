// components/Map/components/NearbyQuakeMarkers.tsx

import {Marker, Popup} from "react-leaflet";
import Icon from "@mui/material/Icon";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

import {EarthquakeData} from "@/hooks/types";

import {getStaticMarkerIcon} from "../utils/markers";

export default function NearbyQuakeMarkers({
  earthquakes,
  exclude,
}: {
  earthquakes: EarthquakeData[];
  exclude: {latitude: number; longitude: number};
}) {
  countries.registerLocale(enLocale);

  return (
    <>
      {earthquakes
        ?.filter(
          (q) =>
            q.latitude !== exclude.latitude || q.longitude !== exclude.longitude
        )
        .map((q, i) => {
          const countryCode = countries.getAlpha2Code(`${q?.country}`, "en");
          const date = new Date(q.date_time);
          return (
            <Marker
              key={i}
              position={[q.latitude, q.longitude]}
              icon={getStaticMarkerIcon()}
            >
              <Popup closeButton={false}>
                <div className="custom-popup">
                  <h2 className="font-bold">
                    <div className="flex justify-between">
                      {q.location},{" "}
                      <span
                        className={`fi fi-${countryCode?.toLowerCase()}`}
                      ></span>
                    </div>
                    <small>
                      {date.toDateString()} at {date.toLocaleDateString()}
                    </small>
                  </h2>
                  <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Icon>sensors</Icon>
                      {q.magnitude}
                    </div>
                    <div className="flex items-center gap-1">
                      <strong>Lat.</strong> {q.latitude}
                    </div>
                    <div className="flex items-center gap-1">
                      <strong>Lon.</strong>
                      {q.longitude}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </>
  );
}

// components/Map/components/NearbyQuakeMarkers.tsx

import {Marker, Popup} from "react-leaflet";
import Icon from "@mui/material/Icon";

import {EarthquakeData} from "@/hooks/types";

import {getStaticMarkerIcon} from "../utils/markers";

export default function NearbyQuakeMarkers({
  earthquakes,
  exclude,
}: {
  earthquakes: EarthquakeData[];
  exclude: {latitude: number; longitude: number};
}) {
  return (
    <>
      {earthquakes
        ?.filter(
          (q) =>
            q.latitude !== exclude.latitude || q.longitude !== exclude.longitude
        )
        .map((q, i) => {
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
                    {q.location},{" "}
                    <small>
                      {date.toDateString()} at {date.toLocaleDateString()}
                    </small>
                  </h2>
                  <div className="flex gap-4">
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

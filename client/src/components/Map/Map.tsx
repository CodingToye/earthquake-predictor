import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import * as L from "leaflet";
import Icon from "@mui/material/Icon";
import RecenterMap from "./components/RecenterMap";
import {MapProps} from "./types";

export default function Map({
  latitude,
  longitude,
  magnitude,
  nearbyEarthquakes = [],
}: MapProps) {
  const position: LatLngExpression = [latitude, longitude];

  const getMarkerIcon = (magnitude: number) => {
    let className = "marker-pulse-wrapper";

    if (magnitude >= 8) {
      className += " marker-large"; // strong
    } else if (magnitude >= 7) {
      className += " marker-medium"; // moderate
    } else {
      className += " marker-small"; // small
    }

    return L.divIcon({
      className: "", // still needed if you're targeting via divIcon CSS rules
      iconSize: [20, 20],
      html: `
        <div class="${className}">
          <div class="dot"></div>
          <div class="pulse-ring"></div>
          <div class="pulse-ring secondary"></div>
        </div>`, // ✅ this is the key fix
    });
  };

  const getStaticMarkerIcon = () => {
    let className = "marker-pulse-wrapper";
    className += " marker-static";

    return L.divIcon({
      className: "", // still needed if you're targeting via divIcon CSS rules
      iconSize: [20, 20],
      html: `
        <div class="${className}">
          <div class="dot"></div>
          <div class="pulse-ring"></div>
          <div class="pulse-ring secondary"></div>
        </div>`, // ✅ this is the key fix
    });
  };

  return (
    <div className="h-128 rounded-lg overflow-hidden shadow">
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap latitude={latitude} longitude={longitude} />
        <Marker position={position} icon={getMarkerIcon(magnitude ?? 0)}>
          <Popup closeButton={false}>
            <div className="custom-popup">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <Icon>sensors</Icon>
                  {magnitude}
                </div>
                <div className="flex items-center gap-1">
                  <strong>Lat.</strong> {latitude}
                </div>
                <div className="flex items-center gap-1">
                  <strong>Lon.</strong>
                  {longitude}
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
        {nearbyEarthquakes
          ?.filter((q) => q.latitude !== latitude || q.longitude !== longitude)
          .map((q, i) => {
            const formattedDateTime = new Date(q.date_time);
            const formattedDate = formattedDateTime.toDateString();
            const formattedTime = formattedDateTime.toLocaleTimeString("en-US");
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
                        {formattedDate} at {formattedTime}
                      </small>
                    </h2>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <Icon>sensors</Icon>
                        {q.magnitude}
                      </div>
                      <div className="flex items-center gap-1">
                        {/* <Icon>swap_vert</Icon> */}
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
      </MapContainer>
    </div>
  );
}

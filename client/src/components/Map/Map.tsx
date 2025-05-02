// components/Map/Map.tsx

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import Icon from "@mui/material/Icon";
import {LatLngExpression} from "leaflet";

import NearbyQuakeMarkers from "./components/NearbyQuakeMarkers";
import RecenterMap from "./components/RecenterMap";
import {getMarkerIcon} from "./utils/markers";
import {MapProps} from "./types";

export default function Map({
  latitude,
  longitude,
  magnitude,
  nearbyEarthquakes = [],
}: MapProps) {
  const position: LatLngExpression = [latitude, longitude];

  return (
    <div className="md:h-screen pt-16 relative z-40">
      <MapContainer
        center={position}
        zoom={8}
        zoomControl={false}
        scrollWheelZoom={false}
        className="h-128 md:h-full w-full"
      >
        <TileLayer
          className="bluish-sat"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <RecenterMap latitude={latitude} longitude={longitude} />
        <Marker position={position} icon={getMarkerIcon(magnitude ?? 0)}>
          <Popup closeButton={false}>
            <div className="custom-popup">
              <div className="flex gap-4 text-xs">
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
        <NearbyQuakeMarkers
          earthquakes={nearbyEarthquakes ?? []}
          exclude={{latitude, longitude}}
        />
      </MapContainer>
      <div className="map-overlay"></div>
    </div>
  );
}

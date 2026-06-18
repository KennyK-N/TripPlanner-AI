import {
  MapContainer,
  TileLayer,
  Polyline,
  useMap,
  Popup,
  Marker,
} from "react-leaflet";
import { useEffect, useMemo } from "react";
import polyline from "@mapbox/polyline";

function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) map.setView(center);
  }, [center, map]);

  return null;
}

// Use the map to create a route or plan of the places they are visting only,
// i.e the to or destination they want to travel to, ignore the from part

export default function RouteMap({
  osrmData,
  fallbackRoute = [],
  center = [0, 0],
  className = "",
}) {
  // const route = useMemo(() => {
  //   try {
  //     const geometry = osrmData?.routes?.[0]?.geometry;

  //     if (geometry) {
  //       return polyline.decode(geometry);
  //     }

  //     return fallbackRoute;
  //   } catch (e) {
  //     return fallbackRoute;
  //   }
  // }, [osrmData, fallbackRoute]);

  let route;

  if (osrmData?.routes?.[0]) {
    route = polyline.decode(osrmData.routes[0].geometry);
  } else {
    route = fallbackRoute;
  }

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap center={center} />

        {route.length > 0 && (
          <Polyline positions={route} color="blue" weight={5} />
        )}
        {fallbackRoute.map((point, index) => (
          <Marker key={index} position={point}>
            <Popup>
              Waypoint {index + 1}
              <br />
              Easily customizable.
              {point[0]}, {point[1]}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

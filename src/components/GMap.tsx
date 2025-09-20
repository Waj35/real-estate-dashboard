import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { apiKey } from "../services/api";


type Props = {
  lat: number;
  lng: number;
  title: string;
};

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "280px",
  borderRadius: "12px",
  overflow: "hidden",
};

const getRandomCoords = () => {
  const lat = (Math.random() * 180 - 90).toFixed(4);
  const lng = (Math.random() * 360 - 180).toFixed(4);
  return { lat: parseFloat(lat), lng: parseFloat(lng) };
};

export default function GMap({ lat, lng, title }: Props) {

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
  });

  if (!apiKey) {
    const fallbackCoords = getRandomCoords();

    return (
      <div className="panel">
        <div style={containerStyle}>
          <iframe
            title="Random Fallback Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://maps.google.com/maps?q=${fallbackCoords.lat},${fallbackCoords.lng}&z=4&output=embed`}
          />
        </div>
        <div style={{ padding: 8, fontSize: 13, color: "#666" }}>
          Showing a random location (API key missing).
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="panel" style={{ padding: 12 }}>
        Failed to load Google Maps.
      </div>
    );
  }

  return isLoaded ? (
    <div className="panel">
      <div style={containerStyle as any}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{ lat, lng }}
          zoom={12}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
              {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ saturation: -10 }, { lightness: 10 }],
              },
            ],
          }}
        >
          <Marker position={{ lat, lng }} title={title} />
        </GoogleMap>
      </div>
    </div>
  ) : (
    <div className="panel" style={{ padding: 12 }}>
      Loading map…
    </div>
  );
}

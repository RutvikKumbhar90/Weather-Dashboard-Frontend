import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Pin from "../public/Pin.png"; // Ensure this path is correct
import { useData } from "../context/weatherContext";

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: Pin,
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Component to update the map center dynamically
const UpdateMapCenter = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location.latitude && location.longitude) {
      map.setView([location.latitude, location.longitude], map.getZoom());
    }
  }, [location, map]);

  return null;
};

// Component to handle click events on the map
const LocationClickHandler = ({ onClick }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onClick({ latitude: lat, longitude: lng });
    },
  });

  return null;
};

const Map = ({ location }) => {
  const apiKey = "09367e9a29f32f2a3da8be9fd21955c2"; // OpenWeather API key
  const [clickedLocation, setClickedLocation] = useState(null);
  const {setCity} = useData(); // Assuming you have a context to set the city

  const handleMapClick = async (coords) => {
    setClickedLocation(coords);

    // Reverse Geocoding to get city name
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`
      );
      const data = await response.json();
      console.log("City:", data.address?.city || data.address?.town || data.display_name);
      const mapCity = data.address?.city || data.address?.town || data.display_name;
      setCity(mapCity); // Set the city in context
      
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
    }
  };

  return (
    <div className="w-full h-[400px] sm:h-[300px] md:h-[500px] rounded-md overflow-hidden shadow-md z-10">
      <MapContainer
        center={[location.latitude || 18.5204, location.longitude || 73.8567]}
        zoom={10}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <UpdateMapCenter location={location} />
        <LocationClickHandler onClick={handleMapClick} />

        {/* Base Layer */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Weather Overlay */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          opacity={0.5}
        />

        {/* Original Marker */}
        {location.latitude && location.longitude && (
          <Marker
            position={[location.latitude, location.longitude]}
            icon={customIcon}
          >
            <Popup>
              Exact Location: [{location.latitude}, {location.longitude}]
            </Popup>
          </Marker>
        )}

        {/* Clicked Marker */}
        {clickedLocation && (
          <Marker
            position={[clickedLocation.latitude, clickedLocation.longitude]}
            icon={customIcon}
          >
            <Popup>
              Clicked Location: [{clickedLocation.latitude.toFixed(4)},{" "}
              {clickedLocation.longitude.toFixed(4)}]
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;

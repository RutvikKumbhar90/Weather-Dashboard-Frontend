import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const DataContext = createContext();

// Create a custom hook (optional but recommended)
export const useData = () => useContext(DataContext);

// Create the provider component
export const DataProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [daily, setDaily] = useState([]);
  const [city, setCity] = useState("");
  const [cityNotFound, setCityNotFound] = useState(false);

  // === Get weather data (with optional city override) ===
  const getWeatherData = async (cityNameParam = null) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userCity = storedUser?.city;

      const finalCity =
        cityNameParam?.trim() || city?.trim() || userCity || "pune";

      if (!finalCity) {
        console.warn("City name is empty. Skipping weather fetch.");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/weather/current?city=${finalCity}`
      );

      setWeatherData(response.data);
      setDaily(response.data.daily);
      setCityNotFound(false); // Reset city not found state
    } catch (error) {
      if (error.response?.status === 404) {
        setCityNotFound(true);
      }
      console.error("Error fetching weather data:", error);
    }
  };

  // === Get graph data (with optional city override) ===
  const getGraphData = async (cityNameParam = null) => {
    try {
      const finalCity = cityNameParam?.trim() || city?.trim() || "pune";

      if (!finalCity) {
        console.warn("City name is empty. Skipping graph fetch.");
        return;
      }

      const apiData = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/weather/hourly?city=${finalCity}`
      );

      const formatted = apiData.data.map((item) => ({
        name: item.time,
        temp: item.temperature,
      }));

      setGraphData(formatted);
    } catch (err) {
      console.error("Error fetching graph data:", err);
    }
  };

  // === Get weather data by coordinates ===
  const getWeatherDataByCoords = async (latitude, longitude) => {
    try {
      if (!latitude || !longitude) {
        throw new Error("Invalid latitude or longitude");
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/weather/current?latitude=${latitude}&longitude=${longitude}`
      );

      setWeatherData(response.data);
      setDaily(response.data.daily);
    } catch (error) {
      console.error(
        "Error fetching current weather by coordinates:",
        error.message
      );
    }
  };

  // === Get graph data by coordinates ===
  const getGraphDataByCoords = async (latitude, longitude) => {
    try {
      if (!latitude || !longitude) {
        throw new Error("Invalid latitude or longitude");
      }

      const apiData = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/weather/hourly?latitude=${latitude}&longitude=${longitude}`
      );

      const formatted = apiData.data.map((item) => ({
        name: item.time,
        temp: item.temperature,
      }));

      setGraphData(formatted);
    } catch (err) {
      console.error(
        "Error fetching hourly graph data by coordinates:",
        err.message
      );
    }
  };

  // Auto-fetch on city change
  useEffect(() => {
    if (city?.trim()) {
      getWeatherData();
      getGraphData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <DataContext.Provider
      value={{
        weatherData,
        graphData,
        city,
        daily,
        setCity,
        getWeatherData,
        getGraphData,
        getGraphDataByCoords,
        getWeatherDataByCoords,
        cityNotFound,
        setCityNotFound,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

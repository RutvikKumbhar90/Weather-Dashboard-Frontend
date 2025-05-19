import React from "react";
import eyecare from "../public/eyecare.png";
import wind from "../public/wind.png";
import protection from "../public/protection.png";
import pressure from "../public/pressure.png";
import clouds from "../public/clouds.png";
import weather from "../public/weather.png";
import { useData } from "../context/weatherContext";

const StatCard = () => {
  const { weatherData } = useData();

  const cards = [
    {
      label: "Wind-Speed",
      icon: wind,
      value: weatherData.windSpeed,
    },
    {
      label: "Humidity",
      icon: weather,
      value: weatherData.humidity,
    },
    {
      label: "Pressure",
      icon: pressure,
      value: weatherData.pressure,
    },
    {
      label: "Cloud-cover",
      icon: clouds,
      value: weatherData.cloudCover,
    },
    {
      label: "Visibility",
      icon: eyecare,
      value: weatherData.visibility,
    },
    {
      label: "UV-Index",
      icon: protection,
      value: weatherData.uvIndex,
    },
  ];

  return (
    <div className="w-full md:w-[50%] flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-4 pb-4 ">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-[#1c1c1c] rounded-md shadow-xl w-[155px] md:w-[175px] h-[106px] flex flex-col justify-center px-4 py-2 transform transition-transform duration-300 hover:-translate-y-2 sm:w-[150px] sm:h-[100px]"
        >
          <div className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-2">
            <span className="text-lg">
              <img className="w-[25px]" src={card.icon} alt={card.label} />
            </span>
            <span className="text-xs sm:text-sm">{card.label}</span>
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1 sm:text-xl">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCard;
import React from "react";
import { useData } from "../context/weatherContext";

const WeeklyCard = ({ currentDay }) => {
  const { daily } = useData();

  // Normalize the current day to match the format in the daily array
  const normalizedDay = currentDay ? currentDay.slice(0, 3) : " ";

  return (
    <>
      <div className="w-full text-center p-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
          Weekly Weather Forecast
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Check the maximum and minimum temperatures for each day of the week.
        </p>
      </div>
      <div className="w-full p-4">
        <div className="w-full bg-white dark:bg-[#1c1c1c] p-4 rounded-md flex flex-wrap items-center justify-center gap-7">
          {/* Check if daily is defined and not empty */}
          {daily && daily.length > 0 ? (
            daily.map((dayData, index) => (
              <div
                key={index}
                className={`flex flex-col items-center w-[110px] h-[110px] sm:w-[120px] sm:h-[100px] p-2 rounded-md shadow-xl ${
                  dayData.day === normalizedDay
                    ? "bg-gradient-to-b from-yellow-400 to-yellow-200 dark:from-yellow-600 dark:to-yellow-400"
                    : "bg-gradient-to-b from-blue-300 to-blue-100 dark:from-blue-700 dark:to-blue-500"
                }`}
              >
                <span className="text-md font-semibold">{dayData.day}</span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Max: {dayData.max}°C
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Min: {dayData.min}°C
                </span>
              </div>
            ))
          ) : (
            // Fallback UI if daily is undefined or empty
            <p className="text-gray-500 dark:text-gray-300">
              No data available for the week.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default WeeklyCard;

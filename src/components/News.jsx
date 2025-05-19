import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const getNews = async () => {
    try {
      setLoading(true); // Set loading to true when fetching news
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/weathernews`);
      setNews(response.data.articles);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    // Set loading to false after fetching news
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <>
      {/* Spinner overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="p-4 mt-5 flex justify-start w-[90%] md:w-[88%] mx-auto">
        <Link to="/home">
          <button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 bg-gradient-to-r from-purple-500 to-blue-400 text-sm sm:text-base">
            Back to Dashboard
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center flex-wrap p-4 gap-4 ">
        {news.map((item, index) => (
          <>
            <div className="w-[350px] h-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col">
              {/* News Image */}
              <img
                src={item.urlToImage || "https://via.placeholder.com/350x200"} // Fallback to placeholder image
                alt="News"
                className="w-full h-48 object-cover"
              />

              {/* Title and Description */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
                  {item.title || "No Title Available"}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {item.description ||
                    "No description available for this news."}
                </p>
              </div>

              {/* Date and Author */}
              <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-500 border-t border-gray-200 ">
                <span className="truncate">
                  {item.publishedAt || "Unknown Date"}
                </span>
                <span className="font-medium truncate">
                  {item.author || "Unknown Author"}
                </span>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default News;

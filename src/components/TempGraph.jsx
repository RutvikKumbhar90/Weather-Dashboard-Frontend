import React from "react";
import { useData } from "../context/weatherContext";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const TempGraph = () => {
    const {graphData} = useData();
  return (
    <>
      <ResponsiveContainer className="pt-4 pr-4" width="100%" height={225}>
        <BarChart data={graphData}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />{" "}
              <stop offset="50%" stopColor="#fef08a" stopOpacity={1} />{" "}
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />{" "}
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ccc" strokeDasharray="6 6" />
          <XAxis dataKey="name" />
          <YAxis unit="°C" />
          <Tooltip formatter={(value) => `${value}°C`} />
          <Bar dataKey="temp" fill="url(#colorTemp)" barSize={26} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default TempGraph;

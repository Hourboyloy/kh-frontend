"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Disable server-side rendering for this component
});

const ApexChart = ({ data, title = "User Views Over Time" }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the component is client-rendered
  }, []);

  const chartOptions = {
    series: [
      {
        name: "User Views",
        data: data, // Pass dynamic data
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: title, // Dynamic title
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: (val) => val.toFixed(0), // Display exact numbers without K
        },
        title: {
          text: "Views",
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        y: {
          formatter: (val) => `${val} views`, // Show exact values in the tooltip
        },
      },
    },
  };

  // Render only on the client
  if (!isClient) {
    return null; // Avoid rendering on the server
  }

  return (
    <div className="bg-white md:px-5 md:pt-5 pt-3 rounded-lg">
      <ReactApexChart
        options={chartOptions.options}
        series={chartOptions.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ApexChart;

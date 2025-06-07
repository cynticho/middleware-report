"use client";

import jsVectorMap from "jsvectormap";
import { useEffect } from "react";

import "@/js/us-aea-en";

export default function Map() {
  useEffect(() => {
    new jsVectorMap({
      selector: "#mapOne",
      map: "us_aea_en",
      zoomButtons: true,
      regionStyle: {
        initial: {
          fill: "#C8D0D8",
        },
        hover: {
          fillOpacity: 1,
          fill: "#3056D3",
        },
      },
      regionLabelStyle: {
        initial: {
          fontWeight: "semibold",
          fill: "#fff",
        },
        hover: {
          cursor: "pointer",
        },
      },
      labels: {
        regions: {
          render(code: string) {
            return code.split("-")[1];
          },
        },
      },
    });
  }, []);

  return (
    <div className="rounded-[10px] w-full border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div id="mapOne" className="mapOne map-btn" />
    </div>
  );
}

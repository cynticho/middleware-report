"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), { ssr: false });

export function RegionLabels() {
  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <h2 className="mb-7 text-body-2xlg font-bold text-dark dark:text-white">
        Cities labels
      </h2>

      <Map />
    </div>
  );
}

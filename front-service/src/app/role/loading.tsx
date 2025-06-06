import React from 'react';
import { RoleSkeleton } from "@/components/Tables/role/skeleton";

export default function Loading() {
  return (
    <>
           
          <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
                  <div className="col-span-12 xl:col-span-7">
                    <RoleSkeleton />
                  </div>
                </div>
        </>
  );
}
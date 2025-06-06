import { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import Automobile from "@/components/Tables/automobile";
import { AutomobileSkeleton } from "@/components/Tables/automobile/skeleton";

export const metadata: Metadata = {
  title: "Automobile Page",
};

const CalendarPage = () => {
  return (
    <>
      <Breadcrumb pageName="Automobile" />
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
                    <div className="col-span-12 xl:col-span-7">
                      <Suspense fallback={<AutomobileSkeleton />}>
                         <Automobile />
                      </Suspense>
                    </div>
            </div>
      
    </>
  );
};

export default CalendarPage;

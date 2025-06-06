
import { Metadata } from "next";
import { Suspense } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import Employee from "@/components/Tables/employee";
import { EmployeeSkeleton } from "@/components/Tables/employee/skeleton";

export const metadata: Metadata = {
  title: "Employee Page",
  // other metadata
};

const CalendarPage = () => {
  return (
    <>
       <Breadcrumb pageName="Employee" />
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
              <div className="col-span-12 xl:col-span-7">
                <Suspense fallback={<EmployeeSkeleton />}>
                        <Employee />
                </Suspense>
              </div>
      
              
            </div>
    </>
  );
};

export default CalendarPage;

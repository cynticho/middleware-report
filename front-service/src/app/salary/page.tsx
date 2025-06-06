
import { Metadata } from "next";
import { Suspense } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Salary from "@/components/Tables/salary";
import { SalarySkeleton } from "@/components/Tables/salary/skeleton";





export const metadata: Metadata = {
  title: "Salary Page",
  // other metadata
};

const CalendarPage = () => {
  return (
    <>
      <Breadcrumb pageName="Salary" />
      
        <div className="col-span-12 xl:col-span-7">
          <Suspense fallback={<SalarySkeleton />}>
            <Salary />
          </Suspense>
        </div>
      
    </>
  );
};

export default CalendarPage;

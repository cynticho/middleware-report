
import { Metadata } from "next";
import { Suspense } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import Role from "@/components/Tables/role";
import { RoleSkeleton } from "@/components/Tables/role/skeleton";


export const metadata: Metadata = {
  title: "Role Page",
  // other metadata
};

const CalendarPage = () => {
  return (
    <>
       <Breadcrumb pageName="Role" />
       <div className="rounded-[10px] my-4 border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
                 
                           <div className="col-span-12 xl:col-span-7">
                             <Suspense fallback={<RoleSkeleton />}>
                                <Role />
                             </Suspense>
                           </div>
             </div>
    </>
  );
};

export default CalendarPage;

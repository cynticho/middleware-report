
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
       <div className="space-y-10 mx-4 my-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
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


import { Metadata } from "next";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { ShowcaseSection } from "@/components/Layouts/showcase-section";

import  City from "@/components/Tables/city";
import { CitySkeleton } from "@/components/Tables/city/skeleton";
import { Suspense } from "react";

import { fetchCities } from '@/actions/cityActions';


export const metadata: Metadata = {
  title: "City Page",
  // other metadata
};

const CalendarPage = async () => {
  // const cities = await fetchCities();
  return (
    <>
       <Breadcrumb pageName="City" />

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <div className="col-span-12 xl:col-span-7">
          <Suspense fallback={<CitySkeleton />}>
                  <City />
          </Suspense>
        </div>

        
      </div>

    </>
  );
};

export default CalendarPage;

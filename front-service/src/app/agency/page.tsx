
import { Metadata } from "next";
import { Suspense } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";


import { PencilSquareIcon, GlobeIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import Agency from "@/components/Tables/agency";
import { AgencySkeleton } from "@/components/Tables/agency/skeleton";
import { Select } from "@/components/FormElements/select";
import { getAgenciesData } from "@/components/Tables/fetch";

import { fetchCities } from '@/actions/cityActions';


type AgencyFormProps = {
  agency?: {
    id: number;
    label: string;
    description: string;
    city: { id: number; label: string; description: string };
  };
  onSuccess?: () => void;
};


export const metadata: Metadata = {
  title: "Agency Page",
  // other metadata
};

const CalendarPage = async () => {

  return (
    <>
       <Breadcrumb pageName="Agency" />

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
              <div className="col-span-12 xl:col-span-7">
                <Suspense fallback={<AgencySkeleton />}>
                   <Agency />
                </Suspense>
              </div>
      </div>
    </>
  );
};

export default CalendarPage;

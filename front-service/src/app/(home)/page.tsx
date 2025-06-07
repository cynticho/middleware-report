
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { ChatsCard } from "./_components/chats-card";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";


import * as React from 'react';

import Agency from "@/components/Tables/agency";
import { AgencySkeleton } from "@/components/Tables/agency/skeleton";
import Speed from "@/components/router";
import { EmployeeSkeleton } from "@/components/Tables/employee/skeleton";
import Employee from "@/components/Tables/employee";
import { AutomobileSkeleton } from "@/components/Tables/automobile/skeleton";
import Automobile from "@/components/Tables/automobile";
import City from "@/components/Tables/city";
import { RoleSkeleton } from "@/components/Tables/role/skeleton";
import Role from "@/components/Tables/role";
import { CitySkeleton } from "@/components/Tables/city/skeleton";
import { SalarySkeleton } from "@/components/Tables/salary/skeleton";
import Salary from "@/components/Tables/salary";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);



  return (
    <>
    <Breadcrumb pageName="Home" />
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup />
      </Suspense>

      <Speed/>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        {/* <PaymentsOverview
          className="col-span-12 xl:col-span-7"
          key={extractTimeFrame("payments_overview")}
          timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
        /> */}

        {/* <WeeksProfit
          key={extractTimeFrame("weeks_profit")}
          timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
          className="col-span-12 xl:col-span-5"
        /> */}

        {/* <UsedDevices
          className="col-span-12 xl:col-span-5"
          key={extractTimeFrame("used_devices")}
          timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
        />

        <RegionLabels /> */}

        <div className="col-span-12 grid xl:col-span-8">
          <Suspense fallback={<TopChannelsSkeleton />}>
            <TopChannels />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <ChatsCard />
        </Suspense>
      </div>

      <div className="rounded-[10px] my-4 border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
          <Breadcrumb pageName="Employee" />
                    <div className="col-span-12 xl:col-span-7">
                      <Suspense fallback={<EmployeeSkeleton />}>
                         <Employee />
                      </Suspense>
                    </div>
            </div>

      <div className="rounded-[10px] my-4 border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
          <Breadcrumb pageName="Agency" />
                    <div className="col-span-12 xl:col-span-7">
                      <Suspense fallback={<AgencySkeleton />}>
                         <Agency />
                      </Suspense>
                    </div>
            </div>

      <div className="rounded-[10px] my-4 border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
                 <Breadcrumb pageName="Automobile" />   <div className="col-span-12 xl:col-span-7">
                      <Suspense fallback={<AutomobileSkeleton />}>
                         <Automobile />
                      </Suspense>
                    </div>
            </div>

      <div className="rounded-[10px] my-4 border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
         <Breadcrumb pageName="City" />
                    <div className="col-span-12 xl:col-span-7">
                      <Suspense fallback={<CitySkeleton />}>
                         <City />
                      </Suspense>
                    </div>
            </div>
            
      <div className="rounded-[10px] my-4 border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
          <Breadcrumb pageName="Role" />
                    <div className="col-span-12 xl:col-span-7">
                      <Suspense fallback={<RoleSkeleton />}>
                         <Role />
                      </Suspense>
                    </div>
      </div>
      <div className="rounded-[10px] my-4 border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
            <Breadcrumb pageName="Salary" />
                    <div className="col-span-12 xl:col-span-7">
                      <Suspense fallback={<SalarySkeleton />}>
                         <Salary />
                      </Suspense>
                    </div>
            </div>
    </>
  );
}

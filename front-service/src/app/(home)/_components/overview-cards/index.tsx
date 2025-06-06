import { compactFormat } from "@/lib/format-number";
import { getOverviewData } from "../../fetch";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const { agencies, automobiles, salaries, cities, employees, roles } = await getOverviewData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Total Agencies"
        data={{
          ...agencies,
          value: compactFormat(agencies.value),
          url: agencies.url
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Total Automobiles"
        data={{
          ...automobiles,
          value: compactFormat(automobiles.value),
          url: automobiles.url
        }}
        Icon={icons.Product}
      />

      <OverviewCard
        label="Total Roles"
        data={{
          ...roles,
          value: compactFormat(roles.value),
          url: roles.url
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Total Salaries"
        data={{
          ...salaries,
          value: "$" + compactFormat(salaries.value),
          url: salaries.url
        }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="Total Cities"
        data={{
          ...cities,
          value: compactFormat(cities.value),
          url: cities.url
        }}
        Icon={icons.Product}
      />

      <OverviewCard
        label="Total Employees"
        data={{
          ...employees,
          value: compactFormat(employees.value),
          url: employees.url
        }}
        Icon={icons.Users}
      />
    </div>
  );
}

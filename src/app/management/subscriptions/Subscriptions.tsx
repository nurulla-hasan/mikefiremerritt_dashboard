/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PageLayout from "@/components/common/page-layout";
import { subscriptionsColumns } from "@/components/management/subscriptions/subscriptions-columns";
import { SubscriptionsFilter } from "@/components/management/subscriptions/subscriptions-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllSubscriptionsQuery } from "@/redux/feature/subscriptions/subscriptionApis";
import type { TSubscription } from "@/types/subscription";

const Subscriptions = () => {
  const {
    data: subscriptionsData,
    meta: subscriptionsMeta,
    isLoading,
    isError,
    isFetching,
    setPage,
    filter,
    setFilter,
  } = useSmartFetchHook<any, TSubscription>(useGetAllSubscriptionsQuery);

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="Subscription Management"
          description="View and manage all customer subscriptions"
          length={subscriptionsMeta?.total}
        />
        <SubscriptionsFilter filter={filter} setFilter={setFilter} />
      </div>
      <DataTable
        columns={subscriptionsColumns}
        data={subscriptionsData}
        meta={subscriptionsMeta}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        onPageChange={setPage}
      />
    </PageLayout>
  );
};

export default Subscriptions;

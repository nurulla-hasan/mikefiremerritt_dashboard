/* eslint-disable @typescript-eslint/no-explicit-any */


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
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <PageHeader
          title="Subscription Management"
          description="View and manage all customer subscriptions"
          length={subscriptionsMeta?.total}
        />
        <div className="w-full lg:w-auto">
          <SubscriptionsFilter filter={filter} setFilter={setFilter} data={subscriptionsData} />
        </div>
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

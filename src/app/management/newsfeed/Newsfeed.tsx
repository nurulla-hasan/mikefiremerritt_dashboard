/* eslint-disable @typescript-eslint/no-explicit-any */
import PageLayout from "@/components/common/page-layout";
import {
  newsfeedColumns,
} from "@/components/management/newsfeed/newsfeed-columns";
import { NewsfeedFilter } from "@/components/management/newsfeed/newsfeed-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllNewsfeedsQuery } from "@/redux/feature/newsfeed/newsfeedApis";
import type { INewsfeed } from "@/types/newsfeed";

const Newsfeed = () => {
  const { data, meta, isLoading, isError, isFetching, setPage, filter, setFilter } = useSmartFetchHook<any, INewsfeed>(
    useGetAllNewsfeedsQuery
  );

  return (
    <PageLayout>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <PageHeader title="Newsfeed Moderation" description="Manage the newsfeed here" />
        <div className="w-full lg:w-auto">
          <NewsfeedFilter filter={filter} setFilter={setFilter} data={data} />
        </div>
      </div>
      <DataTable
        columns={newsfeedColumns}
        data={data}
        meta={meta}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        onPageChange={setPage}
      />
    </PageLayout>
  );
};

export default Newsfeed;

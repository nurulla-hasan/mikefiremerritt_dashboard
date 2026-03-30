/* eslint-disable @typescript-eslint/no-explicit-any */


import PageLayout from "@/components/common/page-layout";
import { trainersColumns } from "@/components/management/trainers/trainers-columns";
import { TrainersFilter } from "@/components/management/trainers/trainers-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllTrainersQuery } from "@/redux/feature/trainers/trainerApis";
import type { ITrainer } from "@/types/trainer";

const Trainers = () => {
  const {
    data: trainers,
    meta,
    isLoading,
    isFetching,
    isError,
    setPage,
    setFilter,
    filter,
  } = useSmartFetchHook<any, ITrainer>(useGetAllTrainersQuery);

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="Trainer Management"
          description="Manage your trainers here"
          length={meta?.total || 0}
        />

        <TrainersFilter filter={filter} setFilter={setFilter} data={trainers} />
      </div>

      <DataTable
        columns={trainersColumns}
        data={trainers}
        meta={meta}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        onPageChange={setPage}
      />
    </PageLayout>
  );
};

export default Trainers;

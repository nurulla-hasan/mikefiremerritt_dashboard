/* eslint-disable @typescript-eslint/no-explicit-any */
import PageLayout from "@/components/common/page-layout";
import { adminsColumns } from "@/components/management/admins/admins-columns";
import { AdminsFilter } from "@/components/management/admins/admins-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllAdminsQuery } from "@/redux/feature/admin/adminApis";
import type { TAdmin } from "@/types/admin";

const Admins = () => {
  const {
    data: adminsData,
    meta: adminsMeta,
    isLoading,
    isError,
    isFetching,
    setPage,
    filter,
    setFilter,
  } = useSmartFetchHook<any, TAdmin>(useGetAllAdminsQuery);

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="Admin Management"
          description="Manage all Platform Admins"
          length={adminsMeta?.total}
        />

        <AdminsFilter filter={filter} setFilter={setFilter} />
      </div>

      <DataTable
        columns={adminsColumns}
        data={adminsData}
        meta={adminsMeta}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        onPageChange={setPage}
      />
    </PageLayout>
  );
};

export default Admins;

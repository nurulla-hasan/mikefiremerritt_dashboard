/* eslint-disable @typescript-eslint/no-explicit-any */


import PageLayout from "@/components/common/page-layout";
import { usersColumns } from "@/components/management/users/users-columns";
import { UsersFilter } from "@/components/management/users/users-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllUsersQuery } from "@/redux/feature/users/userApis";
import type { IUser } from "@/types/user";

const Users = () => {
  const {
    data: users,
    meta,
    isInitialLoading,
    isRefetching,
    isError,
    setPage,
    setFilter,
    filter,
  } = useSmartFetchHook<any, IUser>(useGetAllUsersQuery);

  return (
    <PageLayout>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <PageHeader
          title="User Management"
          description="Manage all platform users"
          length={meta?.total || 0}
        />

        <div className="w-full lg:w-auto">
          <UsersFilter filter={filter} setFilter={setFilter} data={users} />
        </div>
      </div>

      <DataTable
        columns={usersColumns}
        data={users}
        meta={meta}
        isLoading={isInitialLoading}
        isError={isError}
        isFetching={isRefetching}
        onPageChange={setPage}
      />
    </PageLayout>
  );
};

export default Users;

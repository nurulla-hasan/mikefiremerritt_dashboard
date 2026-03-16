/* eslint-disable @typescript-eslint/no-explicit-any */


import PageLayout from "@/components/common/page-layout";
import { usersColumns } from "@/components/management/users/users-columns";
import { UsersFilter } from "@/components/management/users/users-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllUsersQuery } from "@/redux/feature/user/userApis";
import type { IUser } from "@/types/user";

const Users = () => {
  const {
    data: users,
    meta,
    isLoading,
    isError,
    isFetching,
    setPage,
    setFilter,
    filter,
  } = useSmartFetchHook<any, IUser>(useGetAllUsersQuery);

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="User Management"
          description="User all Platform Users"
          length={meta?.total || 0}
        />

        <UsersFilter filter={filter} setFilter={setFilter} />
      </div>

      <DataTable
        columns={usersColumns}
        data={users}
        meta={meta}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        onPageChange={setPage}
      />
    </PageLayout>
  );
};

export default Users;

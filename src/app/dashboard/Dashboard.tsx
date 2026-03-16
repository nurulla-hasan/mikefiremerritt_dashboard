import PageLayout from "@/components/common/page-layout";
import Stats from "@/components/dashboard/stats";
import EarningGrowthChart from "@/components/dashboard/earning-growth";
import UserGrowthChart from "@/components/dashboard/user-growth";
import { DataTable } from "@/components/ui/data-table";
import { usersColumns, type User } from "@/components/management/users/users-columns";
import { useGetDashboardStatsQuery } from "@/redux/feature/dashboard/dashboardApi";
import { useMemo, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const Dashboard = () => {
  const currentYear = new Date().getFullYear().toString();
  const [earningsYear, setEarningsYear] = useState<string>(currentYear);
  const [usersYear, setUsersYear] = useState<string>(currentYear);

  const { data, isLoading, isError } = useGetDashboardStatsQuery({
    earningsYear,
    usersYear,
  });

  const transformedUserGrowth = useMemo(() => {
    if (!data?.data?.userGrowthByMonth) return [];

    const grouped = data.data.userGrowthByMonth.reduce((acc, curr) => {
      const { month, role, count } = curr;
      if (!acc[month]) {
        acc[month] = { month, member: 0, trainer: 0 };
      }
      if (role === "MEMBER") acc[month].member = count;
      if (role === "TRAINER") acc[month].trainer = count;
      return acc;
    }, {} as Record<string, { month: string; member: number; trainer: number }>);

    return Object.values(grouped);
  }, [data]);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <Spinner className="size-8 text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout>
        <div className="flex h-[60vh] items-center justify-center text-destructive font-medium">
          Failed to load dashboard statistics.
        </div>
      </PageLayout>
    );
  }

  const stats = data?.data;

  return (
    <PageLayout >
      <div className="space-y-6">
        {stats && (
          <Stats
            data={{
              totalUsers: stats.totalUsers,
              totalTrainers: stats.totalTrainers,
              totalProducts: stats.totalProducts,
              totalEarnings: stats.totalEarnings,
            }}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stats && (
            <EarningGrowthChart
              data={stats.earningGrowth}
              year={earningsYear}
              onYearChange={setEarningsYear}
            />
          )}
          {stats && (
            <UserGrowthChart
              data={transformedUserGrowth}
              year={usersYear}
              onYearChange={setUsersYear}
            />
          )}
        </div>
        <DataTable columns={usersColumns} data={users} />
      </div>
    </PageLayout>
  );
};

export default Dashboard;



const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Trainer",
    joinedDate: "12 Jan 2025",
    status: "Approved",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Individual",
    joinedDate: "12 Jan 2025",
    status: "Decline",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    role: "Trainer",
    joinedDate: "12 Jan 2025",
    status: "Decline",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.brown@example.com",
    role: "Individual",
    joinedDate: "12 Jan 2025",
    status: "Approved",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "Individual",
    joinedDate: "12 Jan 2025",
    status: "Approved",
  },
];

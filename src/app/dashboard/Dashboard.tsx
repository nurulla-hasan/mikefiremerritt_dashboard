import PageLayout from "@/components/common/page-layout";
import Stats from "@/components/dashboard/stats";
import EarningGrowthChart from "@/components/dashboard/earning-growth";
import UserGrowthChart from "@/components/dashboard/user-growth";
import { DataTable } from "@/components/ui/data-table";
import { usersColumns } from "@/components/management/users/users-columns";
import { useGetDashboardStatsQuery } from "@/redux/feature/dashboards/dashboardApi";
import { useGetAllUsersQuery } from "@/redux/feature/users/userApis";
import { useMemo, useState } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";

const Dashboard = () => {
  const currentYear = new Date().getFullYear().toString();
  const [earningsYear, setEarningsYear] = useState<string>(currentYear);
  const [usersYear, setUsersYear] = useState<string>(currentYear);

  const { data: statsData, isLoading: isStatsLoading, isError } = useGetDashboardStatsQuery({
    earningsYear,
    usersYear,
  });

  const { data: usersData, isLoading: isUsersLoading } = useGetAllUsersQuery({
    limit: 5,
    page: 1,
  });

  const stats = useMemo(() => statsData?.data, [statsData]);
  const users = useMemo(() => usersData?.data || [], [usersData]);

  const transformedUserGrowth = useMemo(() => {
    if (!stats?.userGrowthByMonth) return [];

    const grouped = stats.userGrowthByMonth.reduce((acc, curr) => {
      const { month, role, count } = curr;
      if (!acc[month]) {
        acc[month] = { month, member: 0, trainer: 0 };
      }
      if (role === "MEMBER") acc[month].member = count;
      if (role === "TRAINER") acc[month].trainer = count;
      return acc;
    }, {} as Record<string, { month: string; member: number; trainer: number }>);

    return Object.values(grouped);
  }, [stats]);

  if (isStatsLoading || isUsersLoading) {
    return (
     <PageLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Lottie animationData={loadingAnimation} className="w-50 h-50" />
        </div>
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center text-destructive font-medium h-[calc(100vh-200px)]">
          Failed to load dashboard statistics.
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout >
      <div className="space-y-6">
        {stats && (
          <Stats
            data={{
              totalUsers: stats.totalUsers,
              totalTrainers: stats.totalTrainers,
              productStats: stats.productStats,
              totalEarnings: stats.totalEarnings,
              totalVisitors: stats.totalVisitors,
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
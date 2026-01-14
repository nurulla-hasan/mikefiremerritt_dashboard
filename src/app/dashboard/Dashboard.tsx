import PageLayout from "@/components/common/page-layout";
import Stats from "@/components/dashboard/stats";
import EarningGrowthChart from "@/components/dashboard/earning-growth";
import UserGrowthChart from "@/components/dashboard/user-growth";

const Dashboard = () => {
  return (
    <PageLayout >
      <div className="space-y-6">
        <Stats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EarningGrowthChart />
          <UserGrowthChart />
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
import { Card, CardContent } from "@/components/ui/card";

interface ProductStats {
  purchasable: number;
  nonPurchasable: number;
  message?: string;
}

interface StatsProps {
  data: {
    totalUsers: number;
    totalTrainers: number;
    productStats: ProductStats;
    totalEarnings: number;
    totalVisitors: number;
  };
}

const Stats = ({ data }: StatsProps) => {
  return (
    <Card className="border-muted/40">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {/* Total Users */}
          <div className="px-6 py-5">
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {data.totalUsers.toLocaleString()}
            </div>
            <div className="text-sm text-primary mt-1 font-crimson">Total Users</div>
          </div>

          {/* Total Trainers */}
          <div className="px-6 py-5">
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {data.totalTrainers.toLocaleString()}
            </div>
            <div className="text-sm text-primary mt-1 font-crimson">Total Trainers</div>
          </div>

          {/* Products */}
          <div className="px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold tracking-tight text-foreground">
                {data.productStats.purchasable}
              </span>
              <span className="text-muted-foreground">/</span>
              <span className="text-2xl font-semibold tracking-tight text-muted-foreground">
                {data.productStats.nonPurchasable}
              </span>
            </div>
            <div className="text-sm text-primary mt-1 font-crimson">Live / Restricted Products</div>
          </div>

          {/* Total Earnings */}
          <div className="px-6 py-5">
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              ${data.totalEarnings.toLocaleString()}
            </div>
            <div className="text-sm text-primary mt-1 font-crimson">Total Earnings</div>
          </div>

          {/* Total Visitors */}
          <div className="px-6 py-5">
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {data.totalVisitors.toLocaleString()}
            </div>
            <div className="text-sm text-primary mt-1 font-crimson">Total Visitors</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Stats;
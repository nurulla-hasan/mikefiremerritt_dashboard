import { Card, CardContent } from "@/components/ui/card";

interface StatsProps {
  data: {
    totalUsers: number;
    totalTrainers: number;
    totalProducts: number;
    totalEarnings: number;
  };
}

const Stats = ({ data }: StatsProps) => {
  const items = [
    { label: "Total User", value: data.totalUsers.toLocaleString() },
    { label: "Total Trainer", value: data.totalTrainers.toLocaleString() },
    { label: "Total Product", value: data.totalProducts.toLocaleString() },
    { label: "Total Earning", value: `$${data.totalEarnings.toLocaleString()}` },
  ];

  return (
    <Card className="border-muted/40">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {items.map((s, idx) => (
            <div key={idx} className="px-6 py-5">
              <div className="text-2xl font-semibold tracking-tight text-foreground">
                {s.value}
              </div>
              <div className="text-sm text-primary mt-1 font-crimson">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Stats;
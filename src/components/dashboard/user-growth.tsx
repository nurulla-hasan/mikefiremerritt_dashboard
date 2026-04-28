
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  member: {
    label: "Member",
    color: "var(--primary)",
  },
  trainer: {
    label: "Trainer",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());

interface UserGrowthChartProps {
  data: {
    month: string;
    member: number;
    trainer: number;
  }[];
  year: string;
  onYearChange: (year: string) => void;
}

const UserGrowthChart = ({ data, year, onYearChange }: UserGrowthChartProps) => {
  return (
    <Card className="border-muted/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium font-crimson">
          User Growth
        </CardTitle>
        <Select value={year} onValueChange={onYearChange}>
          <SelectTrigger className="h-8 w-25 border-muted bg-transparent text-xs">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-55 w-full"
        >
          <BarChart data={data} barCategoryGap={12}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={30}
              tickMargin={4}
            />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted))" }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="member"
              radius={[4, 4, 0, 0]}
              fill="var(--color-member)"
            />
            <Bar
              dataKey="trainer"
              radius={[4, 4, 0, 0]}
              fill="var(--color-trainer)"
              fillOpacity={0.5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UserGrowthChart;
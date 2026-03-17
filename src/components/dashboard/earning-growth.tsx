
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
  total: {
    label: "Total Earning",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());

interface EarningGrowthChartProps {
  data: {
    label: string;
    total: number;
  }[];
  year: string;
  onYearChange: (year: string) => void;
}

const EarningGrowthChart = ({ data, year, onYearChange }: EarningGrowthChartProps) => {
  return (
    <Card className="border-muted/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium font-crimson">
          Subscription Revenue
        </CardTitle>
        <Select value={year} onValueChange={onYearChange}>
          <SelectTrigger className="h-8 w-25 rounded-full border-muted bg-transparent text-xs">
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
          <AreaChart data={data}>
            <defs>
              <linearGradient id="earningFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
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
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              type="natural"
              dataKey="total"
              stroke="var(--primary)"
              fill="url(#earningFill)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default EarningGrowthChart;
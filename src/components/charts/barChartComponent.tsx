import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import formatPriceToVND from "@/utils/formatPriceToVND";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  return (
    <ChartContainer
      config={chartConfig}
      className=" w-full bg-white rounded-md  max-h-[500px] p-3 pb-8 "
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Doanh thu theo tuần</h3>
        <Select>
          <SelectTrigger className=" border-none  outline-none shadow-none font-medium text-black min-w-[100px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <BarChart accessibilityLayer data={chartData} className="mt-4">
        <CartesianGrid vertical={false} />
        <YAxis
          dataKey="desktop"
          tickFormatter={(value) => formatPriceToVND(value)}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />

        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

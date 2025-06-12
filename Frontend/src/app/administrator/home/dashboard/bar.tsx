"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useDashboardData from "@/lib/useDashboard";

export const description = "A multiple bar chart";

const chartConfig = {
  applicationsReceived: {
    label: "Received Application",
    color: "var(--chart-1)",
  },
  applicationsApproved: {
    label: "Approved Application",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple() {
  const { data, loading } = useDashboardData();
  return (
    <Card className="bg-background/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]">
      <CardHeader>
        <CardTitle>Scholarship Application Summary</CardTitle>
        <CardDescription>
          A breakdown of received and approved applications for each
          scholarship.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={
              data?.map((item) => ({
                name: item.scholarshipName,
                applicationsReceived: item.applicationsReceived,
                applicationsApproved: item.applicationsApproved,
              })) ?? []
            }
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="applicationsReceived"
              fill="var(--chart-1)"
              radius={4}
            />
            <Bar
              dataKey="applicationsApproved"
              fill="var(--chart-2)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

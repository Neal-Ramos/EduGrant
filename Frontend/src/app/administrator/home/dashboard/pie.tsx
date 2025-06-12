"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

import { PieSectorDataItem } from "recharts/types/polar/Pie";

export const description = "A donut chart with text";

const chartData = [
  { status: "Approved", value: 300, fill: "oklch(0.63 0.17 149)" },
  { status: "Pending", value: 150, fill: "oklch(0.86 0.17 92)" },
  { status: "Rejected", value: 50, fill: "oklch(0.58 0.22 27)" },
];

const chartConfig = {
  value: {
    label: "Applications",
  },
  Approved: {
    label: "Approved",
    color: "oklch(0.63 0.17 149)",
  },
  Pending: {
    label: "Pending",
    color: "oklch(0.86 0.17 92)",
  },
  Rejected: {
    label: "Rejected",
    color: "oklch(0.58 0.22 27)",
  },
} satisfies ChartConfig;

export default function ChartPieDonutText() {
  const totalApplications = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="bg-background/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]">
      <CardHeader>
        <CardTitle>Application Status Overview</CardTitle>
        <CardDescription>
          Visual representation of approved, pending, and rejected applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[220px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={55}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              <Label
                content={({ viewBox }) => {
                  const approved = chartData.find(
                    (item) => item.status === "Approved"
                  );
                  const total = chartData.reduce(
                    (acc, curr) => acc + curr.value,
                    0
                  );
                  const approvedPercent = approved
                    ? ((approved.value / total) * 100).toFixed(1)
                    : "0";

                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {approvedPercent}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Approved
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

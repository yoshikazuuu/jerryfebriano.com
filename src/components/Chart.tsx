"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface ChartData {
  name: string;
  percent: number;
  text: string;
}

interface ApiResponse {
  data: ChartData[];
}

const CHART_URL =
  "https://wakatime.com/share/@yoshikazuuu/9ba9be01-0704-4275-b0dd-61c0dcf626ec.json";

async function fetchChartData(): Promise<ChartData[]> {
  const response = await fetch(CHART_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch chart data");
  }
  const { data }: ApiResponse = await response.json();
  return data.filter((item) => item.percent > 1);
}

export function Chart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetchChartData()
      .then(setChartData)
      .catch((error) => console.error("Error fetching chart data:", error));
  }, []);

  return (
    <div className="scrollbar-hide no-scrollbar flex h-72 flex-col gap-2 overflow-y-auto rounded-md border p-5 text-sm md:h-fit">
      <h1 className="py-2 font-sans text-xl font-bold tracking-tight">
        Coding Activities
      </h1>
      {chartData.map(({ name, text, percent }, index) => (
        <ChartItem key={index} name={name} text={text} percent={percent} />
      ))}
    </div>
  );
}

function ChartItem({ name, text, percent }: ChartData) {
  return (
    <div className="space-y-1">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex gap-2">
          <p className="font-sans font-bold tracking-tight">{name}</p>
          <p className="text-muted-foreground font-extralight tracking-tight">
            {text}
          </p>
        </div>
        <p className="font-light">{percent.toFixed(1)}%</p>
      </div>
      <Progress value={percent} className="h-1" />
    </div>
  );
}

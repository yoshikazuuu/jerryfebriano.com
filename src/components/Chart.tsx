import { Progress } from "@/components/ui/progress";
interface ChartData {
  name: string;
  percent: number;
  color: string;
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  text: string;
  total_seconds: number;
}

async function getChart() {
  return await fetch(
    "https://wakatime.com/share/@yoshikazuuu/135bb74b-846f-42bf-88da-7dfdef496b57.json",
  ).then((res) => {
    return res.json();
  });
}

export async function Chart() {
  const chart = await getChart();
  return (
    <div className="scrollbar-hide no-scrollbar flex h-72 flex-col gap-2 overflow-y-auto rounded-md border p-5 text-sm md:h-full">
      <h1 className="py-2 font-sans text-xl font-bold tracking-tight">
        Coding Activities
      </h1>
      {chart.data.map((data: ChartData, index: number) => {
        return (
          <div key={index} className="space-y-1">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex gap-2">
                <p className="font-sans font-bold tracking-tight">
                  {data.name}
                </p>
                <p className="text-muted-foreground font-extralight tracking-tight">
                  {data.text}
                </p>
              </div>

              <p className="font-light">{data.percent}%</p>
            </div>

            <Progress value={data.percent} className="h-1" />
          </div>
        );
      })}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Area,
} from "recharts";
import { useMemo } from "react";
import { format } from "date-fns";

const pieData = [
  { name: "Food", value: 12000, fill: "var(--color-food)" },
  { name: "Travel", value: 8000, fill: "var(--color-travel)" },
  { name: "Rent", value: 25000, fill: "var(--color-rent)" },
  { name: "Shopping", value: 6000, fill: "var(--color-shopping)" },
];

const lineData = [
  { month: "Apr", spend: 22000 },
  { month: "May", spend: 18000 },
  { month: "Jun", spend: 26000 },
  { month: "Jul", spend: 21000 },
  { month: "Aug", spend: 29000 },
  { month: "Sep", spend: 24000 },
];

export const SpendingCharts = () => {
  const totalPie = useMemo(() => pieData.reduce((acc, d) => acc + d.value, 0), []);

  const currency = (v: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Category-wise Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              food: { label: "Food", color: "hsl(142, 76%, 45%)" },
              travel: { label: "Travel", color: "hsl(217, 91%, 60%)" },
              rent: { label: "Rent", color: "hsl(262, 83%, 58%)" },
              shopping: { label: "Shopping", color: "hsl(192, 95%, 68%)" },
            }}
            className="h-[360px]"
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={110}
                paddingAngle={2}
                labelLine={false}
                label={(p) => `${p.name}: ${Math.round(((p.value as number) / totalPie) * 100)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList dataKey="value" position="outside" formatter={(v: number) => currency(v)} />
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <div className="flex w-full items-center justify-between gap-6">
                        <span className="text-muted-foreground">{name as string}</span>
                        <span className="font-mono font-medium">{currency(Number(value))}</span>
                      </div>
                    )}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Spending Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ spend: { label: "Spend", color: "hsl(142, 76%, 45%)" } }} className="h-[360px]">
            <LineChart data={lineData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <defs>
                <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-spend)" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="var(--color-spend)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.35} />
              <XAxis dataKey="month" tickMargin={6} />
              <YAxis tickMargin={6} tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => (
                      <span className="font-mono font-medium">{currency(Number(value))}</span>
                    )}
                  />
                }
              />
              <Area type="monotone" dataKey="spend" stroke="none" fill="url(#spendGradient)" />
              <Line
                type="monotone"
                dataKey="spend"
                stroke="var(--color-spend)"
                strokeWidth={2.25}
                dot={{ r: 2.5 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};



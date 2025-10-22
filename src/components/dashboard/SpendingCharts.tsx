import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LabelList,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
} from "recharts";

const pieData = [
  { name: "Food", value: 12000, fill: "#10b981" },
  { name: "Travel", value: 8000, fill: "#3b82f6" },
  { name: "Rent", value: 25000, fill: "#8b5cf6" },
  { name: "Shopping", value: 6000, fill: "#06b6d4" },
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
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Category-wise Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="h-[260px] sm:h-[320px] px-2 sm:px-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  {(() => {
                    const [activeIndex, setActiveIndex] = (useState as typeof import("react").useState)(-1);
                    return (
                      <>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={48}
                          outerRadius={96}
                          paddingAngle={2}
                          labelLine={false}
                          cornerRadius={6}
                          onMouseEnter={(_, idx) => setActiveIndex(idx)}
                          onMouseLeave={() => setActiveIndex(-1)}
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.fill}
                              stroke={index === activeIndex ? "#ffffff" : undefined}
                              strokeWidth={index === activeIndex ? 2 : 0}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number, _name, props: any) => {
                            const name = props?.payload?.name as string;
                            const percent = props && props.payload ? Math.round((props.payload.value / totalPie) * 100) : 0;
                            return [
                              `${currency(Number(value))} (${percent}%)`,
                              name,
                            ];
                          }}
                        />
                        <Legend verticalAlign="bottom" height={24} />
                      </>
                    );
                  })()}
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2 pr-2">Category</th>
                    <th className="py-2 pr-2">Amount</th>
                    <th className="py-2 text-right">Percent</th>
                  </tr>
                </thead>
                <tbody>
                  {pieData.map((row) => {
                    const percent = Math.round((row.value / totalPie) * 100);
                    return (
                      <tr key={row.name} className="border-t">
                        <td className="py-2 pr-2">
                          <span className="inline-flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: row.fill }} />
                            {row.name}
                          </span>
                        </td>
                        <td className="py-2 pr-2">{currency(row.value)}</td>
                        <td className="py-2 text-right">{percent}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Spending Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] sm:h-[320px] px-2 sm:px-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ left: 18, right: 18, top: 16, bottom: 16 }}>
                <defs>
                  <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.35} />
                <XAxis dataKey="month" tickMargin={8} interval={0} />
                <YAxis
                  tickMargin={8}
                  domain={["dataMin - 2000", "dataMax + 2000"]}
                  tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`}
                />
                <Tooltip formatter={(value: number) => currency(Number(value))} />
                <Area type="monotone" dataKey="spend" stroke="none" fill="url(#spendGradient)" />
                <Line
                  type="monotone"
                  dataKey="spend"
                  stroke="#10b981"
                  strokeWidth={2.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dot={{ r: 2.25 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};



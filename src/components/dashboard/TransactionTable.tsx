import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, MoreVertical } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format, parseISO, isWithinInterval } from "date-fns";
import { useMemo, useState } from "react";

type Txn = { date: string; description: string; category: "Food" | "Travel" | "Shopping" | "Salary"; amount: number };

const rows: Txn[] = [
  { date: "2025-10-10", category: "Food", description: "Zomato Order", amount: -1250 },
  { date: "2025-10-09", category: "Travel", description: "Metro Card Recharge", amount: -300 },
  { date: "2025-10-05", category: "Salary", description: "Salary Credit", amount: 60000 },
  { date: "2025-10-03", category: "Shopping", description: "Myntra Purchase", amount: -1999 },
  { date: "2025-09-28", category: "Food", description: "Starbucks", amount: -420 },
];

const categoryColors: Record<Txn["category"], string> = {
  Food: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Travel: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  Shopping: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  Salary: "bg-violet-500/15 text-violet-400 border-violet-500/20",
};

function formatCurrencyInr(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(Math.abs(value));
}

export const TransactionTable = () => {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [range, setRange] = useState<DateRange | undefined>();

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchCategory = category === "all" || r.category === (category as Txn["category"]);
      const matchQuery = !query || r.description.toLowerCase().includes(query.toLowerCase());
      const inDateRange = (() => {
        if (!range?.from && !range?.to) return true;
        const date = parseISO(r.date);
        const from = range?.from ? range.from : date;
        const to = range?.to ? range.to : range?.from ? range.from : date;
        return isWithinInterval(date, { start: from, end: to });
      })();
      return matchCategory && matchQuery && inDateRange;
    });
  }, [category, query, range]);

  const clearFilters = () => {
    setCategory("all");
    setQuery("");
    setRange(undefined);
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center mb-4">
          <div className="w-full lg:w-48">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Salary">Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full lg:w-64">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {range?.from ? (
                    range.to ? (
                      <span>
                        {format(range.from, "PP")} - {format(range.to, "PP")}
                      </span>
                    ) : (
                      <span>{format(range.from, "PP")}</span>
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full lg:flex-1">
            <Input placeholder="Search description" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div>
            <Button variant="secondary" onClick={clearFilters}>Clear Filters</Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-background border-b">
              <tr className="text-left text-muted-foreground">
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3">Category</th>
                <th className="py-2 px-3 text-right">Amount</th>
                <th className="py-2 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={`${r.date}-${r.description}`} className="odd:bg-transparent even:bg-muted/30 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-3 whitespace-nowrap">{format(parseISO(r.date), "PP")}</td>
                  <td className="py-3 px-3 min-w-[16rem]">{r.description}</td>
                  <td className="py-3 px-3">
                    <Badge variant="outline" className={categoryColors[r.category]}>
                      {r.category}
                    </Badge>
                  </td>
                  <td className={`py-3 px-3 text-right font-mono tabular-nums ${r.amount < 0 ? "text-red-400" : "text-emerald-400"}`}>
                    {(r.amount < 0 ? "-" : "+") + formatCurrencyInr(r.amount)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};



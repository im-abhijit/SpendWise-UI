import { Header } from "@/components/dashboard/Header";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { SpendingCharts } from "@/components/dashboard/SpendingCharts";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { TrendingUp, Wallet, Tag } from "lucide-react";

const Dashboard = () => {
  return (
    <SidebarNav>
      <div className="p-4 md:p-6 space-y-6">
        <Header userName="Abhijit" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SummaryCard title="Total Spent (this month)" value="₹42,300" subtitle="Up 8% from last month" accent="emerald" icon={<TrendingUp className="h-5 w-5 text-emerald-400" />} />
          <SummaryCard title="Total Income" value="₹60,000" subtitle="Salary + other income" accent="indigo" icon={<Wallet className="h-5 w-5 text-indigo-400" />} />
          <SummaryCard title="Top Spending Category" value="Food" subtitle="₹12,000 this month" accent="violet" icon={<Tag className="h-5 w-5 text-violet-400" />} />
        </div>

        <SpendingCharts />

        <TransactionTable />
      </div>
    </SidebarNav>
  );
};

export default Dashboard;



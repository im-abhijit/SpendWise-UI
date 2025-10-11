import { Header } from "@/components/dashboard/Header";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { SpendingCharts } from "@/components/dashboard/SpendingCharts";
import { TransactionTable } from "@/components/dashboard/TransactionTable";

const Dashboard = () => {
  return (
    <SidebarNav>
      <div className="p-4 md:p-6 space-y-6">
        <Header userName="Abhijit" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SummaryCard title="Total Spent (this month)" value="₹42,300" subtitle="Up 8% from last month" accent="emerald" />
          <SummaryCard title="Total Income" value="₹60,000" subtitle="Salary + other income" accent="indigo" />
          <SummaryCard title="Top Spending Category" value="Food" subtitle="₹12,000 this month" accent="violet" />
        </div>

        <SpendingCharts />

        <TransactionTable />
      </div>
    </SidebarNav>
  );
};

export default Dashboard;



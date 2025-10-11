import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Receipt, Bell, Settings, Menu } from "lucide-react";
import { ReactNode } from "react";

type SidebarNavProps = {
  children: ReactNode;
  active?: "dashboard" | "transactions" | "alerts" | "settings";
};

export const SidebarNav = ({ children, active = "dashboard" }: SidebarNavProps) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center justify-start px-2 py-1.5">
            <span className="font-semibold group-data-[collapsible=icon]:hidden">SpendWise</span>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <SidebarTrigger variant="ghost" size="sm" className="justify-start">
                      <Menu className="h-4 w-4" />
                    </SidebarTrigger>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "dashboard"}>
                    <a href="#"><LayoutDashboard /> <span>Dashboard</span></a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "transactions"}>
                    <a href="#"><Receipt /> <span>Transactions</span></a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "alerts"}>
                    <a href="#"><Bell /> <span>Alerts</span></a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "settings"}>
                    <a href="#"><Settings /> <span>Settings</span></a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
        {/* Edge rail to quickly expand/collapse on desktop */}
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};



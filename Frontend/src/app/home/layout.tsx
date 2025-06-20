import { AppSidebar } from "@/components/ui/client-sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Home({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

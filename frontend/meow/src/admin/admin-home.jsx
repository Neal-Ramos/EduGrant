import { AppSidebar } from "./app-sider";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* This renders nested routes like /home/application */}
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

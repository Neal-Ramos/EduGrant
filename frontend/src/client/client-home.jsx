import { Outlet, NavLink } from "react-router-dom";
import { SidebarLeft } from "./client-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ClientHome() {
  return (
    <main className="">
      <SidebarProvider>
        <SidebarLeft />

        <div className="w-full">
          <Outlet />
        </div>
      </SidebarProvider>
    </main>
  );
}

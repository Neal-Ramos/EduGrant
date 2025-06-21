"use client";

import ChartPieDonutText from "./pie";
import { ChartBarMultiple } from "./bar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import TableDashboard from "./table";
import morty from "@/assets/image.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/ui/dark-mode";
import ApplicationSummary from "./summary";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Bell,
  ChevronDown,
  FileText,
  GraduationCap,
  LogOut,
  Megaphone,
  Plus,
  SquarePen,
} from "lucide-react";
import CalendarComponent from "./origin-calendar";

export default function AdminDashboard() {
  return (
    <div className="pl-1 pr-2 your-class">
      <header className="flex w-full items-center justify-between your-class2 border-b rounded-md top-2 relative">
        <div className="flex h-16 shrink-0 items-center gap-5 px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Main</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mr-3 flex  items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost">
                <img
                  className="h-full w-full aspect-square object-cover rounded-full"
                  src={morty.src}
                  alt=""
                />{" "}
                Admin 001 <ChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Button variant="ghost" className="w-full" size="sm">
                <LogOut />
                Logout
              </Button>
            </PopoverContent>
          </Popover>
          <span className="p-2.5 border rounded-sm">
            <Megaphone className="h-4 w-4" />
          </span>
          <span className="p-2.5 border rounded-sm">
            <Bell className="h-4 w-4" />
          </span>
          <ModeToggle />
        </div>
      </header>

      <div className=" grid grid-cols-3  gap-5 px-5 mt-10">
        <div className=" flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">Hello Admin Jerome...</h1>
            <p className="text-sm text-muted-foreground">
              Tuesday, August 6th 2025
            </p>
          </div>
          <div className="space-x-3">
            <div className="flex items-center gap-2"></div>
          </div>
        </div>
        <div></div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <SquarePen /> Post a scholarship
          </Button>
          <Button variant="outline" className="flex-1">
            <Activity /> Generate Report
          </Button>
        </div>

        <div className="col-span-2 grid gap-5">
          <ApplicationSummary />
          <div className="grid grid-cols-2 gap-5">
            <ChartBarMultiple />
            <ChartPieDonutText />
          </div>
        </div>
        <div>
          <CalendarComponent />
        </div>
        <div className="col-span-3">
          <Tabs defaultValue="tab-1">
            <TabsList className="bg-background/40 mb-3 h-auto -space-x-px p-0 shadow-xs rtl:space-x-reverse w-full">
              <TabsTrigger
                value="tab-1"
                className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e flex-1"
              >
                <Megaphone
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Announcements
              </TabsTrigger>

              <TabsTrigger
                value="tab-2"
                className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e flex-1"
              >
                <Megaphone
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Active Scholarship
              </TabsTrigger>
              <TabsTrigger
                value="tab-3"
                className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e flex-1"
              >
                Recent Application
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1">
              <p className="text-muted-foreground p-4 pt-1 text-center text-xs">
                No Announcements Yet
              </p>
            </TabsContent>
            <TabsContent value="tab-2">
              <CalendarComponent />
            </TabsContent>
            <TabsContent value="tab-3">
              <TableDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

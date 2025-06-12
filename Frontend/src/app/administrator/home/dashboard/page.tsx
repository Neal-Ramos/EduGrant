"use client";

import ChartPieDonutText from "./pie";
import { ChartBarMultiple } from "./bar";
import CalendarDashboard from "./calendar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import TableDashboard from "./table";
import morty from "@/assets/image.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Archive,
  Bell,
  ChevronDown,
  LogOut,
  Megaphone,
  Plus,
} from "lucide-react";
const dashboardCards = [
  {
    title: "Scholarship",
    description: "Card Description",
    buttonLabel: "Add",
    icon: <Plus />,
  },
  {
    title: "Report",
    description: "Card Description",
    buttonLabel: "Generate",
    icon: <Activity />,
  },
  {
    title: "Announcement",
    description: "Card Description",
    buttonLabel: "Add",
    icon: <Plus />,
  },
  {
    title: "Archive",
    description: "Card Description",
    buttonLabel: "View",
    icon: <Archive />,
  },
];

export default function ChartBarLabelCustom() {
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
      <div className="p-10">
        <ApplicationSummary />
      </div>
      <div className=" grid grid-cols-3 gap-5  px-10">
        <div className="grid grid-cols-2 gap-3">
          {dashboardCards.map((card, index) => (
            <Card
              key={index}
              className="bg-background/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-1">
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">
                  {card.buttonLabel} {card.icon}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <ChartBarMultiple />
        <ChartPieDonutText />

        <div className=" col-span-2 ">
          <TableDashboard />
        </div>
        <CalendarDashboard />
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import type React from "react";

import { ModeToggle } from "@/components/ui/dark-mode";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DropdownNavProps, DropdownProps } from "react-day-picker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/origin-select";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import {
  Activity,
  ArrowRight,
  Bell,
  Calendar1Icon,
  CheckCheck,
  CheckCircle,
  ChevronDown,
  Clock,
  ClockIcon as ClockFading,
  CloudUpload,
  FileText,
  FolderSearch,
  GraduationCap,
  Home,
  LogOut,
  Megaphone,
  Plus,
  Send,
  Star,
  TrendingUp,
  UserCog2,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import morty from "@/assets/image.png";
const announcements = [
  {
    id: 1,
    title: "Scholarship Application Deadline Extended",
    description:
      "The deadline for scholarship applications has been extended to June 30, 2025.",
    date: "Dec 12, 2024",
    priority: "high",
  },
  {
    id: 2,
    title: "New Document Upload Feature",
    description:
      "You can now upload additional supporting documents through your dashboard.",
    date: "Dec 10, 2024",
    priority: "medium",
  },
];
const items = [
  {
    id: 1,
    date: "Mar 15, 2024",
    title: "Submitted",
    description: "Initial team meeting.",
  },
  {
    id: 2,
    date: "Mar 22, 2024",
    title: "Under Review",
    description: "Completed wireframes.",
  },
  {
    id: 3,
    date: "Apr 5, 2024",
    title: "Approve/Declined",
    description: "Approved",
  },
  {
    id: 4,
    date: "Apr 19, 2024",
    title: "Missing Requirements",
    description: "Your COR is expired",
  },
];
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { useUserStore } from "@/app/userData/User";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ClientDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const user = useUserStore((state) => state.user);
  const {clearUser} = useUserStore()

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  const router = useRouter()
  const HandleLogout = async () => {
    try {
      console.log(user)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_USER_API}/logout`, {id:2}, {withCredentials: true});
      if(res.status === 200){
        clearUser()
        router.replace("/")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="pl-1 pr-2 your-class min-h-screen">
      <header className="flex w-full items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex h-16 shrink-0 items-center gap-5 px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="mr-2 h-4" />

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

        <div className="mr-3 flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="gap-2">
                {(user as {firstName: string})?.firstName} {(user as {lastName: string})?.lastName} <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="sm"
                onClick={HandleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative p-2.5 border rounded-sm"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Notifications</h4>
                  <Badge variant="secondary" className="text-xs">
                    3 new
                  </Badge>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="space-y-1 p-2">
                  <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent cursor-pointer">
                    <div className="p-1 bg-green-100 dark:bg-green-900 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        Application Approved
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Your Merit Excellence Scholarship application has been
                        approved!
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 minutes ago
                      </p>
                    </div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent cursor-pointer">
                    <div className="p-1 bg-amber-100 dark:bg-amber-900 rounded-full">
                      <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Deadline Reminder</p>
                      <p className="text-xs text-muted-foreground">
                        STEM Innovation Grant deadline is in 3 days
                      </p>
                      <p className="text-xs text-muted-foreground">
                        1 hour ago
                      </p>
                    </div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent cursor-pointer">
                    <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Document Verified</p>
                      <p className="text-xs text-muted-foreground">
                        Your transcript has been successfully verified
                      </p>
                      <p className="text-xs text-muted-foreground">
                        3 hours ago
                      </p>
                    </div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent cursor-pointer opacity-60">
                    <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <Send className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        Application Submitted
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Your application for Academic Excellence Scholarship was
                        submitted
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t p-3">
                <Button variant="ghost" className="w-full text-sm" asChild>
                  <Link href="/announcements">View All Notifications</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <ModeToggle />
        </div>
      </header>
      {/* <div className="rounded-md border border-amber-500/40 px-4 py-3 text-amber-600/90 bg-amber-900/10 mt-5">
        <p className="text-sm">
          <TriangleAlert
            className="me-2 -mt-0.5 inline-flex opacity-70"
            size={16}
            aria-hidden="true"
          />
          You may apply for multiple scholarships, but once one is approved, all
          other pending applications will be automatically cancelled or blocked.
        </p>
      </div> */}
      <div className=" grid grid-cols-3  gap-5 px-5 mt-5">
        <div className="col-span-2 space-y-3">
          <div className="flex justify-between py-4">
            <div className="flex gap-5">
              <img
                className="h-15 w-15 aspect-square object-cover rounded-full"
                src={morty.src || "/placeholder.svg"}
                alt=""
              />
              <div>
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 via-green-400 to-teal-500 bg-clip-text text-transparent">
                  Hello, Jerome Tecson...
                </h1>
                <p className="text-muted-foreground text-sm">
                  You're on track to secure your scholarship. Keep up the great
                  work!
                </p>
              </div>
            </div>

            <span className="flex gap-3">
              <Button variant="outline">
                <UserCog2 />
                Edit profile
              </Button>
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-2 bg-background/40 flex flex-col justify-center px-3 py-3 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start ">
                <span className="border p-2 rounded-md">
                  <TrendingUp />
                </span>
                <p className="flex text-xs border p-1 rounded-sm bg-green-800/10 text-blue-600">
                  3 pending review
                </p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm text-muted-foreground">All Application</p>
                <p className="text-3xl font-semibold text-blue-600">2</p>
              </div>
            </div>
            <div className="space-y-2 bg-background/40 flex flex-col justify-center px-3 py-3 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start ">
                <span className="border p-2 rounded-md">
                  <CheckCheck />
                </span>
                <p className="flex text-xs border p-1 rounded-sm bg-green-800/10 text-green-600">
                  + 0 today
                </p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-3xl font-semibold text-green-600">0</p>
              </div>
            </div>
            <div className="space-y-2 bg-background/40 flex flex-col justify-center px-3 py-3 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start ">
                <span className="border p-2 rounded-md">
                  <CloudUpload />
                </span>
                <p className="flex text-xs border p-1 rounded-sm bg-green-800/10 text-yellow-500">
                  Avg. 14 days review
                </p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-semibold text-yellow-500">0</p>
              </div>
            </div>
            <div className="space-y-2 bg-background/40 flex flex-col justify-center px-3 py-3 rounded-xl border shadow-sm">
              <div className="flex justify-between items-start ">
                <span className="border p-2 rounded-md">
                  <Activity />
                </span>
                <p className="flex text-xs border p-1 rounded-sm bg-gray-800/10 text-gray-600">
                  Above average
                </p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-3xl font-semibold text-gray-600">2</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row-span-2  flex">
          <Card className="bg-background/40 flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                Announcements
              </CardTitle>
              <CardDescription>Keep on latest update</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 ">
              <Timeline className="divide-y rounded-lg border">
                {announcements.map((item) => (
                  <TimelineItem
                    key={item.id}
                    step={item.id}
                    className="m-0! px-4! py-3!"
                  >
                    <TimelineContent className="text-foreground">
                      {item.description}
                      <TimelineDate className="mt-1">{item.date}</TimelineDate>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
            <CardFooter>
              <Button className="w-full " size="sm" variant="outline">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="flex gap-3 flex-col lg:flex-row col-span-2">
          <div className="w-full bg-background/40 flex items-center py-5 rounded-xl shadow-sm border">
            <div className="w-full px-5 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap />
                  <h1 className="font-semibold">Browse Scholarship</h1>
                </div>
                <div className="shadow-md h-6 w-6 flex justify-center items-center rounded-full">
                  <ArrowRight size={15} />
                </div>
              </div>
              <p className="text-sm mt-2">
                Submit a new application for available scholarship opportunities
                with ease.
              </p>
            </div>
            <Separator orientation="vertical" />
            <div className="w-full px-5 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderSearch />
                  <h1 className="font-semibold"> Review My Application</h1>
                </div>
                <ArrowRight size={15} />
              </div>
              <p className="text-sm mt-2">
                Check the status, details, and progress of your submitted
                applications.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2">
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
                Active Scholarship
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
                Recent Application
              </TabsTrigger>
              <TabsTrigger
                value="tab-3"
                className="data-[state=active]:bg-muted data-[state=active]:after:bg-primary relative overflow-hidden rounded-none border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e flex-1"
              >
                <Home
                  className="-ms-0.5 me-1.5 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Track Application
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1">
              <Card className="bg-background/40">
                <CardHeader>
                  <CardTitle>Active Scholarships</CardTitle>
                  <CardDescription>
                    Available scholarships you can apply for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Academic Excellence Scholarship
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Merit-based scholarship for outstanding academic
                          performance
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="secondary">$7,500</Badge>
                          <span className="text-sm text-muted-foreground">
                            Due: March 15, 2025
                          </span>
                        </div>
                      </div>
                      <Button size="sm">Apply Now</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">STEM Innovation Grant</h3>
                        <p className="text-sm text-muted-foreground">
                          For students pursuing Science, Technology,
                          Engineering, or Mathematics
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="secondary">$5,000</Badge>
                          <span className="text-sm text-muted-foreground">
                            Due: April 1, 2025
                          </span>
                        </div>
                      </div>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View More
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tab-2">
              <Card className="bg-background/40">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>
                    Your latest scholarship applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          Academic Excellence Scholarship
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Merit-based scholarship for outstanding academic
                          performance
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="secondary">$7,500</Badge>
                          <span className="text-sm text-muted-foreground">
                            Due: March 15, 2025
                          </span>
                        </div>
                      </div>
                      <Button size="sm">Apply Now</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">STEM Innovation Grant</h3>
                        <p className="text-sm text-muted-foreground">
                          For students pursuing Science, Technology,
                          Engineering, or Mathematics
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="secondary">$5,000</Badge>
                          <span className="text-sm text-muted-foreground">
                            Due: April 1, 2025
                          </span>
                        </div>
                      </div>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View More
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tab-3">
              <Card className="bg-background/40">
                <CardHeader>
                  <CardTitle>Track Applications</CardTitle>
                  <CardDescription>
                    Monitor the progress of your scholarship applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">
                          Academic Excellence Scholarship
                        </h3>
                        <Badge variant="outline">Under Review</Badge>
                      </div>
                      <Timeline defaultValue={3} orientation="horizontal">
                        {items.map((item) => (
                          <TimelineItem key={item.id} step={item.id}>
                            <TimelineHeader>
                              <TimelineSeparator />
                              <TimelineDate>{item.date}</TimelineDate>
                              <TimelineTitle>{item.title}</TimelineTitle>
                              <TimelineIndicator />
                            </TimelineHeader>
                            <TimelineContent>
                              {item.description}
                            </TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">STEM Innovation Grant</h3>
                        <Badge variant="outline">Submitted</Badge>
                      </div>
                      <Timeline defaultValue={3} orientation="horizontal">
                        {items.map((item) => (
                          <TimelineItem key={item.id} step={item.id}>
                            <TimelineHeader>
                              <TimelineSeparator />
                              <TimelineDate>{item.date}</TimelineDate>
                              <TimelineTitle>{item.title}</TimelineTitle>
                              <TimelineIndicator />
                            </TimelineHeader>
                            <TimelineContent>
                              {item.description}
                            </TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="row-span-3">
          <Card className="bg-background/40">
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl bg-background/40 border py-8 px-5 w-full"
                classNames={{
                  month_caption: "mx-0",
                }}
                captionLayout="dropdown"
                defaultMonth={new Date()}
                startMonth={new Date(1980, 6)}
                hideNavigation
                components={{
                  DropdownNav: (props: DropdownNavProps) => {
                    return (
                      <div className="flex w-full items-center gap-2">
                        {props.children}
                      </div>
                    );
                  },
                  Dropdown: (props: DropdownProps) => {
                    return (
                      <Select
                        value={String(props.value)}
                        onValueChange={(value) => {
                          if (props.onChange) {
                            handleCalendarChange(value, props.onChange);
                          }
                        }}
                      >
                        <SelectTrigger className="h-8 w-fit font-medium first:grow">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                          {props.options?.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={String(option.value)}
                              disabled={option.disabled}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

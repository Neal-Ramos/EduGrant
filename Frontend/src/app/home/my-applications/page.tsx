"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import morty from "@/assets/image.png";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Send,
  FileSearch,
  AlertTriangle,
  ChevronDown,
  LogOut,
  Megaphone,
  Bell,
  Info,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";

export default function TrackScholarship() {
  const [activeTab, setActiveTab] = useState("submitted");

  return (
    <div className="bg-background min-h-screen">
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

        <div className="mr-4 flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="gap-2">
                Admin 001 <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="sm"
                onClick={() => {
                  console.log("click")
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="icon">
            <Megaphone className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="mt-2 text-muted-foreground">
            Track and manage your scholarship applications
          </p>
        </div>

        <Tabs
          defaultValue="submitted"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 h-auto w-full bg-muted/50">
            <TabsTrigger
              value="submitted"
              className="relative flex flex-col md:flex-row items-center gap-1 md:gap-2 p-3 text-xs md:text-sm"
            >
              <Send className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline">Submitted/Pending</span>
              <span className="sm:hidden">Submitted</span>
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="relative flex flex-col md:flex-row items-center gap-1 md:gap-2 p-3 text-xs md:text-sm"
            >
              <FileSearch className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline">Under Review</span>
              <span className="sm:hidden">Review</span>
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                1
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="decision"
              className="relative flex flex-col md:flex-row items-center gap-1 md:gap-2 p-3 text-xs md:text-sm"
            >
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline">Approved/Declined</span>
              <span className="sm:hidden">Decision</span>
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                1
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="missing"
              className="relative flex flex-col md:flex-row items-center gap-1 md:gap-2 p-3 text-xs md:text-sm"
            >
              <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline">Missing Requirements</span>
              <span className="sm:hidden">Missing</span>
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                1
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submitted" className="space-y-6">
            <div className="rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-68 w-full h-48 md:h-auto flex-shrink-0 bg-muted">
                  <img
                    src={morty.src}
                    alt="Scholarship logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between p-6 w-full">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">
                        Kuya Wil Scholarship Program
                      </h3>
                      <span className="text-lg font-bold text-green-600">
                        ₱3,000
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      by Wally Revillame Foundation
                    </p>

                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                    >
                      PENDING
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        Application Date
                      </span>
                      <div className="text-sm font-medium mt-1">
                        February 12, 2025
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        Documents
                      </span>
                      <div className="text-sm font-medium mt-1 text-green-600">
                        3/3 Complete
                      </div>
                    </div>
                    <div className="flex gap-2 items-end md:justify-end">
                      <Link href={`/home/my-applications/111}`}>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Info className="h-4 w-4" />
                          More Info
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-6">
            <div className="text-center py-12">
              <FileSearch className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Under Review</h3>
              <p className="text-muted-foreground">
                Applications currently being reviewed will appear here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="decision" className="space-y-6">
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Decisions</h3>
              <p className="text-muted-foreground">
                Approved and declined applications will appear here.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="missing" className="space-y-6">
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Missing Requirements
              </h3>
              <p className="text-muted-foreground">
                Applications with missing documents will appear here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

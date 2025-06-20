"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Info,
  Megaphone,
  Pin,
  Sun,
  Moon,
  X,
  Calendar,
  FileText,
} from "lucide-react";

interface Announcement {
  id: string;
  type: "urgent" | "info" | "success" | "warning" | "deadline";
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  isPinned: boolean;
  category: string;
  actionRequired?: boolean;
}

const announcements: Announcement[] = [
  {
    id: "1",
    type: "urgent",
    title: "System Maintenance Scheduled",
    message:
      "The scholarship portal will be temporarily unavailable on March 20, 2025, from 2:00 AM to 6:00 AM for scheduled maintenance. Please plan your submissions accordingly.",
    date: "2025-01-20",
    isRead: false,
    isPinned: true,
    category: "System",
    actionRequired: false,
  },
  {
    id: "2",
    type: "deadline",
    title: "Merit Excellence Scholarship - Deadline Approaching",
    message:
      "Only 5 days left to submit your application for the Merit Excellence Scholarship. Don't miss this opportunity for ₱15,000 in financial aid.",
    date: "2025-01-19",
    isRead: false,
    isPinned: true,
    category: "Deadline",
    actionRequired: true,
  },
  {
    id: "3",
    type: "success",
    title: "New Scholarship Programs Available",
    message:
      "We're excited to announce 3 new scholarship programs for the upcoming semester. Applications are now open for STEM Innovation Grant, Arts & Culture Scholarship, and Community Service Award.",
    date: "2025-01-18",
    isRead: true,
    isPinned: false,
    category: "New Programs",
    actionRequired: false,
  },
  {
    id: "4",
    type: "info",
    title: "Document Upload Guidelines Updated",
    message:
      "We've updated our document upload guidelines to improve the application process. Please review the new requirements before submitting your documents.",
    date: "2025-01-17",
    isRead: true,
    isPinned: false,
    category: "Guidelines",
    actionRequired: false,
  },
  {
    id: "5",
    type: "warning",
    title: "Incomplete Applications Reminder",
    message:
      "Several applications are missing required documents. Please check your application status and upload any missing files before the deadline.",
    date: "2025-01-16",
    isRead: false,
    isPinned: false,
    category: "Reminder",
    actionRequired: true,
  },
  {
    id: "6",
    type: "info",
    title: "Scholarship Workshop This Friday",
    message:
      "Join us for a free workshop on 'How to Write a Winning Scholarship Essay' this Friday at 3:00 PM in the Student Center. Registration is not required.",
    date: "2025-01-15",
    isRead: true,
    isPinned: false,
    category: "Events",
    actionRequired: false,
  },
];

export default function Announcements() {
  const [announcementList, setAnnouncementList] = useState(announcements);
  const [filter, setFilter] = useState<"all" | "unread" | "pinned">("all");



  const markAsRead = (id: string) => {
    setAnnouncementList((prev) =>
      prev.map((announcement) =>
        announcement.id === id
          ? { ...announcement, isRead: true }
          : announcement
      )
    );
  };

  const togglePin = (id: string) => {
    setAnnouncementList((prev) =>
      prev.map((announcement) =>
        announcement.id === id
          ? { ...announcement, isPinned: !announcement.isPinned }
          : announcement
      )
    );
  };

  const dismissAnnouncement = (id: string) => {
    setAnnouncementList((prev) =>
      prev.filter((announcement) => announcement.id !== id)
    );
  };

  const filteredAnnouncements = announcementList.filter((announcement) => {
    switch (filter) {
      case "unread":
        return !announcement.isRead;
      case "pinned":
        return announcement.isPinned;
      default:
        return true;
    }
  });

  const unreadCount = announcementList.filter((a) => !a.isRead).length;
  const pinnedCount = announcementList.filter((a) => a.isPinned).length;

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
                <BreadcrumbPage>Announcements</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mr-4">
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Megaphone className="h-8 w-8 text-primary" />
            Announcements
          </h1>
          <p className="mt-2 text-muted-foreground">
            Stay updated with the latest news, deadlines, and important
            information about scholarships.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="gap-2"
          >
            <Bell className="h-4 w-4" />
            All ({announcementList.length})
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            onClick={() => setFilter("unread")}
            className="gap-2"
          >
            <div className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </div>
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === "pinned" ? "default" : "outline"}
            onClick={() => setFilter("pinned")}
            className="gap-2"
          >
            <Pin className="h-4 w-4" />
            Pinned ({pinnedCount})
          </Button>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No announcements found
                </h3>
                <p className="text-muted-foreground text-center">
                  {filter === "unread"
                    ? "You're all caught up! No unread announcements."
                    : filter === "pinned"
                    ? "No pinned announcements at the moment."
                    : "No announcements available right now."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <Card
                key={announcement.id}
                className={`transition-all duration-200 hover:shadow-md ${
                  !announcement.isRead
                    ? "border-l-4 border-l-primary bg-primary/5"
                    : ""
                } ${announcement.isPinned ? "ring-1 ring-primary/20" : ""}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                     
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg leading-tight">
                            {announcement.title}
                          </h3>
                          {announcement.isPinned && (
                            <Pin className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-3 w-3" />
                          {new Date(announcement.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                          <span>•</span>
                          <span>{announcement.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                        
                          {announcement.actionRequired && (
                            <Badge variant="outline" className="text-xs">
                              Action Required
                            </Badge>
                          )}
                          {!announcement.isRead && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-primary/10 text-primary border-primary/20"
                            >
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePin(announcement.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Pin
                          className={`h-4 w-4 ${
                            announcement.isPinned
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissAnnouncement(announcement.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {announcement.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {announcement.actionRequired && (
                        <Button size="sm" className="gap-2">
                          <FileText className="h-4 w-4" />
                          Take Action
                        </Button>
                      )}
                      {!announcement.isRead && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(announcement.id)}
                          className="gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Stats */}
        {announcementList.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {announcementList.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {unreadCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Unread</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {pinnedCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Pinned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {announcementList.filter((a) => a.actionRequired).length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Action Required
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

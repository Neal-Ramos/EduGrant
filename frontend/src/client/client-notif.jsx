import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

import Notification from "./breadcrumbs-widget";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function ClientNotif() {
  return (
    <>
      <header className="flex bg-gradient-to-bl from-green-700 to-green-900 h-16 items-center justify-between px-5 text-white border-b shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                Navigation
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Notification
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Notification />
      </header>
      <div className="p-4 flex justify-center">
        <Tabs defaultValue="notification" className="w-3/4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notification">Notification</TabsTrigger>
            <TabsTrigger value="announcement">Announcement</TabsTrigger>
          </TabsList>

          {/* Notification Tab */}
          <TabsContent value="notification">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  You have new updates regarding your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="border p-3 rounded-lg bg-gray-50">
                  <strong>Profile Updated</strong>
                  <p>Your profile information has been successfully updated.</p>
                  <small className="text-gray-500">2 hours ago</small>
                </div>
                <div className="border p-3 rounded-lg bg-gray-50">
                  <strong>New Login Detected</strong>
                  <p>We noticed a login from a new device.</p>
                  <small className="text-gray-500">Yesterday at 8:45 PM</small>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">View more</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Announcement Tab */}
          <TabsContent value="announcement">
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>
                  Stay informed with the latest news and updates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="border p-3 rounded-lg bg-blue-50">
                  <strong>System Maintenance</strong>
                  <p>Scheduled maintenance on May 5, 2025 from 1AM to 4AM.</p>
                  <small className="text-blue-500">Posted 1 day ago</small>
                </div>
                <div className="border p-3 rounded-lg bg-blue-50">
                  <strong>New Feature Released</strong>
                  <p>
                    Check out the new dashboard insights under your account
                    menu.
                  </p>
                  <small className="text-blue-500">Posted 3 days ago</small>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">View all announcements</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

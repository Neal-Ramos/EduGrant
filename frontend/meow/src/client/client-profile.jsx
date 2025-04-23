import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Notification from "./notif";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

export default function ClientProfile() {
  const [profilePic, setProfilePic] = React.useState(null);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <header className="flex bg-green-800 h-16 items-center justify-between px-5 text-white border-b shadow-sm">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">General</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Student Profile
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Notification />
      </header>
      <div className="h-full w-full flex justify-center items-start mt-5">
        <Tabs defaultValue="account" className="w-3/4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="bg-white rounded-md shadow-md p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
                  {/* Profile Image Section */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative flex justify-center items-end">
                      <img
                        src={
                          profilePic ||
                          "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
                        }
                        alt="Profile"
                        className="h-48 w-48 rounded-full object-cover ring-4 ring-indigo-200 hover:scale-105 transition-transform"
                      />

                      {/* Hidden file input */}
                      <input
                        id="upload"
                        type="file"
                        accept="image/*"
                        onChange={handleProfileChange}
                        className="hidden"
                      />

                      {/* Custom label button */}
                      <label
                        htmlFor="upload"
                        className="absolute  bg-zinc-600 text-white text-sm py-2 px-3 rounded-md shadow-md hover:bg-indigo-700 cursor-pointer transition"
                      >
                        Change Photo
                      </label>
                    </div>

                    <h2 className="font-semibold text-gray-700">
                      Student ID: 20251001
                    </h2>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 space-y-3">
                    <h1 className="text-4xl font-bold text-gray-800">
                      Juan Dela Cruz
                    </h1>
                    <h3 className="text-lg font-medium text-green-600">
                      BSIT - 3A
                    </h3>
                    <p className="text-gray-600">juandelacruz@gmail.com</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

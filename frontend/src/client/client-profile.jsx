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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Notification from "./breadcrumbs-widget";
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
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export default function ClientProfile() {
  const {user} = useContext(AuthContext)
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                Navigation
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">Profile</BreadcrumbPage>
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
              <CardContent className="space-y-2">
                <div className="flex flex-col items-center">
                  <div className="relative flex justify-center items-end">
                    <img
                      src={
                        profilePic ||
                        "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
                      }
                      alt="Profile"
                      className="h-48 w-48 rounded-full object-cover ring-4 ring-green-800 hover:scale-105 transition-transform"
                    />
                    <input
                      id="upload"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="upload"
                      className="absolute  text-white text-sm py-2 px-3 rounded-md shadow-md bg-green-800 hover:bg-green-700 cursor-pointer transition"
                    >
                      Change Photo
                    </label>
                  </div>

                  <h2 className="font-semibold text-black mt-5 text-2xl">
                    2022000510
                  </h2>
                  <h2 className="font-semibold text-black text-4xl">
                    {`${user.firstName} ${user.middleName} ${user.lastName}`}
                  </h2>
                  <h2 className="font-semibold text-black/50">
                    {user.userEmail}
                  </h2>
                  <div className="w-full flex flex-col gap-4 mt-20">
                    <div className=" w-full">
                      <div className="flex gap-3">
                        <div className="w-full">
                          <Label></Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="bulacan">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-full flex gap-2">
                          <Label></Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="bulacan">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="bulacan">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="bulacan">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className=" w-full">
                      <Label></Label>
                      <Input placeholder="Contact Number" />
                    </div>
                    <div className=" w-full">
                      <Label></Label>
                      <Input placeholder="Address" />
                    </div>
                    <div className=" w-full">
                      <Label></Label>
                      <Input />
                    </div>
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

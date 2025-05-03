import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { SidebarTrigger } from "../components/ui/sidebar";
import { useState } from "react";
import { ArrowRight, Calendar, GraduationCap, IdCard } from "lucide-react";
import Notification from "./breadcrumbs-widget";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Send, Timer, CircleMinus, Check } from "lucide-react";

import { Separator } from "@/components/ui/separator";

const tabs = [
  {
    name: "Submitted",
    icon: Send,
  },
  {
    name: "Under Review",
    icon: Timer,
  },
  {
    name: "Approved/Rejected",
    icon: Check,
  },
  {
    name: "Missing Requirements",
    icon: CircleMinus,
  },
];

export default function ClientApplication() {
  const [activeTab, setActiveTab] = useState(0);
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
                <BreadcrumbPage className="text-white">
                  My Applications
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Notification />
      </header>

      <div className="p-4">
        <p className="text-2xl font-bold zxc tracking-[-3px]">My Application</p>
        <p className="text-sm text-gray-600 ml-0.5">
          Stay updated on your scholarship application progress in real time.
        </p>
      </div>
      <div className="px-5">
        <Separator />
      </div>
      <div className=" p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 p-[3px] gap-3 rounded-md ">
          {tabs.map((meow, index) => (
            <div key={index} onClick={() => setActiveTab(index)}>
              <div className="space-x-1">
                <span className="text-2xl font-bold zxx text-yellow-800">
                  0{index + 1}
                </span>
                <span className="zxc tracking-[-3px]">{meow.name}</span>
              </div>

              <div className="relative flex items-center">
                <div
                  className={`rounded-full h-7 w-7 p-1 flex justify-center items-center
            ${
              activeTab === 3
                ? index === 3
                  ? "bg-yellow-600"
                  : "bg-zinc-300"
                : index <= activeTab
                ? index === 3
                  ? "bg-yellow-600"
                  : "bg-green-600"
                : "bg-zinc-300"
            }`}
                >
                  <Check
                    className={`${
                      activeTab === 3
                        ? index === 3
                          ? "text-white"
                          : "text-black/50"
                        : index <= activeTab
                        ? "text-white"
                        : "text-black/50"
                    }`}
                  />
                </div>
                <div
                  className={`${
                    activeTab === 3
                      ? index === 3
                        ? "border-yellow-300"
                        : "border-zinc-300"
                      : index <= activeTab
                      ? index === 3
                        ? "border-yellow-300"
                        : "border-green-300"
                      : "border-zinc-300"
                  } w-full border-1`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 p-4">
        {activeTab === 0 && (
          <div className="grid grid-cols-4 gap-3">
            <div className=" flex flex-col gap-4 pt-5 bg-card rounded-xl shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="bg-zinc-200 p-1 rounded-md">
                    <GraduationCap />
                  </div>
                  <p
                    className="flex items-center gap-1 text-sm 
                    py-1 px-2 rounded-full font-semibold"
                  >
                    <IdCard size={20} />
                    Documents 3/3
                  </p>
                </div>
                <CardTitle className="flex items-center text-lg  gap-2 mt-1">
                  Win Gatchalian
                </CardTitle>
                <CardDescription className="text-xs flex items-center gap-1">
                  <Calendar size={12} /> Application Date: 02-17-2005
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-around py-2">
                <span className="flex items-center gap-3 flex-col">
                  <p className="text-sm">Status</p>
                  <p className="font-semibold text-1xl">Submitted</p>
                </span>
              </CardContent>

              <p className="text-center border-t-1 p-5 text-xs flex justify-center items-center gap-1 font-medium ">
                View Details <ArrowRight size={15} />
              </p>
            </div>
          </div>
        )}
        {activeTab === 1 && (
          <div className="grid grid-cols-4 gap-3">
            <div className=" flex flex-col gap-4 pt-5 bg-card rounded-xl shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="bg-zinc-200 p-1 rounded-md">
                    <GraduationCap />
                  </div>
                  <p
                    className="flex items-center gap-1 text-sm 
                    py-1 px-2 rounded-full font-semibold"
                  >
                    <IdCard size={20} />
                    Documents 3/3
                  </p>
                </div>
                <CardTitle className="flex items-center text-lg  gap-2 mt-1">
                  Win Gatchalian
                </CardTitle>
                <CardDescription className="text-xs flex items-center gap-1">
                  <Calendar size={12} /> Application Date: 02-17-2005
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-around py-2">
                <span className="flex items-center gap-3 flex-col">
                  <p className="text-sm">Status</p>
                  <p className="font-semibold text-1xl">Under Review</p>
                </span>
              </CardContent>

              <p className="text-center border-t-1 p-5 text-xs flex justify-center items-center gap-1 font-medium ">
                View Details <ArrowRight size={15} />
              </p>
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div className="grid grid-cols-4 gap-3">
            <div className=" flex flex-col gap-4 pt-5 bg-card rounded-xl shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="bg-zinc-200 p-1 rounded-md">
                    <GraduationCap />
                  </div>
                  <p
                    className="flex items-center gap-1 text-sm 
                    py-1 px-2 rounded-full font-semibold"
                  >
                    <IdCard size={20} />
                    Documents 3/3
                  </p>
                </div>
                <CardTitle className="flex items-center text-lg  gap-2 mt-1">
                  Win Gatchalian
                </CardTitle>
                <CardDescription className="text-xs flex items-center gap-1">
                  <Calendar size={12} /> Application Date: 02-17-2005
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-around py-2">
                <span className="flex items-center gap-3 flex-col">
                  <p className="text-sm">Status</p>
                  <p className="font-semibold text-1xl">Approved</p>
                </span>
              </CardContent>

              <p className="text-center border-t-1 p-5 text-xs flex justify-center items-center gap-1 font-medium ">
                View Details <ArrowRight size={15} />
              </p>
            </div>
            <div className=" flex flex-col gap-4 pt-5 bg-card rounded-xl shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="bg-zinc-200 p-1 rounded-md">
                    <GraduationCap />
                  </div>
                  <p
                    className="flex items-center gap-1 text-sm 
                    py-1 px-2 rounded-full font-semibold"
                  >
                    <IdCard size={20} />
                    Documents 3/3
                  </p>
                </div>
                <CardTitle className="flex items-center text-lg  gap-2 mt-1">
                  Win Gatchalian
                </CardTitle>
                <CardDescription className="text-xs flex items-center gap-1">
                  <Calendar size={12} /> Application Date: 02-17-2005
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-around py-2">
                <span className="flex items-center gap-3 flex-col">
                  <p className="text-sm">Status</p>
                  <p className="font-semibold text-1xl">Reject</p>
                </span>
              </CardContent>

              <p className="text-center border-t-1 p-5 text-xs flex justify-center items-center gap-1 font-medium ">
                View Details <ArrowRight size={15} />
              </p>
            </div>
          </div>
        )}
        {activeTab === 3 && (
          <div className="grid grid-cols-4 gap-3">
            <div className=" flex flex-col gap-4 pt-5 bg-card rounded-xl shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="bg-zinc-200 p-1 rounded-md">
                    <GraduationCap />
                  </div>
                  <p
                    className="flex items-center gap-1 text-sm 
                    py-1 px-2 rounded-full font-semibold"
                  >
                    <IdCard size={20} />
                    Documents 2/3
                  </p>
                </div>
                <CardTitle className="flex items-center text-lg  gap-2 mt-1">
                  Win Gatchalian
                </CardTitle>
                <CardDescription className="text-xs flex items-center gap-1">
                  <Calendar size={12} /> Application Date: 02-17-2005
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-around py-2">
                <span className="flex items-center gap-3 flex-col">
                  <p className="text-sm">Status</p>
                  <p className="font-semibold text-1xl">Missing Requirements</p>
                </span>
              </CardContent>

              <p className="text-center border-t-1 p-5 text-xs flex justify-center items-center gap-1 font-medium ">
                View Details <ArrowRight size={15} />
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../components/ui/sidebar";

import { CheckCheck, GraduationCap, Layers, Timer, X } from "lucide-react";

export default function Dashboard() {
  const applications = [
    {
      applicationId: "APP001",
      studentName: "John Doe",
      totalAppliedScholar: 3,
      status: "Approved",
    },
    {
      applicationId: "APP002",
      studentName: "Jane Smith",
      totalAppliedScholar: 1,
      status: "Pending",
    },
    {
      applicationId: "APP003",
      studentName: "Alice Johnson",
      totalAppliedScholar: 2,
      status: "Rejected",
    },
    {
      applicationId: "APP004",
      studentName: "Michael Lee",
      totalAppliedScholar: 4,
      status: "Approved",
    },
    {
      applicationId: "APP005",
      studentName: "Emily Davis",
      totalAppliedScholar: 2,
      status: "Pending",
    },
  ];

  return (
    <>
      <header className="flex bg-green-800 h-16 items-center justify-between px-5 text-white border-b shadow-sm">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Application Management</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div
        className="flex justify-center
      gap-2"
      >
        <div className="w-3/4p-3 flex flex-col gap-5 justify-between">
          <div className="grid grid-cols-4 text-center p-2 text-left zxc gap-5 tracking-[-2px]">
            <span className="p-3 bg-blue-100 rounded-md flex items-center gap-3">
              <span className="bg-blue-300 p-3 rounded-md">
                <Layers size={44} absoluteStrokeWidth />
              </span>
              <span>
                <p> TOTAL</p>
                <p className="text-5xl">0</p>
              </span>
            </span>
            <span className="p-3  bg-green-200 rounded-md flex items-center gap-3">
              <span className="bg-green-400 p-3 rounded-md">
                <CheckCheck size={44} absoluteStrokeWidth />
              </span>
              <span>
                <p>APPROVED</p>
                <p className="text-5xl">0</p>
              </span>
            </span>

            <span className="p-3  bg-amber-200 rounded-md flex items-center gap-3">
              <span className="bg-amber-400 p-3 rounded-md">
                <Timer size={44} absoluteStrokeWidth />
              </span>
              <span>
                <p>PENDING</p>
                <p className="text-5xl">0</p>
              </span>
            </span>
            <span className="p-3  bg-purple-200 rounded-md flex items-center gap-3">
              <span className="bg-purple-400 p-3 rounded-md">
                <GraduationCap size={44} absoluteStrokeWidth />
              </span>
              <span>
                <p>ACTIVE SCHOLAR</p>
                <p className="text-5xl">0</p>
              </span>
            </span>
          </div>
          <div className="p-2 flex flex-col gap-3">
            <h1 className="zxc text-2xl tracking-[-3px]">Recent Application</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Application ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Total Applied Scholar</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.applicationId}>
                    <TableCell className="font-medium">
                      {app.applicationId}
                    </TableCell>
                    <TableCell>{app.studentName}</TableCell>
                    <TableCell>{app.totalAppliedScholar}</TableCell>
                    <TableCell>{app.status}</TableCell>
                    <TableCell className="text-right">
                      <button className="text-green-600 hover:underline">
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        <div className="w-1/4 flex flex-col bg-green-800 h-[calc(100vh-65px)] px-0.5 gap-0.5">
          <div className="h-3/4  bg-white"></div>

          
          <div className="h-1/2 bg-green-800">
            <div className="h-full bg-white"></div>
            <div className="h-full bg-white"></div>
          </div>
        </div>
      </div>
    </>
  );
}

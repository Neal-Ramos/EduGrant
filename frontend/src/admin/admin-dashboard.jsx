import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

import {
  Activity,
  Archive,
  ArrowBigUp,
  ChartNoAxesCombined,
  Clock,
  FileBarChart2,
  FileClock,
  Megaphone,
  PlusCircle,
  SquareArrowOutUpRight,
  TrendingUp,
  UserRound,
  UserRoundCheck,
  UserRoundX,
  Users2,
  UsersRound,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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
import { useEffect, useState } from "react";
import {
  CheckCheck,
  GraduationCap,
  Layers,
  Timer,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Component } from "./piechart";
import { Link } from "react-router-dom";
function Loader() {
  return (
    <div className="flex justify-center items-center col-span-4">
      <div className="w-8 h-8 border-4 border-t-transparent border-black border-solid rounded-full animate-spin"></div>
    </div>
  );
}
export default function Dashboard() {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scholar, setScholar] = useState([]);
  useEffect(() => {
    async function fetchStudent() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch("/appli.json");
      const data = await response.json();

      setStudent(data);
      setLoading(false);
    }
    fetchStudent();
  }, []);

  useEffect(() => {
    async function fetchScholar() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch("/ships.json");
      const data = await response.json();

      setScholar(data);
      setLoading(false);
    }
    fetchScholar();
  }, []);

  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const goToPasswordTab = () => {
    navigate("/admin-home/scholarships?=add");
  };

  return (
    <main>
      <header className="flex bg-gradient-to-bl from-green-700 to-green-900 h-16 items-center justify-between px-5 text-white border-b shadow-sm sticky top-0">
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
      <div className=" overflow-hidden px-4 space-y-5 mt-3">
        {/* <div className="grid grid-cols-4 divide-x py-3 rounded-lg gap-3 shadow-sm bg-white ">
          <span className="p-2">
            <div className="flex justify-center gap-2">
              <UsersRound className="" />
              <div className="flex flex-col gap-2 ">
                <p>Total Applicant</p>
                <div className="flex items-center gap-2">
                  <p className="text-5xl font-semibold">0</p>
                </div>
              </div>
            </div>
          </span>
          <span className="p-2 ">
            <div className="flex justify-center gap-2">
              <UserRoundCheck className="" />
              <div className="flex flex-col gap-2 ">
                <p>Approved</p>
                <p className="text-5xl font-semibold">0</p>
              </div>
            </div>
          </span>
          <span className="p-2 ">
            <div className="flex justify-center gap-2">
              <FileClock className="" />
              <div className="flex flex-col gap-2 ">
                <p>In Review</p>
                <p className="text-5xl font-semibold">0</p>
              </div>
            </div>
          </span>
          <span className="p-2 ">
            <div className="flex justify-center gap-2">
              <UserRoundX className="" />
              <div className="flex flex-col gap-2 ">
                <p>Active Scholar</p>
                <p className="text-5xl font-semibold">0</p>
              </div>
            </div>
          </span>
        </div> */}

        <div className="grid grid-cols-4 py-4 text-left zxc gap-3 tracking-[-2px]">
          <span className="p-3 bg-blue-200 rounded-md flex items-center gap-3 shadow-md">
            <span className="bg-blue-400 p-3 rounded-md shadow-sm shadow">
              <Layers size={40} absoluteStrokeWidth />
            </span>
            <span>
              <p> TOTAL</p>
              <div className="text-4xl">
                {loading ? <Loader /> : student.length}
              </div>
            </span>
          </span>
          <span className="p-3 bg-green-200 rounded-md flex items-center gap-3 shadow-md">
            <span className="bg-green-400 p-3 rounded-md shadow-sm">
              <CheckCheck size={40} absoluteStrokeWidth />
            </span>
            <span>
              <p>APPROVED</p>
              <div className="text-4xl">
                {loading ? (
                  <Loader />
                ) : (
                  student.filter((student) => student.approved).length
                )}
              </div>
            </span>
          </span>

          <span className="p-3 bg-amber-200 rounded-md flex items-center gap-3 shadow-md">
            <span className="bg-amber-400 p-3 rounded-md shadow-sm">
              <Timer size={40} absoluteStrokeWidth />
            </span>
            <span>
              <p>IN REVIEW</p>
              <div className="text-4xl">
                {loading ? (
                  <Loader />
                ) : (
                  student.filter((student) =>
                    student.scholarships.some((ngi) => ngi.pending)
                  ).length
                )}
              </div>
            </span>
          </span>
          <span className="p-3 bg-purple-200 rounded-md flex items-center gap-3 shadow-md">
            <span className="bg-purple-400 p-3 rounded-md shadow-sm">
              <GraduationCap size={40} absoluteStrokeWidth />
            </span>
            <span>
              <p className="whitespace-nowrap">ACTIVE</p>
              <div className="text-4xl">
                {loading ? (
                  <Loader />
                ) : (
                  scholar.map((meong) => meong.name).length
                )}
              </div>
            </span>
          </span>
        </div>

        <div className="flex gap-5">
          <div className="w-3/4 space-y-2">
            <div className="flex gap-3">
              <div className="w-1/2">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="flex gap-1.5 items-center">
                      <GraduationCap />
                      Add Scholarship
                    </CardTitle>
                    <CardDescription>
                      Create and publish a new scholarship opportunity for
                      students in just a few steps.
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="">
                    <Button onClick={goToPasswordTab}>
                      Add <Plus />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="w-1/2">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="flex gap-1 items-center">
                      <Activity />
                      Scholarship Report
                    </CardTitle>

                    <CardDescription>
                      View and export detailed reports on scholarship
                      applications and awards.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-end">
                    <Link to="/admin-home/scholarships" className="w-full">
                      <Button className="">
                        Generate <Zap />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
            <h1 className="font-semibold text-xl mt-8">Recent Application</h1>
            <p className="text-black/60">
              Course, year level, and section of the applicant.
            </p>
            <div className="w-full">
              <div className="w-full grid grid-cols-3 gap-3">
                {student
                  .filter((meow) =>
                    meow.scholarships.some((arf) => arf.pending)
                  )
                  .map((ngi) => (
                    <Card key={ngi.name} className="w-full ">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <UserRound /> {ngi.name}
                          <p className="text-xs py-1 px-2 rounded-2xl bg-blue-100 text-blue-700  border-1 font-semibold flex items-center gap-2 shadow">
                            In review
                            <Clock
                              className="bg-blue-500 rounded-full text-white  shadow "
                              size={15}
                            />
                          </p>
                        </CardTitle>
                        <CardDescription className="flex justify-between">
                          <div>
                            {ngi.course}-{ngi.yearLevel}
                            {ngi.section}
                          </div>
                          <div>Documents 3/3</div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center">
                        <div className="flex  gap-2">
                          <GraduationCap />
                          <div className="">
                            <p>Applied Scholarships</p>
                            <p className="text-3xl font-semibold">
                              {ngi.scholarships.length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Link to="/admin-home/applications" className="w-full">
                          <Button className="w-full flex items-center bg-blue-800">
                            View <SquareArrowOutUpRight />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}

                {/* <Card key={meow.name} className="w-full ">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserRound /> {meow.name}
                      <p className="text-xs py-1 px-2 rounded-2xl bg-blue-100 text-blue-700  border-1 font-semibold flex items-center gap-2 shadow">
                        In review
                        <Clock
                          className="bg-blue-500 rounded-full text-white  shadow "
                          size={15}
                        />
                      </p>
                    </CardTitle>
                    <CardDescription className="flex justify-between">
                      <div>
                        {meow.course}-{meow.yearLevel}
                        {meow.section}
                      </div>
                      <div>Documents 3/3</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center">
                    <div className="flex  gap-2">
                      <GraduationCap />
                      <div className="">
                        <p>Applied Scholarships</p>
                        <p className="text-3xl font-semibold">
                          {meow.scholarships.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link to="/admin-home/applications" className="w-full">
                      <Button className="w-full flex items-center bg-blue-800">
                        View <SquareArrowOutUpRight />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card> */}
              </div>
            </div>
          </div>
          <div className="w-1/4 space-y-3">
            <Card className="w-full z-10">
              <CardHeader>
                <CardTitle className="flex gap-1 items-center">
                  <Megaphone /> Add Announcements
                </CardTitle>
                <CardDescription>
                  Share important updates, deadlines, or news with all
                  applicants.
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-between">
                <Link className="w-full" to="/admin-home/announcements">
                  <Button
                    className="w-full flex gap-1 items-center"
                    variant="outline"
                  >
                    <Plus /> Add
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <div className="w-full relative">
              <Card className="w-full z-10">
                <CardHeader>
                  <CardTitle className="flex gap-1 items-center">
                    <Megaphone /> Add Announcements
                  </CardTitle>
                  <CardDescription>
                    Share important updates, deadlines, or news with all
                    applicants.
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex justify-between">
                  <Link className="w-full" to="/admin-home/announcements">
                    <Button
                      className="w-full flex gap-1 items-center"
                      variant="outline"
                    >
                      <Plus /> Add
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-1">
                    <Archive />
                    Archived
                  </CardTitle>
                  <CardDescription>
                    View scholarships and announcements you've archived.
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex justify-between">
                  <Link to="/admin-home/scholarships/archived">
                    <Button className="w-full">View</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

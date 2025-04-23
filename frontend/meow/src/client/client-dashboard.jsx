import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import Notification from "./notif";
import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../components/ui/sidebar";
import { useEffect, useState } from "react";
import {
  CheckCheck,
  GraduationCap,
  Layers,
  Timer,
  X,
  SquarePen,
  FileChartColumn,
  CalendarClock,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";

export default function ClientDashboard() {
  const [student, setStudent] = useState(null);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/info.json");
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error("Failed to load student data:", error);
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    if (student) {
      const applications = student.applications || [];

      const approved = applications.filter(
        (application) => application.status === "Approved"
      ).length;
      const pending = applications.filter(
        (application) => application.status === "Pending"
      ).length;
      const rejected = applications.filter(
        (application) => application.status === "Rejected"
      ).length;

      setApprovedCount(approved);
      setPendingCount(pending);
      setRejectedCount(rejected);
    }
  }, [student]);

  return (
    <>
      <header className="flex bg-green-800 h-16 shrink-0 items-center justify-between gap-2 border-b bg-light-green text-sidebar-foreground px-5 text-white">
        <div className="flex items-center gap-2 ">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Navigation</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <Notification />
        </div>
      </header>

      <div className="flex gap-2">
        <div className="w-[calc(100%-25%)]">
          <div className="p-3">
            <div className="text-4xl zxc tracking-[-5px]">WELCOME JEROME!</div>
            <span className="flex gap-3 mt-3">
              <p className="flex items-center gap-1.5 border py-2 px-3 rounded-xs bg-green-800 text-white">
                <SquarePen size={20} />
                Start New Application
              </p>
              <p className="flex items-center gap-1.5 border py-2 px-3  rounded-xs">
                <FileChartColumn size={20} />
                Track Application Status
              </p>
            </span>
          </div>
          <div className=" z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-2 text-left zxc gap-2  tracking-[-2px]">
            <span className="p-3 bg-blue-200  flex items-center gap-3 shadow-md rounded-md">
              <span className="bg-blue-400 text-white p-3 rounded-md">
                <Layers size={44} absoluteStrokeWidth />
              </span>
              <span>
                <p> TOTAL</p>
                <p className="text-5xl text-center">
                  {student?.applications?.length}
                </p>
              </span>
            </span>
            <span className="p-3 bg-green-200  flex items-center gap-3 shadow-md rounded-md">
              <span className="bg-green-400 text-white p-3 rounded-md">
                <CheckCheck size={44} absoluteStrokeWidth />
              </span>
              <span>
                <p>APPROVED</p>
                <p className="text-5xl text-center">{approvedCount}</p>
              </span>
            </span>

            <span className="p-3 bg-amber-200  flex items-center gap-3 shadow-md rounded-md">
              <span className="bg-amber-400 text-white p-3 rounded-md">
                <Timer size={44} absoluteStrokeWidth />
              </span>
              <span>
                <p>PENDING</p>
                <p className="text-5xl text-center">{pendingCount}</p>
              </span>
            </span>
            <span className="p-3 bg-red-200  flex items-center gap-3 shadow-md rounded-md">
              <span className="bg-red-400 p-3 text-white rounded-md">
                <X size={44} absoluteStrokeWidth />
              </span>
              <span>
                <p>REJECTED</p>
                <p className="text-5xl text-center"> {rejectedCount}</p>
              </span>
            </span>
          </div>
          <div className="p-2 mt-2">
            <Swiper
              slidesPerView={"auto"}
              loop={true}
              modules={[Navigation]}
              navigation={true}
              className="h-50 w-full bg-zinc-900 relative rounded-lg shadow-md"
            >
              <SwiperSlide>
                <div className="relative h-full flex justify-center items-center  ">
                  <img
                    className="h-full w-full object-cover object-[center_30%]"
                    src="https://wingatchalian.com/wp-content/uploads/2023/12/win_sa_exams_banner.jpeg"
                    alt=""
                  />
                  <Button className="absolute right-20 bg-green-700">
                    Apply Now!
                  </Button>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-full flex justify-center items-center">
                  <img
                    className="h-full w-full object-cover object-[center_30%]"
                    src="https://senatorbonggo.ph/uploads/88fc076129aac147217ed3b1a01433a3.jpg"
                    alt=""
                  />
                  <Button className="absolute right-20">Apply Now!</Button>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="p-2 mt-6">
            <h2 className="text-xl font-semibold mb-4 flex gap-1.5 bg-green-900 p-2 text-white rounded-xs">
              <CalendarClock /> Recent Applications
            </h2>
            <div className="space-y-2">
              {/* One application card */}
              <div className="p-4 bg-green-100 shadow rounded-xs flex justify-between items-center border-l-4 border-green-500">
                <div>
                  <p className="text-md font-medium">
                    Academic Excellence Scholarship
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted: April 15, 2025
                  </p>
                  <p className="text-sm text-blue-600">Status: Pending</p>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ">
                  View Details
                </button>
              </div>

              <div className="p-4 bg-green-100 shadow rounded-xs flex justify-between items-center border-l-4 border-blue-500">
                <div>
                  <p className="text-md font-medium">
                    Academic Excellence Scholarship
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted: April 15, 2025
                  </p>
                  <p className="text-sm text-blue-600">Status: Pending</p>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  View Details
                </button>
              </div>

              {/* Repeat above div for other applications */}
            </div>
          </div>
        </div>

        <div className="w-[25%] h-screen sticky top-0 p-2">
          <h1 className="text-center p-2 zxc tracking-[-0.5px] bg-green-800 text-white font-bold rounded-xs">
            Announcements
          </h1>
          <div className="space-y-3 mt-2">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded shadow">
              <h3 className="font-medium text-blue-800">Deadline Extended!</h3>
              <p className="text-sm text-gray-700">
                The submission deadline has been extended to April 30, 2025.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Posted: April 22, 2025
              </p>
            </div>

            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded shadow">
              <h3 className="font-medium text-green-800">
                New Scholarship Added
              </h3>
              <p className="text-sm text-gray-700">
                The “Future Leaders Grant” is now open for applications!
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Posted: April 20, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

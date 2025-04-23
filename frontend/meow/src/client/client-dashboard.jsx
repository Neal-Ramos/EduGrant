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
import { CheckCheck, GraduationCap, Layers, Timer, X } from "lucide-react";

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
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">General</BreadcrumbLink>
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
        <div>
          <Notification />
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* <h1 className="zxc tracking-[-4px] text-3xl">
          WELCOME {student?.personal_info?.first_name}{" "}
          {student?.personal_info?.last_name}!
        </h1> */}
        <div className="grid grid-cols-4 p-2 text-left zxc gap-5 tracking-[-2px]">
          <span className="p-3 bg-blue-200 rounded-md flex items-center gap-3 shadow-md">
            <span className="bg-blue-400 text-white p-3 rounded-md">
              <Layers size={44} absoluteStrokeWidth />
            </span>
            <span>
              <p> TOTAL</p>
              <p className="text-5xl">{student?.applications?.length}</p>
            </span>
          </span>
          <span className="p-3 bg-green-200 rounded-md flex items-center gap-3 shadow-md">
            <span className="bg-green-400 text-white p-3 rounded-md">
              <CheckCheck size={44} absoluteStrokeWidth />
            </span>
            <span>
              <p>APPROVED</p>
              <p className="text-5xl">{approvedCount}</p>
            </span>
          </span>

          <span className="p-3 bg-amber-200 rounded-md flex items-center gap-3 shadow-md">
            <span className="bg-amber-400 text-white p-3 rounded-md">
              <Timer size={44} absoluteStrokeWidth />
            </span>
            <span>
              <p>PENDING</p>
              <p className="text-5xl">{pendingCount}</p>
            </span>
          </span>
          <span className="p-3 bg-red-200 rounded-md flex items-center gap-3 shadow-md">
            <span className="bg-red-400 p-3 text-white rounded-md">
              <X size={44} absoluteStrokeWidth />
            </span>
            <span>
              <p>REJECTED</p>
              <p className="text-5xl"> {rejectedCount}</p>
            </span>
          </span>
        </div>

        <div className="h-full w-full flex justify-center items-center gap-3">
          <div className="w-[calc(100%-305px)] h-full flex flex-col gap-3">
            <div className="w-full h-full overflow-hidden shadow-md rounded-md flex justify-center items-center ">
              <Swiper
                slidesPerView={"auto"}
                loop={true}
                modules={[Navigation]}
                navigation={true}
                className="w-full h-64 bg-zinc-900"
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
                {/* Add more slides as needed */}
              </Swiper>
            </div>
            <div className="w-full h-full"></div>
          </div>
          <div className="w-[305px] h-full bg-white border-2 border-zinc-300 rounded-md shadow-md p-3">
            <h1 className="text-center text-xl mb-4 border-b border-zinc-200 pb-2 text-zinc-800 tracking-tight">
              Announcements
            </h1>
            <ul className="list-none text-sm space-y-4 text-zinc-700">
              <li className="flex items-start gap-2 p-2 rounded-md hover:bg-zinc-100 hover:text-zinc-900 transition">
                <span className="text-lg">📢</span>
                <span>
                  Scholarship applications open from <strong>May 1–31</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2 p-2 rounded-md hover:bg-zinc-100 hover:text-zinc-900 transition">
                <span className="text-lg">🗓️</span>
                <span>
                  Interview schedule for shortlisted scholars:{" "}
                  <strong>June 5–7</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2 p-2 rounded-md hover:bg-zinc-100 hover:text-zinc-900 transition">
                <span className="text-lg">📄</span>
                <span>
                  Submit required documents by <strong>June 10</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2 p-2 rounded-md hover:bg-zinc-100 hover:text-zinc-900 transition">
                <span className="text-lg">🎓</span>
                <span>
                  Orientation for new scholars: <strong>June 15, 9AM</strong>.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

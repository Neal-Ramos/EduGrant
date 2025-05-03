import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import Notification from "./breadcrumbs-widget";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../components/ui/sidebar";
import { useEffect, useState } from "react";

import {
  CheckCheck,
  GraduationCap,
  Layers,
  Timer,
  X,
  ArrowRight,
  Megaphone,
  Calendar,
  Clock,
  UserRoundCog,
  FolderSearch,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Button } from "@/components/ui/button";

export default function ClientDashboard() {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const hasComplete = localStorage.getItem("tourCompleted") === "true";
  const [startTour, setStartTour] = useState(!hasComplete);
  const steps = [
    {
      id: "total",
      title: "Total Applicants",
      content: "Displays the total number of students.",
    },
    {
      id: "approved",
      title: "Approved Applicants",
      content: "Lists all approved students.",
    },
    {
      id: "review",
      title: "For Review",
      content: "Displays applications currently under review.",
    },
    {
      id: "active",
      title: "Active Scholarships",
      content: "Displays all active scholars.",
    },
    {
      id: "addScholar",
      title: "Add Scholarship",
      content: "Add a new scholarship entry.",
    },
    {
      id: "scholarReports",
      title: "Scholarship Reports",
      content: "Generate and view scholarship reports.",
    },
    {
      id: "recentApplicant",
      title: "Recent Applicants",
      content: "View the most recent scholarship applicants.",
    },
    {
      id: "announcements",
      title: "Announcements",
      content: "Create and manage announcements.",
    },
    {
      id: "archive",
      title: "Archive",
      content: "View and manage archived scholarships.",
    },
  ];

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await fetch("/appli.json");
        const data = await response.json();
        setStudent(data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load student data:", error);
      }
    };
    fetchStudentData();
  }, []);

  function Loader() {
    return (
      <div className="flex justify-center items-center col-span-4">
        <div className="w-8 h-8 border-4 border-t-transparent border-black border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setStartTour(false); // End tour
      setCurrentStep(0);
      localStorage.setItem("tourClientCompleted", "true");
    }
  };

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
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Notification />
      </header>
      <div className="px-4 mt-2">
        <Swiper
          slidesPerView={"auto"}
          loop={true}
          modules={[Navigation]}
          navigation={true}
          className="h-50 w-full rounded-md  shadow-sm "
        >
          <SwiperSlide>
            <div className="relative h-full flex justify-center items-center">
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

      <div className="p-4 flex gap-5 flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 flex flex-col gap-5">
          <div className="flex items-center gap-2 zxc tracking-tighter bg-card py-3 rounded-lg shadow">
            <span className="w-full flex items-end justify-around">
              <div className="flex flex-col gap-1">
                <Layers className="text-blue-800 bg-blue-200 h-9 w-9 p-1.5 rounded-md shadow-sm" />
                TOTAL
              </div>
              <p className="text-3xl">3</p>
            </span>
            <Separator orientation="vertical" />
            <span className="w-full flex items-end justify-around">
              <div className="flex flex-col gap-1">
                <CheckCheck className="text-green-800 bg-green-200 h-9 w-9 p-1.5 rounded-md shadow-sm" />
                APPROVED
              </div>
              <p className="text-3xl">1</p>
            </span>
            <Separator orientation="vertical" />
            <span className="w-full flex items-end justify-around">
              <div className="flex flex-col gap-1">
                <Timer className="text-yellow-800 bg-yellow-200 h-9 w-9 p-1.5 rounded-md shadow-sm" />
                UNDER REVIEW
              </div>
              <p className="text-3xl">0</p>
            </span>
            <Separator orientation="vertical" />
            <span className="w-full flex items-end justify-around">
              <div className="flex flex-col gap-1">
                <X className="text-red-800 bg-red-200 h-9 w-9 p-1.5 rounded-md shadow-sm" />
                REJECT
              </div>
              <p className="text-3xl">0</p>
            </span>
          </div>
          <div className="flex justify-between items-start ">
            <div className="p-2 space-y-1">
              <CardTitle className="zxc text-3xl tracking-[-2px] flex items-center gap-2">
                Hello,
                <span className="text-green-800">Qatrina</span>!
              </CardTitle>
              <CardDescription>
                Ready to take the next step? Start your scholarship application
                in just a few clicks.
              </CardDescription>
            </div>

            <Button variant="outline">
              <UserRoundCog /> Edit profile
            </Button>
          </div>

          <div className="flex gap-3 mt-5 flex-col lg:flex-row">
            <div className="w-full bg-card flex items-center py-5 rounded-xl shadow-sm">
              <div className="w-full px-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap />
                    <h1 className="font-semibold">Apply Scholarship</h1>
                  </div>
                  <ArrowRight size={15} />
                </div>
                <p className="text-sm mt-2">
                  Submit a new application for available scholarship
                  opportunities with ease.
                </p>
              </div>
              <Separator orientation="vertical" />
              <div className="w-full px-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderSearch />
                    <h1 className="font-semibold"> Review My Application</h1>
                  </div>
                  <ArrowRight size={15} />
                </div>
                <p className="text-sm mt-2">
                  Check the status, details, and progress of your submitted
                  applications.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-5">
            <div className="p-2 space-y-1">
              <CardTitle className="zxc text-xl tracking-[-2px] flex items-center gap-2">
                <GraduationCap /> Recent Application
              </CardTitle>
              <CardDescription>
                Review the details and status of your most recent scholarship
                application.
              </CardDescription>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className=" flex flex-col gap-4 pt-5 bg-card rounded-xl shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="bg-zinc-200 p-1 rounded-md">
                      <GraduationCap />
                    </div>
                    <p
                      className="flex items-center gap-1 text-xs bg-blue-200
                    py-1 px-2 rounded-full text-blue-800 font-semibold"
                    >
                      <Clock size={15} />
                      Under Review
                    </p>
                  </div>
                  <CardTitle className="flex items-center  gap-2 mt-1">
                    <p>Win Gatchalian</p>
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
              <div className=" flex flex-col gap-4 pt-5 bg-card rounded-xl shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="bg-zinc-200 p-1 rounded-md">
                      <GraduationCap />
                    </div>
                    <p
                      className="flex items-center gap-1 text-xs bg-blue-200
                    py-1 px-2 rounded-full text-blue-800 font-semibold"
                    >
                      <Clock size={15} />
                      Under Review
                    </p>
                  </div>
                  <CardTitle className="flex items-center  gap-2 mt-1">
                    <p>Win Gatchalian</p>
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
              </div>{" "}
              <div className=" flex flex-col gap-4 pt-5 bg-card rounded-xl shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="bg-zinc-200 p-1 rounded-md">
                      <GraduationCap />
                    </div>
                    <p
                      className="flex items-center gap-1 text-xs bg-blue-200
                    py-1 px-2 rounded-full text-blue-800 font-semibold"
                    >
                      <Clock size={15} />
                      Under Review
                    </p>
                  </div>
                  <CardTitle className="flex items-center  gap-2 mt-1">
                    <p>Win Gatchalian</p>
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
          </div>
        </div>
        <div className="w-full lg:w-1/3 space-y-3 ">
          <div className="sticky top-[80px] px-2">
            <div className="p-2 space-y-1">
              <CardTitle className="zxc text-xl tracking-[-2px] flex items-center gap-2 justify-center">
                <Megaphone /> Announcements
              </CardTitle>
              <CardDescription className="text-center">
                Stay updated with the latest scholarship news, deadlines, and
                important notifications.
              </CardDescription>
            </div>
            <div className="mt-5 space-y-7">
              <Separator />
              <div className="space-y-2">
                <CardTitle>
                  Calling All BASC Alumni: Reconnect, Reflect, and Elect at Our
                  General Assembly!
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Calendar size={15} /> August 23, 2023
                </CardDescription>
              </div>
              <Separator />
              <div className="space-y-2">
                <CardTitle>
                  Calling All BASC Alumni: Reconnect, Reflect, and Elect at Our
                  General Assembly!
                </CardTitle>
                <CardDescription>August 23, 2023</CardDescription>
              </div>
              <Separator />
              <div className="space-y-2">
                <CardTitle>
                  Calling All BASC Alumni: Reconnect, Reflect, and Elect at Our
                  General Assembly!
                </CardTitle>
                <CardDescription>August 23, 2023</CardDescription>
              </div>
              <Separator />
              <div className="space-y-2">
                <CardTitle>
                  Calling All BASC Alumni: Reconnect, Reflect, and Elect at Our
                  General Assembly!
                </CardTitle>
                <CardDescription>August 23, 2023</CardDescription>
              </div>
              <div className="space-y-2">
                <CardTitle></CardTitle>
                <CardDescription className="text-center underline">
                  View all
                </CardDescription>
              </div>
            </div>
            {/* <p className="mt-5 space-y-7 text-center">
                No announcements atm.
              </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

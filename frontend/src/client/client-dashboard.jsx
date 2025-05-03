import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

import Notification from "./breadcrumbs-widget";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../components/ui/sidebar";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  CheckCheck,
  GraduationCap,
  Layers,
  Timer,
  X,

  ArrowRight,


  UserRound,
  Megaphone,
  Calendar,

  FolderOpen,

  ArrowUpRight,
  UserRoundCog,
 
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
      {/* <div className="px-4 mt-2">
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
      </div> */}

      <div className="p-4 flex gap-5 flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 flex flex-col gap-5">
          <div className="flex justify-between items-start ">
            <div className="p-2 space-y-1">
              <CardTitle className="zxc text-2xl tracking-[-2px] flex items-center gap-2">
                <UserRound strokeWidth={3} /> Hello,
                <span className="text-green-800">Jerome</span>!
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
          <Separator />
          <div className="grid grid-cols-2 lg:grid-cols-4 text-left zxc gap-3 tracking-[-2.5px]">
            <Popover open={startTour && currentStep === 0}>
              <PopoverTrigger asChild>
                <span
                  id={startTour && currentStep === 0 ? "zzz" : ""}
                  className="p-2.5 bg-blue-100 rounded-md flex items-center gap-3 shadow-md border-blue-300 border-1"
                >
                  <span className="bg-blue-400 p-2 rounded-sm shadow-sm  border-blue-500 border-1">
                    <Layers size={35} strokeWidth={2.1} />
                  </span>
                  <span>
                    <p> TOTAL</p>
                    <div className="text-3xl leading-7">
                      {loading ? <Loader /> : "0"}
                    </div>
                  </span>
                </span>
              </PopoverTrigger>
              <PopoverContent className="z-20">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{steps[0].title}</h3>
                  <p>1/{steps.length}</p>
                </div>
                <p>{steps[0].content}</p>
                <div className="flex justify-end">
                  <Button className="mt-3 " onClick={handleNextStep}>
                    Next <ArrowRight />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Popover open={startTour && currentStep === 1}>
              <PopoverTrigger asChild>
                <span
                  id={startTour && currentStep === 1 ? "zzz" : ""}
                  className="p-2.5 bg-green-100 rounded-md flex items-center gap-3 shadow-md  border-green-300 border-1"
                >
                  <span className="bg-green-400 p-2 rounded-sm shadow-sm  border-green-500 border-1">
                    <CheckCheck size={35} strokeWidth={2.1} />
                  </span>
                  <span>
                    <p>APPROVED</p>
                    <div className="text-3xl  leading-7">
                      {loading ? <Loader /> : student.scholarships.length}
                    </div>
                  </span>
                </span>
              </PopoverTrigger>
              <PopoverContent className="z-20">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{steps[1].title}</h3>
                  <p>2/{steps.length}</p>
                </div>
                <p>{steps[1].content}</p>
                <div className="flex justify-end">
                  <Button className="mt-3 " onClick={handleNextStep}>
                    Next <ArrowRight />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Popover open={startTour && currentStep === 2}>
              <PopoverTrigger asChild>
                <span
                  id={startTour && currentStep === 2 ? "zzz" : "0"}
                  className="p-2.5 bg-amber-100 rounded-md flex items-center gap-3 shadow-md border-amber-300 border-1"
                >
                  <span className="bg-amber-400 p-2 rounded-sm shadow-sm border-amber-500 border-1">
                    <Timer size={35} strokeWidth={2.1} />
                  </span>
                  <span>
                    <p>FOR REVIEW</p>
                    <div className="text-3xl  leading-7">
                      {loading ? <Loader /> : "0"}
                    </div>
                  </span>
                </span>
              </PopoverTrigger>
              <PopoverContent className="z-20">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{steps[2].title}</h3>
                  <p>3/{steps.length}</p>
                </div>
                <p>{steps[2].content}</p>
                <div className="flex justify-end">
                  <Button className="mt-3 " onClick={handleNextStep}>
                    Next <ArrowRight />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Popover open={startTour && currentStep === 3}>
              <PopoverTrigger asChild>
                <span
                  id={startTour && currentStep === 3 ? "zzz" : ""}
                  className="p-2.5 bg-red-100 rounded-md flex items-center gap-3 shadow-md border-red-300 border-1"
                >
                  <span className="bg-red-400 p-2 rounded-sm shadow-sm border-red-500 border-1">
                    <X size={35} strokeWidth={2.1} />
                  </span>
                  <span>
                    <p className="whitespace-nowrap">REJECT</p>
                    <div className="text-3xl  leading-7">
                      {loading ? <Loader /> : "0"}
                    </div>
                  </span>
                </span>
              </PopoverTrigger>
              <PopoverContent className="z-20">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{steps[3].title}</h3>
                  <p>4/{steps.length}</p>
                </div>
                <p>{steps[3].content}</p>
                <div className="flex justify-end">
                  <Button className="mt-3 " onClick={handleNextStep}>
                    Next <ArrowRight />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-3 mt-5 flex-col lg:flex-row">
            <Card className="w-full">
              <CardHeader className="z-10">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap /> Apply Scholarship
                </CardTitle>
                <CardDescription>
                  Submit a new application for available scholarship
                  opportunities with ease.
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-end z-10">
                <Button>
                  Apply <ArrowUpRight />
                </Button>
              </CardFooter>
            </Card>

            <Card className="w-full ">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen /> Review My Application
                </CardTitle>
                <CardDescription>
                  Check the status, details, and progress of your submitted
                  applications.
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-end">
                <Button variant="outline">
                  View <ArrowUpRight />
                </Button>
              </CardFooter>
            </Card>
          </div>
          <Separator />
          <div className="space-y-3">
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
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center  gap-2">
                    <GraduationCap className="min-w-6" />
                    <p>Win Gatchalian</p>
                  </CardTitle>
                  <CardDescription>
                    Application Date: 02-17-2005
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-around">
                  <span className="flex items-center gap-3 flex-col">
                    <p className="text-sm">Status</p>
                    <p className="font-semibold text-1xl">Under Review</p>
                  </span>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-700 hover:bg-green-800">
                    View
                  </Button>
                </CardFooter>
              </Card>
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
{
  /*  */
}

{
  /**/
}

{
  /**/
}

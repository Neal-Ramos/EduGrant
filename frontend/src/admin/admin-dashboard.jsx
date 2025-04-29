import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { useRef } from "react";

import {
  Activity,
  Archive,
  ArrowRight,
  Clock,
  Megaphone,
  SignpostBig,
  SquareArrowOutUpRight,
  TriangleAlert,
  UserRound,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setStartTour(false); // End tour
      setCurrentStep(0);
      localStorage.setItem("tourCompleted", "true");
    }
  };

  const sectionRef = useRef(null);

  const handleScroll = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <main>
      {startTour && (
        <div className="fixed inset-0 bg-black/50 z-20 backdrop-blur-[2px]"></div>
      )}
      <header className="flex bg-gradient-to-bl from-green-700 to-green-900 h-16 items-center justify-between px-5 text-white border-b shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink>Home</BreadcrumbLink>
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
        <Button onClick={() => setStartTour(true)}>
          Start Tour <SignpostBig />
        </Button>
      </header>
      <div className=" overflow-hidden px-4 space-y-5 mt-3">
        <div className=" grid grid-cols-4 py-4 text-left zxc gap-3 tracking-[-2px]">
          <Popover open={startTour && currentStep === 0}>
            <PopoverTrigger asChild>
              <span
                id={startTour && currentStep === 0 ? "zzz" : ""}
                className="p-3 bg-blue-200 rounded-md flex items-center gap-3"
              >
                <span className="bg-blue-400 p-3 rounded-md shadow-sm ">
                  <Layers size={40} absoluteStrokeWidth />
                </span>
                <span>
                  <p> TOTAL</p>
                  <div className="text-4xl">
                    {loading ? <Loader /> : student.length}
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
                className="p-3 bg-green-200 rounded-md flex items-center gap-3 shadow-md"
              >
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
                id={startTour && currentStep === 2 ? "zzz" : ""}
                className="p-3 bg-amber-200 rounded-md flex items-center gap-3 shadow-md"
              >
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
                className="p-3 bg-purple-200 rounded-md flex items-center gap-3 shadow-md"
              >
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

        <div className="flex gap-5">
          <div className="w-3/4 space-y-2">
            <div className="flex gap-3">
              <div className="w-1/2">
                <Popover open={startTour && currentStep === 4}>
                  <PopoverTrigger className="w-full" asChild>
                    <Card
                      id={startTour && currentStep === 4 ? "zzz" : ""}
                      className="w-full shadow-md"
                    >
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

                      <CardFooter className="flex justify-end">
                        <Button onClick={goToPasswordTab}>
                          Add <Plus />
                        </Button>
                      </CardFooter>
                    </Card>
                  </PopoverTrigger>
                  <PopoverContent className="z-20">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">
                        {steps[4].title}
                      </h3>
                      <p>5/{steps.length}</p>
                    </div>
                    <p>{steps[4].content}</p>
                    <div className="flex justify-end">
                      <Button className="mt-3 " onClick={handleNextStep}>
                        Next <ArrowRight />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-1/2">
                <Popover open={startTour && currentStep === 5}>
                  <PopoverTrigger className="w-full" asChild>
                    <Card
                      id={startTour && currentStep === 5 ? "zzz" : ""}
                      className="w-full shadow-md"
                    >
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
                      <CardFooter>
                        <Link
                          to="/admin-home/scholarships"
                          className="w-full flex justify-end"
                        >
                          <Button className="">
                            Generate <Zap />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </PopoverTrigger>
                  <PopoverContent className="z-20">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">
                        {steps[5].title}
                      </h3>
                      <p>6/{steps.length}</p>
                    </div>
                    <p>{steps[5].content}</p>
                    <div className="flex justify-end">
                      <Button
                        className="mt-3"
                        onClick={() => {
                          handleScroll();
                          handleNextStep();
                        }}
                      >
                        Next <ArrowRight />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <h1 className="font-semibold text-xl mt-8">Recent Application</h1>
            <p className="text-black/60">
              Course, year level, and section of the applicant.
            </p>

            <Popover open={startTour && currentStep === 6}>
              <PopoverTrigger className="w-full" asChild>
                <div
                  id={startTour && currentStep === 6 ? "zzz" : ""}
                  className="w-full bg-zinc-50 rounded-md"
                  ref={sectionRef}
                >
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
                            <Link
                              to="/admin-home/applications"
                              className="w-full"
                            >
                              <Button className="w-full flex items-center bg-blue-800">
                                View <SquareArrowOutUpRight />
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="z-20">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{steps[6].title}</h3>
                  <p>7/{steps.length}</p>
                </div>
                <p>{steps[6].content}</p>
                <div className="flex justify-end">
                  <Button className="mt-3 " onClick={handleNextStep}>
                    Next <ArrowRight />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-1/4 space-y-3">
            
            <div className="w-full relative">
              <Popover open={startTour && currentStep === 7}>
                <PopoverTrigger className="w-full" asChild>
                  <Card
                    className="w-full shadow-md z-10"
                    id={startTour && currentStep === 7 ? "zzz" : ""}
                  >
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
                </PopoverTrigger>
                <PopoverContent className="z-20">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg">{steps[8].title}</h3>
                    <p>8/{steps.length}</p>
                  </div>
                  <p>{steps[8].content}</p>
                  <div className="flex justify-end">
                    <Button className="mt-3 " onClick={handleNextStep}>
                      Next <ArrowRight />
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full">
              <Popover open={startTour && currentStep === 8}>
                <PopoverTrigger className="w-full" asChild>
                  <Card
                    className="w-full shadow-md"
                    id={startTour && currentStep === 8 ? "zzz" : ""}
                  >
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
                </PopoverTrigger>
                <PopoverContent className="z-20">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg">{steps[8].title}</h3>
                    <p>9/{steps.length}</p>
                  </div>
                  <p>{steps[8].content}</p>
                  <div className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          Next <ArrowRight />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Dashboard Tour Complete</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <p>
                          You’ve completed the dashboard tour. To continue, go
                          to the{" "}
                          <strong className="text-green-800">
                            Scholarship
                          </strong>{" "}
                          tab to begin the next tour.
                        </p>
                        <DialogFooter>
                          <Button className="mt-3" onClick={handleNextStep}>
                            End Tour <TriangleAlert />
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

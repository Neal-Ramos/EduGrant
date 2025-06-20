"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import "ldrs/react/Ring.css";
import morty from "@/assets/image.png";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  FileText,
  User,
  AlertCircle,
  PhilippinePeso,
} from "lucide-react";

export default function InterceptionClientScholarship() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        router.back();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [open, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="w-full lg:max-w-4xl  mx-auto bg-background px-0 max-h-[95vh] ">
        <div className="sr-only">
          <DrawerHeader>
            <DrawerTitle>Scholarship Application</DrawerTitle>
            <DrawerDescription>
              Merit Excellence Scholarship Details
            </DrawerDescription>
          </DrawerHeader>
        </div>
        <div className="overflow-auto">
          {" "}
          <div className="relative mb-6">
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img
                src={morty.src || "/placeholder.svg"}
                alt="Scholarship Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="mb-2 bg-green-600 hover:bg-green-700">
                  <Clock className="w-3 h-3 mr-1" />
                  Active
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  Merit Excellence Scholarship 2024
                </h1>
                <p className="text-white/90 flex items-center gap-1">
                  <User className="w-4 h-4" />
                  by Kuya wally
                </p>
              </div>
            </div>
          </div>
          <div className="px-6">
            {/* Key Information */}
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              <div className="flex items-center gap-3 border p-4 rounded-md">
                <PhilippinePeso className="w-8 h-8" />
                <div>
                  <p className="text-2xl">₱5,000</p>
                  <p className="text-sm text-muted-foreground">per semester</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border p-4 rounded-md">
                <Calendar className="w-8 h-8 " />
                <div>
                  <p className="text-lg font-semibold">March 15, 2025</p>
                  <p className="text-sm text-muted-foreground">
                    Application Deadline
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border p-4 rounded-md">
                <FileText className="w-8 h-8" />
                <div>
                  <p className="text-lg font-semibold">6 Documents</p>
                  <p className="text-sm text-muted-foreground">Required</p>
                </div>
              </div>
            </div>

            {/* Scholarship Details */}

            <div className=" mt-10 px-8 border-l-2 border-green-800">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                About This Scholarship
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Merit Excellence Scholarship is designed to recognize and
                support outstanding students who have demonstrated exceptional
                academic achievement and leadership potential. This scholarship
                aims to provide financial assistance to deserving students
                pursuing higher education.
              </p>
            </div>

            {/* Countdown Timer */}

            <div className="w-3/4 mx-auto mt-15">
              <div className="grid grid-cols-4 gap-2 md:gap-4 ">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div key={item.label} className="text-center">
                    <div className=" rounded-lg p-2 md:p-3 shadow-sm border">
                      <div className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm  mt-3">
                Don't miss out! Submit your application before the deadline.
              </p>
            </div>

            {/* Required Documents */}

            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Required Documents
              </h2>
              <div className="space-y-1">
                {[
                  { title: "Completed Application Form", status: "required" },
                  { title: "Official Transcripts", status: "required" },
                  {
                    title: "Personal Statement (500-750 words)",
                    status: "required",
                  },
                  {
                    title: "Two Letters of Recommendation",
                    status: "required",
                  },
                  { title: "Resume or CV", status: "required" },
                  { title: "FAFSA Documentation", status: "required" },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between py-3 px-1 border-b border-gray-100 dark:border-gray-800 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono text-muted-foreground w-6">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium group-hover:text-purple-600 transition-colors">
                        {doc.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-600 font-medium">
                        REQUIRED
                      </span>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> All documents must be submitted before
                  the application deadline.
                </p>
              </div>
            </div>

            {/* Application Process */}
            <div className="mx-auto w-3/4 mt-5 py-5">
              <h2 className="text-xl font-semibold mb-4">
                Application Process
              </h2>
              <Timeline defaultValue={3} orientation="horizontal">
                {[
                  "Complete the online application form",
                  "Upload all required documents",
                  "Submit application before deadline",
                  "Wait for review and notification",
                ].map((step, index) => (
                  <TimelineItem
                    key={index}
                    step={index}
                    className="group-data-[orientation=horizontal]/timeline:mt-0"
                  >
                    <TimelineHeader>
                      <TimelineSeparator className="group-data-[orientation=horizontal]/timeline:top-8" />
                      <TimelineDate className="mb-10">
                        step {index + 1}
                      </TimelineDate>
                      <TimelineTitle>{step}</TimelineTitle>
                      <TimelineIndicator className="group-data-[orientation=horizontal]/timeline:top-8" />
                    </TimelineHeader>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </div>
        </div>

        <DrawerFooter className="sticky bottom-0 bg-background border-t px-6 py-4">
          <div className="flex gap-3">
            <Button className="flex-1 text-base font-semibold">
              <FileText className="w-4 h-4 mr-2" />
              Apply Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-base"
              onClick={() => setOpen(false)}
            >
              Back
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

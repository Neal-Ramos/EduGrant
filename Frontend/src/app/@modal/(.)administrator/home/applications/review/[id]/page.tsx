"use client";
import { Button } from "@/components/ui/button";
import morty from "@/assets/image.png";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useStudentReview from "@/lib/reviewStudent";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Folder,
  GraduationCap,
  LucideThumbsDown,
  ThumbsDown,
  ThumbsUp,
  TriangleAlert,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function InterceptReview() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  if (!open) {
    setTimeout(() => {
      router.back();
    }, 200);
  }
  const { data, loading, error } = useStudentReview();
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="lg:w-3/4 w-[95%] mx-auto outline-0">
        <div className="sr-only">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold">
              Application Overview
            </DrawerTitle>
            <DrawerDescription>
              {" "}
              Update the form below to edit the scholarship details.
            </DrawerDescription>
          </DrawerHeader>
        </div>

        <div className="p-5 h-full w-full flex gap-10  overflow-y-auto">
          {loading ? (
            <>loading...</>
          ) : (
            <>
              {data && (
                <>
                  {" "}
                  <div className="w-[30%] ">
                    <div className="p-4  flex flex-col items-center rounded-md sticky top-0">
                      <div className="rounded-full overflow-hidden w-30 h-30">
                        <img
                          className="h-full w-full object-cover"
                          src={morty.src}
                          alt=""
                        />
                      </div>
                      <Badge>{data.studentId}</Badge>
                      <h1 className="text-lg font-semibold mt-5">
                        {data.fullName}
                      </h1>
                      <span className="flex items-center gap-3 text-muted-foreground">
                        <p> {data.course}</p> - <p> {data.yearLevel}</p>
                      </span>
                    </div>
                  </div>
                  <div className="w-[70%] h-full space-y-3">
                    {data.applications.map((meow) => (
                      <div
                        className="border-1 rounded-md overflow-hidden  p-2"
                        key={meow.scholarshipId}
                      >
                        <div className="flex justify-between px-4 py-2 rounded-md items-start bg-[var(--eclipse)]">
                          <span className="space-y-1">
                            <h1 className="text-lg flex items-center gap-2">
                              <GraduationCap /> {meow.scholarshipName}
                            </h1>

                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              Submitted date: {meow.submittedDate}
                            </p>
                          </span>
                          <Badge>Pending</Badge>
                        </div>
                        <div className="p-4 space-y-8">
                          <div className="space-y-2">
                            <h1 className="flex items-center gap-2 justify-between">
                              Submitted documents{" "}
                              <p className="text-sm">Documents 3/3</p>
                            </h1>
                            <div className="grid grid-cols-3 gap-2">
                              {meow.documents.map((document) => (
                                <Dialog key={document.documentId}>
                                  <DialogTrigger asChild>
                                    <div className=" bg-popover p-2 space-y-3 rounded-md ">
                                      <div className="relative">
                                        <img
                                          className="h-full w-full object-cover rounded-md"
                                          src={morty.src}
                                          alt=""
                                        />
                                      </div>
                                      <p className="flex items-center  justify-between underline">
                                        {document.name}
                                        <span>
                                          {" "}
                                          <Checkbox />
                                        </span>
                                      </p>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <div className="sr-only">
                                      <DialogHeader>
                                        <DialogTitle></DialogTitle>
                                        <DialogDescription></DialogDescription>
                                      </DialogHeader>
                                    </div>
                                    <img
                                      className="h-full w-full object-cover rounded-md"
                                      src={morty.src}
                                      alt=""
                                    />
                                    <div>
                                      <Button>Approve Document</Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h1>Remarks</h1>
                            <Textarea placeholder="Enter your remarks or feedback about the application..." />
                          </div>
                          <div className="flex gap-2 items-center mt-5">
                            <Button className="flex-1 bg-green-900 hover:bg-green-700 text-gray-300 hover:text-white">
                              <ThumbsUp /> Approve
                            </Button>
                            <Button className="flex-1 bg-red-900 hover:bg-red-700 text-gray-300 hover:text-white">
                              <ThumbsDown /> Reject
                            </Button>
                            <Button className="flex-1 bg-amber-800 hover:bg-amber-700 text-gray-300 hover:text-white">
                              <TriangleAlert /> Missing Requirements
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

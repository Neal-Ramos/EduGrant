import { useState, useEffect } from "react";
import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../components/ui/sidebar";
import { CheckCircle, XCircle } from "lucide-react";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Scholarships() {
  const scholarships = [
    {
      name: "STEM Scholars Grant",
      totalApplicants: 120,
      totalApproved: 45,
      endDate: "2025-05-30",
    },
    {
      name: "Future Leaders Scholarship",
      totalApplicants: 200,
      totalApproved: 80,
      endDate: "2025-06-15",
    },
    {
      name: "Community Impact Award",
      totalApplicants: 150,
      totalApproved: 60,
      endDate: "2025-05-20",
    },
    {
      name: "Merit-Based Excellence Fund",
      totalApplicants: 180,
      totalApproved: 70,
      endDate: "2025-06-01",
    },
    {
      name: "Diversity & Inclusion Scholarship",
      totalApplicants: 90,
      totalApproved: 30,
      endDate: "2025-05-28",
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
                <BreadcrumbLink href="#">Scholarship Management</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Scholarships
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-5">
        <Tabs defaultValue="list">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Active Scholarships</TabsTrigger>
            <TabsTrigger value="add">Add Scholarship</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle >Scholarships</CardTitle>
                <CardDescription>
                  This are the list of available scholarships
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scholarship Name</TableHead>
                    <TableHead>Total Applicants</TableHead>
                    <TableHead>Total Approved</TableHead>

                    <TableHead className="text-right">End Date</TableHead>
                    <TableHead className="w-[300px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scholarships.map((scholarship) => (
                    <TableRow key={scholarship.name}>
                      <TableCell className="font-medium">
                        {scholarship.name}
                      </TableCell>
                      <TableCell>{scholarship.totalApplicants}</TableCell>
                      <TableCell>{scholarship.totalApproved}</TableCell>
                      <TableCell className="text-right">
                        {scholarship.endDate}
                      </TableCell>
                      <TableCell className="text-center">
                        <Drawer direction="right">
                          <DrawerTrigger asChild>
                            <Button variant="outline">View</Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                              <Tabs defaultValue="details" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="details">
                                    Scholarship Details
                                  </TabsTrigger>
                                  <TabsTrigger value="report">
                                    Scholarship Report
                                  </TabsTrigger>
                                </TabsList>

                                <TabsContent value="details">
                                  <DrawerHeader>
                                    <DrawerTitle>
                                      Scholarship details
                                    </DrawerTitle>
                                    <DrawerDescription>
                                      Can edit and delete
                                    </DrawerDescription>
                                  </DrawerHeader>

                                  <div className="p-4 pb-0 space-y-6">
                                    <Input placeholder="Scholarship name" />
                                    <Textarea placeholder="Scholarship details" />
                                    <Input placeholder="Scholarship expiry" />
                                    <Input placeholder="Scholarship requirements" />
                                  </div>

                                  <DrawerFooter className="mt-5">
                                    <Button>Edit</Button>
                                    <DrawerClose asChild>
                                      <Button variant="destructive">
                                        Delete
                                      </Button>
                                    </DrawerClose>
                                  </DrawerFooter>
                                </TabsContent>

                                <TabsContent value="report">
                                  <DrawerHeader>
                                    <DrawerTitle>
                                      Scholarship REPORT
                                    </DrawerTitle>
                                    <DrawerDescription>
                                      This are the generated report of selected
                                      scholarship
                                    </DrawerDescription>
                                  </DrawerHeader>

                                  <div className="p-4 pb-0 space-y-6">
                                    <div>
                                      Scholarship name:{" "}
                                      <span className="text-xl font-semibold">
                                        Diwata
                                      </span>
                                    </div>
                                    <div>
                                      Total Applicants:{" "}
                                      <span className="text-xl font-semibold">
                                        354
                                      </span>
                                    </div>
                                    <div>
                                      Total Approved:{" "}
                                      <span className="text-xl font-semibold">
                                        311
                                      </span>
                                    </div>
                                    <div>
                                      Total Rejected:{" "}
                                      <span className="text-xl font-semibold">
                                        43
                                      </span>
                                    </div>
                                    <div>
                                      Start Date:{" "}
                                      <span className="text-xl font-semibold">
                                        02-13-2030
                                      </span>
                                    </div>
                                    <div>
                                      End Date:{" "}
                                      <span className="text-xl font-semibold">
                                        02-30-2050
                                      </span>
                                    </div>
                                  </div>

                                  <DrawerFooter className="mt-5">
                                    <Button>Download</Button>
                                    <DrawerClose asChild>
                                      <Button variant="outline">Close</Button>
                                    </DrawerClose>
                                  </DrawerFooter>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4} className="font-medium">
                      Total Scholarships
                    </TableCell>
                    <TableCell className="text-center">
                      {scholarships.length}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Card>
          </TabsContent>
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add Scholarships</CardTitle>
                <CardDescription>
                  Add scholarships on active list
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="curnamerent">Scholarship name</Label>
                  <Input id="name" type="text" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="curnamerent">Scholarship details</Label>
                  <Textarea placeholder="Type your message here" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="curnamerent">Scholarship expiry</Label>
                  <Input id="name" type="text" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="curnamerent">Scholarship Requirements</Label>
                  <Input id="name" type="text" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Add Scholarship</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

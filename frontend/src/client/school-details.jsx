import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Notification from "./breadcrumbs-widget";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

export default function ScholarshipDetail() {
  const { id } = useParams();
  const [scholarDetails, setScholarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchScholarDetails() {
      setLoading(true);
      setError(null);
      try {
        const data = { scholarshipId: id };
        const res = await axios.post(
          `${
            import.meta.env.VITE_EXPRESS_API_EDUGRANT
          }/getScholarshipsByIdClient`,
          data,
          { withCredentials: true }
        );
        setScholarDetails(res.data.getScholarshipsById[0]);
      } catch (err) {
        setError(err.message);
        setScholarDetails(null);
      } finally {
        setLoading(false);
      }
    }

    fetchScholarDetails();
  }, []);

  return (
    <>
      <header className="flex bg-green-800 h-16 items-center justify-between px-5 text-white border-b shadow-sm">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Navigation</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Scholarships
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {scholarDetails?.name || "Loading..."}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Notification />
      </header>

      <div className="flex items-center justify-center p-5">
        <Tabs defaultValue="details" className="w-3/4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Scholarship Details</TabsTrigger>
            <TabsTrigger value="form">Scholarship Form</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            {loading ? (
              <p className="text-center mt-10">Loading details...</p>
            ) : error ? (
              <p className="text-center mt-10 text-red-500">Error: {error}</p>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle> {scholarDetails.name}</CardTitle>
                  <CardDescription>{scholarDetails.details}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex items-center justify-center">
                  <img
                    src={scholarDetails.requireImage}
                    alt={scholarDetails.name}
                    className="h-1/2 w-w-1/2 object-contain rounded-md shadow-lg"
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Download Form</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle>Scholarship Form</CardTitle>
                <CardDescription>
                  Enter your information to apply scholarship
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="w-full space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input id="studentId" type="number" required />
                </div>
                <div className="flex w-full gap-2">
                  <div className="w-full space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" type="text" required />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="middleName">Middle name</Label>
                    <Input id="middleName" type="text" required />
                  </div>
                </div>
                <div className="flex w-full gap-2">
                  <div className="w-full space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" type="text" required />
                  </div>
                  <div className="w-full flex items-center mt-5">
                    <div className="w-full flex items-center gap-2 justify-center">
                      <Checkbox value="ind" id="ind" />
                      <Label htmlFor="ind">Indigenous People</Label>
                    </div>
                    <div className="w-full flex items-center gap-2 justify-center">
                      <Checkbox value="pwd" id="pwd" />
                      <Label htmlFor="pwd">PWD</Label>
                    </div>
                  </div>
                </div>
                <div className="flex w-full gap-2 mt-3">
                  <div className="w-full space-y-2">
                    <Label htmlFor="sex">Sex</Label>
                    <Select required>
                      <SelectTrigger id="sex" className="w-full">
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="birthday">Birthday</Label>
                    <Input id="birthday" type="date" required />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Input id="contact" type="tel" required />
                  </div>
                </div>
                <div className="flex w-full gap-2 mt-3">
                  <div className="w-full space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <Input id="province" type="text" required />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="municipality">City/Municipality</Label>
                    <Input id="municipality" type="text" required />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="barangay">Barangay</Label>
                    <Input id="barangay" type="text" required />
                  </div>
                </div>
                <div className="flex w-full gap-2 mt-3">
                  <div className="w-full space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input id="course" type="text" required />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="year">Year Level</Label>
                    <Input id="year" type="text" required />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Input id="section" type="text" required />
                  </div>
                </div>
              </CardContent>

              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Upload the required documents</CardDescription>

                <div className="mt-3 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Document Name"
                        onChange={(e) =>
                          handleChange(index, "name", e.target.value)
                        }
                      />
                      <Input type="file" accept=".pdf, .doc, .docx, image/*" />
                      <Button type="button">Submit</Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="mt-5">
                <Button className="w-full">Apply Now</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

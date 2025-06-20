"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserRoundCog, UserRoundIcon as UserRoundPen, X } from "lucide-react";
import SpotlightBorderWrapper from "@/components/ui/border";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/dark-mode";
import { useState } from "react";

interface StudentData {
  studentId: string;
  studentEmail: string;
  studentContact: string;
  studentFirstName: string;
  studentMiddleName: string;
  studentLastName: string;
  studentGender: string;
  studentAddress: {
    province: string;
    city: string;
    barangay: string;
    street: string;
  };
  studentDateofBirth: string;
  studentCourseYearSection: {
    course: string;
    year: string;
    section: string;
  };
  requirementsAttachment: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    status: "uploaded" | "pending" | "verified";
  }>;
}

const temporaryStudentData: StudentData = {
  studentId: "2024-00123",
  studentEmail: "juan.delacruz@university.edu.ph",
  studentContact: "09123456789",
  studentFirstName: "Juan",
  studentMiddleName: "Santos",
  studentLastName: "Dela Cruz",
  studentGender: "Male",
  studentAddress: {
    province: "Metro Manila",
    city: "Quezon City",
    barangay: "Barangay Commonwealth",
    street: "123 Sampaguita Street",
  },
  studentDateofBirth: "2002-05-15",
  studentCourseYearSection: {
    course: "Bachelor of Science in Computer Science",
    year: "3rd Year",
    section: "A",
  },
  requirementsAttachment: [],
};

export default function RegisterClient() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<StudentData>({
    defaultValues: temporaryStudentData,
  });

  const router = useRouter();
  const studentData = watch();

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, uploadType: "cor" | "grades") => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      console.log(`${uploadType} file dropped:`, file.name);
    }
  };

  return (
    <div>
      <header className="flex w-full items-center justify-between border-b rounded-md top-2 relative bg-[var(--eclipse)]">
        <div className="flex h-16 shrink-0 items-center gap-5 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Scholarship Application</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mr-3">
          <ModeToggle />
        </div>
      </header>

      <div className="w-3/4 mx-auto">
        <div className="overflow-y-auto overflow-x-hidden no-scrollbar p-8">
          <div className="space-y-12">
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 gap-y-7 px-4">
              <div>
                <h1 className="text-2xl font-semibold flex items-center gap-3">
                  <UserRoundPen />
                  Personal Information
                </h1>
                <p className="text-muted-foreground mt-1">
                  Review your personal details and account information.
                </p>
              </div>

              {/* Student ID */}
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <SpotlightBorderWrapper>
                  <Input
                    {...register("studentId")}
                    id="studentId"
                    placeholder="Student ID"
                    type="text"
                    disabled
                  />
                </SpotlightBorderWrapper>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentFirstName">First Name</Label>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentFirstName")}
                      id="studentFirstName"
                      placeholder="First Name"
                      type="text"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentMiddleName">Middle Name</Label>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentMiddleName")}
                      id="studentMiddleName"
                      placeholder="Middle Name"
                      type="text"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentLastName">Last Name</Label>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentLastName")}
                      id="studentLastName"
                      placeholder="Last Name"
                      type="text"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                </div>
              </div>

              {/* Email and Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentEmail">Email Address</Label>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentEmail")}
                      id="studentEmail"
                      placeholder="Enter your email"
                      type="email"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentContact">Contact Number</Label>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentContact")}
                      id="studentContact"
                      placeholder="Enter your contact number"
                      type="tel"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                </div>
              </div>

              {/* Date of Birth and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentDateofBirth">Date of Birth</Label>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentDateofBirth")}
                      id="studentDateofBirth"
                      type="date"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentGender">Gender</Label>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentGender")}
                      id="studentGender"
                      placeholder="Gender"
                      type="text"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                </div>
              </div>

              {/* Course, Year, Section */}
              <div className="space-y-2 ">
                <Label htmlFor="course">Course</Label>
                <div className="flex gap-3">
                  <SpotlightBorderWrapper className="flex-1">
                    <Input
                      {...register("studentCourseYearSection.course")}
                      id="course"
                      placeholder="Course"
                      type="text"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentCourseYearSection.year")}
                      id="year"
                      placeholder="Year Level"
                      type="text"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentCourseYearSection.section")}
                      id="section"
                      placeholder="Section"
                      type="text"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                </div>
              </div>

              {/* Address */}

              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <SpotlightBorderWrapper>
                  <Input
                    {...register("studentAddress.street")}
                    id="street"
                    placeholder="Street Address"
                    type="text"
                    disabled
                  />
                </SpotlightBorderWrapper>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="barangay">Barangay</Label>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentAddress.barangay")}
                      id="barangay"
                      placeholder="Barangay"
                      type="text"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentAddress.city")}
                      id="city"
                      placeholder="City"
                      type="text"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <SpotlightBorderWrapper>
                    <Input
                      {...register("studentAddress.province")}
                      id="province"
                      placeholder="Province"
                      type="text"
                      disabled
                    />
                  </SpotlightBorderWrapper>
                </div>
              </div>
            </div>

            {/* Divider */}
            <Separator className="my-8" />

            {/* Upload Documents Section */}
            <div className="space-y-6 px-4">
              <div>
                <h1 className="text-2xl font-semibold flex items-center gap-3">
                  <UserRoundCog />
                  Upload Required Documents
                </h1>
                <p className="text-muted-foreground mt-1">
                  Please upload the following required documents for your
                  scholarship application.
                </p>
              </div>

              <div className="space-y-8">
                {/* Certificate of Registration (COR) */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-base font-medium">
                      Certificate of Registration (COR){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload your current Certificate of Registration showing
                      your enrolled subjects.
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      Accepts: PDF, JPG, JPEG, PNG (Max: 5MB)
                    </p>
                  </div>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={(e) => handleDrop(e, "cor")}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer group ${
                      dragActive
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="corUpload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log("COR file selected:", file.name);
                        }
                      }}
                    />
                    <label htmlFor="corUpload" className="cursor-pointer">
                      <div className="space-y-3">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-base font-medium text-gray-700">
                            Drop your COR file here
                          </p>
                          <p className="text-sm text-gray-500">
                            or click to browse
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Grades/Transcript */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-base font-medium">
                      Grades/Transcript of Records{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload your latest grades or transcript of records from
                      the previous semester.
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      Accepts: PDF, JPG, JPEG, PNG (Max: 5MB)
                    </p>
                  </div>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={(e) => handleDrop(e, "grades")}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer group ${
                      dragActive
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="gradesUpload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log("Grades file selected:", file.name);
                        }
                      }}
                    />
                    <label htmlFor="gradesUpload" className="cursor-pointer">
                      <div className="space-y-3">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-base font-medium text-gray-700">
                            Drop your grades file here
                          </p>
                          <p className="text-sm text-gray-500">
                            or click to browse
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}

        <div className="flex flex-col justify-center items-end pb-4 px-8 gap-3">
          <Button className="bg-green-600 hover:bg-green-700 w-full">
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
}

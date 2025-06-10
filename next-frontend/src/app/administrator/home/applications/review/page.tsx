"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

import useStudent from "@/lib/useStudent";

import { ModeToggle } from "@/components/ui/dark-mode";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  ChevronsUpDown,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Manage() {
  const { data, loading } = useStudent();
  const headers = [
    { label: "Student ID", className: "" },
    { label: "Student Name" },
    { label: "Course" },
    { label: "Scholarship(s)" },
    { label: "Entries", className: "text-right" },
  ];
  const scholarshipOptions = [
    { id: "all", name: "Scholarship(s)" },
    { id: "scholarship1", name: "Scholarship 1" },
    { id: "scholarship2", name: "Scholarship 2" },
    { id: "scholarship3", name: "Scholarship 3" },
  ];

  const courseOptions = [
    { id: "all", name: "Course" },
    { id: "bsit", name: "BSIT" },
    { id: "bsge", name: "BSGE" },
    { id: "bsft", name: "BSFT" },
  ];

  const [open, setOpen] = useState({
    scholarshipHeader: false,
    courseHeader: false,
  });
  const [select, setSelected] = useState({
    selectedScholarship: "Scholarship(s)",
    selectedCourse: "Course",
    sortOrder: "default",
  });
  console.log(data);
  console.log(select.selectedScholarship);
  console.log(select.selectedCourse);
  console.log(select.sortOrder);
  return (
    <div className="pl-1 pr-2 your-class  h-screen">
      <header className="flex w-full items-center justify-between your-class2 border-b rounded-md top-2 relative">
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
                <BreadcrumbLink href="/components">
                  Application Management
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Review Application</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mr-3">
          <ModeToggle />
        </div>
      </header>
      <div className="mx-auto lg:w-3/4 w-[95%] py-10">
        <h1 className="text-3xl font-semibold">Review Applications</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and manage submitted scholarship applications. You can sort,
          filter, and take action on each application.
        </p>

        <div className="container mx-auto py-10 space-y-5">
          <div className="flex gap-2 w-1/2">
            <Button disabled>
              <Search />
            </Button>
            <Input placeholder="Search by student id or name..." />
          </div>
          <Table>
            <TableCaption>
              A list of submitted scholarship applications.
            </TableCaption>
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header.label} className={header.className}>
                    {header.label === "Scholarship(s)" ? (
                      <Popover
                        open={open.scholarshipHeader}
                        onOpenChange={(isOpen) =>
                          setOpen((prev) => ({
                            ...prev,
                            scholarshipHeader: isOpen,
                          }))
                        }
                      >
                        <PopoverTrigger asChild>
                          <div
                            role="combobox"
                            aria-expanded={open.scholarshipHeader}
                            className="flex items-center gap-5 cursor-pointer"
                          >
                            {select.selectedScholarship}

                            <ChevronsUpDown className="opacity-80 h-4 w-4" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search Scholarship..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No Scholarship found.</CommandEmpty>
                              <CommandGroup>
                                {scholarshipOptions.map((option) => (
                                  <CommandItem
                                    key={option.id}
                                    value={option.name}
                                    onSelect={(currentValue) => {
                                      setSelected((prev) => ({
                                        ...prev,
                                        selectedScholarship: currentValue,
                                      }));
                                      setOpen((prev) => ({
                                        ...prev,
                                        scholarshipHeader: false,
                                      }));
                                    }}
                                  >
                                    {option.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        select.selectedScholarship ===
                                          option.name
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    ) : header.label === "Course" ? (
                      <Popover
                        open={open.courseHeader}
                        onOpenChange={(isOpen) =>
                          setOpen((prev) => ({
                            ...prev,
                            courseHeader: isOpen,
                          }))
                        }
                      >
                        <PopoverTrigger asChild>
                          <div
                            role="combobox"
                            aria-expanded={open.courseHeader}
                            className="flex items-center gap-5 cursor-pointer"
                          >
                            {select.selectedCourse}

                            <ChevronsUpDown className="opacity-80 h-4 w-4" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search Course..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No Course found.</CommandEmpty>
                              <CommandGroup>
                                {courseOptions.map((option) => (
                                  <CommandItem
                                    key={option.id}
                                    value={option.name}
                                    onSelect={(currentValue) => {
                                      setSelected((prev) => ({
                                        ...prev,
                                        selectedCourse: currentValue,
                                      }));
                                      setOpen((prev) => ({
                                        ...prev,
                                        courseHeader: false,
                                      }));
                                    }}
                                  >
                                    {option.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        select.selectedCourse === option.name
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    ) : header.label === "Student Name" ? (
                      <div
                        className="flex gap-5 items-center cursor-pointer"
                        onClick={() =>
                          setSelected((prev) => ({
                            ...prev,
                            sortOrder:
                              prev.sortOrder === "asc"
                                ? "desc"
                                : prev.sortOrder === "desc"
                                ? "default"
                                : "asc",
                          }))
                        }
                      >
                        {header.label}{" "}
                        {select.sortOrder === "asc" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : select.sortOrder === "desc" ? (
                          <ArrowDown className="h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 opacity-80" />
                        )}
                      </div>
                    ) : (
                      <p>{header.label}</p>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={headers.length} className="text-center">
                    <Ring size={40} speed={2} bgOpacity={0} color="yellow" />
                  </TableCell>
                </TableRow>
              ) : (
                data.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">
                      {application.studentId}
                    </TableCell>
                    <TableCell className="underline cursor-pointer">
                      <Link
                        href={`/administrator/home/applications/review/${application.studentId}`}
                        prefetch={true}
                      >
                        {" "}
                        {application.fullName}
                      </Link>
                    </TableCell>
                    <TableCell>{application.course}</TableCell>
                    <TableCell>
                      {application.applications.map((meow) => (
                        <p key={meow.scholarshipId}>{meow.scholarshipName}</p>
                      ))}
                    </TableCell>
                    <TableCell className="text-right">
                      {application.applications.length}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow className="col-span-3">
                <TableCell colSpan={5}></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}

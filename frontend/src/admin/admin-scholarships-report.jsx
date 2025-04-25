import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsUpDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
export default function ScholarshipsReport() {
  const scholarships = [
    {
      name: "Win Revillame",
      totalApplicants: 120,
      totalApproved: 45,
      endDate: "2025-05-30",
      approvedStudents: [
        {
          name: "Alice Johnson",
          course: "Biology",
          approvedDate: "2025-04-10",
          genre: "Male",
        },
        {
          name: "Brian Lee",
          course: "Computer Science",
          approvedDate: "2025-04-12",
          genre: "Male",
        },
        {
          name: "Clara Smith",
          course: "Engineering",
          approvedDate: "2025-04-14",
          genre: "Male",
        },
        {
          name: "David Kim",
          course: "Mathematics",
          approvedDate: "2025-04-15",
          genre: "Male",
        },
        {
          name: "Ella Brown",
          course: "Physics",
          approvedDate: "2025-04-17",
          genre: "Male",
        },
      ],
    },
    {
      name: "Kuya Wally",
      totalApplicants: 200,
      totalApproved: 80,
      endDate: "2025-06-15",
      approvedStudents: [
        {
          name: "James Carter",
          course: "Political Science",
          approvedDate: "2025-04-18",
          genre: "Male",
        },
        {
          name: "Maria Gonzales",
          course: "Business",
          approvedDate: "2025-04-19",
          genre: "Male",
        },
        {
          name: "Noah Patel",
          course: "International Relations",
          approvedDate: "2025-04-20",
          genre: "Male",
        },
        {
          name: "Olivia Wang",
          course: "Economics",
          approvedDate: "2025-04-21",
          genre: "Male",
        },
        {
          name: "Liam Davis",
          course: "Public Administration",
          approvedDate: "2025-04-22",
          genre: "Male",
        },
        {
          name: "Olivia Wang",
          course: "Economics",
          approvedDate: "2025-04-21",
          genre: "Male",
        },
        {
          name: "Liam Davis",
          course: "Public Administration",
          approvedDate: "2025-04-22",
          genre: "Male",
        },
      ],
    },
  ];
  const [selectedScholarship, setSelectedScholarship] = useState(
    scholarships[0]
  );
  const [open, setOpen] = useState(false);

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
                  Scholarships Report
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-5">
        <Card>
          <CardHeader>
            <CardTitle>Scholarships Report</CardTitle>
            <CardDescription>
              This are the generated scholarships data
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  role="combobox"
                  aria-expanded={open}
                  className="w-[220px] justify-between"
                >
                  {selectedScholarship.name}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Scholarship..." />
                  <CommandList>
                    <CommandEmpty>No Scholarship found.</CommandEmpty>
                    <CommandGroup>
                      {scholarships.map((scholarship) => (
                        <CommandItem
                          key={scholarship.name}
                          onSelect={() => {
                            setSelectedScholarship(scholarship);
                            setOpen(false);
                          }}
                        >
                          {scholarship.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead className="text-center">Approved Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedScholarship.approvedStudents.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.genre}</TableCell>
                    <TableCell className="text-center">
                      {student.approvedDate}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="font-medium">
                    Total Students
                  </TableCell>
                  <TableCell className="text-center">
                    {selectedScholarship.approvedStudents.length}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <div className="flex justify-end">
              <Button>Download Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

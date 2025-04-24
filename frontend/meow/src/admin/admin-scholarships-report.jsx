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
      name: "STEM Scholars Grant",
      totalApplicants: 120,
      totalApproved: 45,
      endDate: "2025-05-30",
      approvedStudents: [
        {
          name: "Alice Johnson",
          course: "Biology",
          approvedDate: "2025-04-10",
        },
        {
          name: "Brian Lee",
          course: "Computer Science",
          approvedDate: "2025-04-12",
        },
        {
          name: "Clara Smith",
          course: "Engineering",
          approvedDate: "2025-04-14",
        },
        {
          name: "David Kim",
          course: "Mathematics",
          approvedDate: "2025-04-15",
        },
        { name: "Ella Brown", course: "Physics", approvedDate: "2025-04-17" },
      ],
    },
    {
      name: "Future Leaders Scholarship",
      totalApplicants: 200,
      totalApproved: 80,
      endDate: "2025-06-15",
      approvedStudents: [
        {
          name: "James Carter",
          course: "Political Science",
          approvedDate: "2025-04-18",
        },
        {
          name: "Maria Gonzales",
          course: "Business",
          approvedDate: "2025-04-19",
        },
        {
          name: "Noah Patel",
          course: "International Relations",
          approvedDate: "2025-04-20",
        },
        {
          name: "Olivia Wang",
          course: "Economics",
          approvedDate: "2025-04-21",
        },
        {
          name: "Liam Davis",
          course: "Public Administration",
          approvedDate: "2025-04-22",
        },
      ],
    },
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
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
          <CardContent></CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup></CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {scholarships.map((scholarship) => (
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
                    <Button>View</Button>
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="font-semibold tracking-[-2px] zxc"
                >
                  Total Students
                </TableCell>
                <TableCell className="text-center">
                  {scholarships.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </div>
    </>
  );
}

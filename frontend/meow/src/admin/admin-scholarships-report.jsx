import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
                <TableHead>Scholarship Name</TableHead>
                <TableHead>Total Applicants</TableHead>
                <TableHead>Total Approved</TableHead>

                <TableHead className="text-right">Date Ended</TableHead>
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
                    <Button>View</Button>
                  </TableCell>
                </TableRow>
              ))}
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

import { useState, useEffect } from "react";
import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Check,
  Grid2x2,
  TableProperties,
  FileDown,
  Archive,
  GraduationCap,
} from "lucide-react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Loader() {
  return (
    <div className="flex justify-center items-center col-span-4">
      <div className="w-8 h-8 border-4 border-t-transparent border-black border-solid rounded-full animate-spin"></div>
    </div>
  );
}
export default function Scholarships() {
  const [open, setOpen] = useState(false);
  const [viewMode, setviewMode] = useState("card");
  const [scholarships, setScholar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const moew = location.search.replace("?=", "") || "list";

  useEffect(() => {
    async function fetchScholar() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch("/ngi.json");
      const data = await response.json();
      setScholar(data);
      setLoading(false);
    }
    fetchScholar();
  }, []);

  const exportCSV = () => {
    if (!scholarships || scholarships.length === 0) {
      alert("No scholarships data to export.");
      return;
    }
    const header = ["Name", "totalApplicants", "totalApproved", "endDate"];
    const rows = scholarships.map((s) => [
      `"${s.name}"`,
      `"${s.totalApplicants}"`,
      `"${s.totalApproved}"`,
      `"${s.endDate}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = scholarships.filter((meow) =>
    meow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <header className="flex  bg-gradient-to-bl from-green-700 to-green-900 h-16 items-center justify-between px-5 text-white border-b shadow-sm sticky top-0">
        <div className="flex items-center gap-3 ">
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
                  Scholarships
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="p-4">
        <Tabs defaultValue={moew}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Active Scholarships</TabsTrigger>
            <TabsTrigger value="add">Add Scholarship</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <div className=" py-5 flex gap-3">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    Filter Scholarships
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Scholarship..." />
                    <CommandList>
                      <CommandEmpty>No Scholarship found.</CommandEmpty>
                      <CommandGroup></CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Input
                type="search"
                onChange={(text) => setSearchTerm(text.target.value)}
                placeholder="Search Scholarship Name ..."
              />
              <Button
                variant="ghost"
                onClick={() =>
                  setviewMode(viewMode === "card" ? "table" : "card")
                }
              >
                {viewMode === "card" ? <TableProperties /> : <Grid2x2 />}
              </Button>
              <Button onClick={exportCSV}>
                {" "}
                Export CSV <FileDown />
              </Button>
              <Link to="/admin-home/scholarships/archived">
                <Button>
                  Archive <Archive />
                </Button>
              </Link>
            </div>

            {loading ? (
              <Loader />
            ) : viewMode === "card" ? (
              <div className="grid grid-cols-4 gap-2">
                {filteredData.map((scholarship) => (
                  <Card key={scholarship.name} className="w-full">
                    <CardHeader>
                      <CardTitle className="flex items-center  gap-2">
                        <GraduationCap className="min-w-6" />
                        <p>{scholarship.name}</p>
                        <p className="text-xs py-1 px-2 rounded-2xl bg-green-100 text-green-700 border-1 font-semibold flex items-center gap-1 shadow">
                          Active
                          <Check
                            className="bg-green-500 rounded-full text-white shadow"
                            size={15}
                          />
                        </p>
                      </CardTitle>
                      <CardDescription>
                        End Date: {scholarship.endDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-around">
                      <span className="flex items-center gap-3 flex-col">
                        <p className="text-sm">Applicants</p>
                        <p className="font-semibold text-3xl">
                          {scholarship.totalApplicants}
                        </p>
                      </span>

                      <span className="flex items-center gap-3 flex-col">
                        <p className="text-sm"> Approved</p>
                        <p className="text-3xl font-semibold">
                          {scholarship.totalApproved}
                        </p>
                      </span>
                    </CardContent>
                    <CardFooter>
                      <Link
                        className="w-full"
                        to={`/admin-home/scholarships/${encodeURIComponent(
                          scholarship.name
                        )}`}
                      >
                        <Button className="w-full bg-green-700 hover:bg-green-800">
                          View
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Scholarships</CardTitle>
                  <CardDescription>
                    This are the list of available scholarships
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                      {filteredData.map((scholarship) => (
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
                            <Button>Open Scholarship</Button>
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
                </CardContent>
              </Card>
            )}
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
                <div className="flex gap-3 w-full">
                  <div className="space-y-1  w-full">
                    <Label htmlFor="curnamerent">Scholarship Name</Label>
                    <Input id="name" type="text" />
                  </div>
                  <div className="space-y-1  w-full">
                    <Label htmlFor="curnamerent">Application Deadline</Label>
                    <Input id="name" type="date" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="curnamerent">Scholarship Description</Label>
                  <Textarea placeholder="Type your message here" />
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

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState, useEffect } from "react";
import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../components/ui/sidebar";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CheckCheck,
  GraduationCap,
  Layers,
  Timer,
  X,
  Plus,
  Funnel,
  ChevronsUpDown,
  Search,
  TableProperties,
  FileDown,
  Grid2x2,
  Trash,
  Pencil,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";
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
import { SwiperSlide } from "swiper/react";
import { Textarea } from "@/components/ui/textarea";
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
import axios from "axios";

function Loader() {
  return (
    <div className="flex justify-center items-center col-span-4">
      <div className="w-8 h-8 border-4 border-t-transparent border-black border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default function OpenScholarship() {
  const { id } = useParams();
  const [scholarship, setScholar] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getScholar =async () => {
      try {
        const data = {scholarshipId:id}
        const res = await axios.post(`${import.meta.env.VITE_EXPRESS_API_EDUGRANT_ADMIN}/getScholarshipsById`,data,{withCredentials:true})
        setScholar(res.data.getScholarshipsById[0])
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
    }
    getScholar()
  },[])
  const exportCSV = () => {
    if (!scholarship.students || scholarship.students.length === 0) {
      alert("No student data to export.");
      return;
    }
    const header = ["Name", "Status", "Application Date", "Section"];
    const rows = scholarship.students.map((s) => [
      `"${s.name}"`,
      `"${s.status}"`,
      `"${s.applicationDate}"`,
      `"${s.section}"`,
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
  const [edit, setEdit] = useState(true);
  const [open, setOpen] = useState(false);
  const [viewMode, setviewMode] = useState("card");

  const [val, setVal] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = scholarship?.students?.filter((student) => {
    const matchSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchValue =
      val === "All" || student.status.toLowerCase().includes(val.toLowerCase());

    return matchSearch && matchValue;
  });

  return (
    <>
      <header className="flex bg-green-800 h-16 items-center justify-between px-5 text-white border-b shadow-sm sticky top-0">
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
                <Link to="/admin-home/scholarships">
                  <BreadcrumbPage className="text-white">
                    Scholarships
                  </BreadcrumbPage>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {scholarship.scholarshipName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="p-4">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Scholarship Details</TabsTrigger>
            <TabsTrigger value="report">Scholarship Report</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            {loading ? (
              <Loader />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Scholarship</CardTitle>
                  <CardDescription>
                    Update the scholarship information below
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex gap-3">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="">Scholarship Name</Label>
                      <Input
                        type="text"
                        defaultValue={scholarship.scholarshipName}
                        disabled={edit}
                        placeholder="Enter scholarship name"
                      />
                    </div>
                    <div className="space-y-2 w-full">
                      <Label htmlFor="">Application Deadline</Label>
                      <Input
                        type="text"
                        defaultValue={scholarship.scholarshipDealine}
                        disabled={edit}
                        placeholder="e.g. 2025-12-31"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Scholarship Description</Label>
                    <Textarea
                      defaultValue={scholarship.scholarshipDescription}
                      disabled={edit}
                      placeholder="Provide a detailed description of the scholarship"
                    />
                  </div>
                </CardContent>
                <CardFooter className="space-x-2">
                  <Button onClick={() => setEdit(!edit)}>
                    {edit ? (
                      <>
                        <Pencil /> Edit Details
                      </>
                    ) : (
                      <>
                        <Save /> Save Changes
                      </>
                    )}
                  </Button>

                  <Button variant="destructive">
                    <Trash /> Delete Scholarship
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="report">
            <div className=" py-5 flex gap-3">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    <Funnel />
                    {val}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search Scholarship..." />
                    <CommandList>
                      <CommandEmpty>No Scholarship found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => {
                            setVal("All");
                            setOpen(false);
                          }}
                          value="all"
                        >
                          All
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            setVal("Approved");
                            setOpen(false);
                          }}
                          value="approved"
                        >
                          Approved
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            setVal("Pending");
                            setOpen(false);
                          }}
                          value="pending"
                        >
                          Pending
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            setVal("Reject");
                            setOpen(false);
                          }}
                          value="reject"
                        >
                          Reject
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <div className="w-full relative flex items-center">
                <Search size={20} className="absolute left-2 text-black/50" />
                <Input
                  className="px-9"
                  type="search"
                  placeholder="Search student name ..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="ghost"
                onClick={() =>
                  setviewMode(viewMode === "card" ? "table" : "card")
                }
              >
                {viewMode === "card" ? (
                  <TableProperties size={50} />
                ) : (
                  <Grid2x2 size={50} />
                )}
              </Button>
              <Button onClick={exportCSV}>
                {" "}
                Export CSV <FileDown />
              </Button>
            </div>
            {viewMode === "card" ? (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {filteredStudents?.map((meow) => (
                  <Card key={meow.name}>
                    <CardHeader>
                      <CardTitle>{meow.name}</CardTitle>
                      <CardDescription>{meow.section}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>Status: {meow.status}</p>
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Scholarship Report</CardTitle>
                  <CardDescription>
                    List of students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Course, Year & Section</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className=""></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents?.map((meow) => (
                        <TableRow key={meow.name}>
                          <TableCell>{meow.name}</TableCell>
                          <TableCell>
                            {meow.course}-{meow.yearLevel}
                            {meow.section}
                          </TableCell>
                          <TableCell>{meow.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

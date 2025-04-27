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
    async function fetchScholar() {
      const response = await fetch("/ngi.json");
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = await response.json();
      const scholarshipData = data.find((meow) => meow.name === id);
      setScholar(scholarshipData);
      setLoading(false);
    }
    fetchScholar();
  }, []);

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
                  {scholarship.name}
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
                  <CardTitle>{scholarship.name}</CardTitle>
                  <CardDescription>
                    <Input
                      defaultValue={scholarship.description}
                      disabled={edit}
                    ></Input>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center gap-3 w-full">
                    <div className="space-y-1 w-full">
                      <Label htmlFor="">Sponsor</Label>
                      <Input
                        type="text"
                        defaultValue={scholarship.sponsoredBy}
                        disabled={edit}
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full">
                      <div className="space-y-1 w-full">
                        <Label htmlFor="">Start Date</Label>
                        <Input
                          defaultValue={scholarship.startDate}
                          disabled={edit}
                          type="text"
                        />
                      </div>
                      <div className="space-y-1 w-full">
                        <Label htmlFor="">End Date</Label>
                        <Input
                          type="text"
                          defaultValue={scholarship.endDate}
                          disabled={edit}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setEdit(!edit)}>
                    {edit ? "Edit Scholarship" : "Save Changes"}
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
            <div className="grid grid-cols-4 gap-2">
              {filteredStudents?.map((meow) => (
                <Card key={meow.name}>
                  <CardHeader>
                    <CardTitle>{meow.name}</CardTitle>
                    <CardDescription>{meow.section}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p> Application Date: {meow.applicationDate}</p>
                    <p>Status: {meow.status}</p>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

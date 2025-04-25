import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  ChevronsUpDown,
  Grid2x2,
  TableProperties,
  FileDown,
  Funnel,
  Search,
  UserRound,
  CheckCheck,
  GraduationCap,
  Layers,
  Timer,
  X,
  Plus,
  Check,
  Minus,
  Clock,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
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
import { SidebarTrigger } from "../components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function Application() {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    async function fetchStudent() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await fetch("/appli.json");
      const data = await response.json();

      setStudent(data);
      setLoading(false);
    }
    fetchStudent();
  }, []);
  console.log(student);
  const [open, setOpen] = useState(false);

  const [viewMode, setviewMode] = useState("card");

  const [activeTab, setActiveTab] = useState("review");

  const [loading, setLoading] = useState(true);

  const toggleText = (id) => {
    setTextVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const exportCSV = () => {
    if (!student || student.length === 0) {
      alert("No student data to export.");
      return;
    }
    const header = ["Name", "Email", "Applications"];
    const rows = student.map((s) => [
      `"${s.name}"`,
      `"${s.email}"`,
      s.scholarships.length,
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

  function Modal({ meow }) {
    const [activeReject, setActiveReject] = useState(null);
    return (
      <Sheet>
        <SheetTrigger className="bg-green-800 px-3 py-2 font-semibold text-sm rounded-md text-white">
          Review Student
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-center">{meow.name}</SheetTitle>
            <SheetDescription className="text-center">
              {meow.email}
            </SheetDescription>
          </SheetHeader>

          <div className="flex gap-3 p-5 justify-center items-center  h-[400px]">
            {meow.scholarships.map((arf) => (
              <Card>
                <CardHeader>
                  <h1>{arf.name}</h1>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold">NO DOCUMENTS FOUND ...</div>

                  {activeReject === `${meow.id}-${arf.name}` && (
                    <div className="space-y-2 mt-4">
                      <Textarea placeholder="Enter your message here ..." />
                      <div className="flex justify-end">
                        <Button>Send</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="grid grid-cols-3 gap-2">
                  <Button className="w-full">Approved</Button>
                  <Button onClick={() => setActiveReject()} className="w-full">
                    Missing
                  </Button>
                  <Button
                    onClick={() => setActiveReject(`${meow.id}-${arf.name}`)}
                    variant="destructive"
                    className="w-full"
                  >
                    Reject
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <>
      <header className="flex bg-green-800 h-16 items-center justify-between px-5 text-white border-b shadow-sm sticky top-0 z-10">
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
                  Scholarships Applications
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="grid grid-cols-4 text-center p-4 text-left zxc gap-3 tracking-[-2px]">
        <span className="py-2 px-3 bg-blue-100 rounded-md flex items-center gap-3">
          <span className="bg-blue-300 p-3 rounded-md">
            <Layers size={40} absoluteStrokeWidth />
          </span>
          <span>
            <p> TOTAL</p>
            <p className="text-4xl">{student.length}</p>
          </span>
        </span>
        <span className="py-2 px-3 bg-green-200 rounded-md flex items-center gap-3">
          <span className="bg-green-400 p-3 rounded-md">
            <CheckCheck size={40} absoluteStrokeWidth />
          </span>
          <span>
            <p>APPROVED</p>
            <p className="text-4xl">
              {student.filter((student) => student.approved).length}
            </p>
          </span>
        </span>

        <span className="py-2 px-3 bg-amber-200 rounded-md flex items-center gap-3">
          <span className="bg-amber-400 p-3 rounded-md">
            <Timer size={40} absoluteStrokeWidth />
          </span>
          <span>
            <p>IN REVIEW</p>
            <p className="text-4xl">
              {
                student.filter((student) =>
                  student.scholarships.some((ngi) => ngi.pending)
                ).length
              }
            </p>
          </span>
        </span>
        <span className="py-2 px-3 bg-purple-200 rounded-md flex items-center gap-3">
          <span className="bg-purple-400 p-3 rounded-md">
            <GraduationCap size={40} absoluteStrokeWidth />
          </span>
          <span>
            <p className="whitespace-nowrap">ACTIVE</p>
            <p className="text-4xl">0</p>
          </span>
        </span>
      </div>

      <div className="px-5 py-5 flex gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              <Funnel /> Filter Scholarships
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
        <div className="w-full relative flex items-center">
          <Search size={20} className="absolute left-2 text-black/50" />
          <Input
            className="px-9"
            type="search"
            placeholder="Search student name ..."
          />
        </div>
        <Button
          variant="ghost"
          onClick={() => setviewMode(viewMode === "card" ? "table" : "card")}
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className=" p-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="review">In Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="missing">Missing</TabsTrigger>
        </TabsList>

        {activeTab === "review" && (
          <TabsContent value="review">
            {viewMode === "card" ? (
              <div className="grid grid-cols-4 gap-2 py-4">
                {loading ? (
                  <div className="flex justify-center items-center col-span-4">
                    <div className="w-8 h-8 border-4 border-t-transparent border-green-500 border-solid rounded-full animate-spin"></div>
                  </div>
                ) : (
                  student
                    .filter((arf) =>
                      arf.scholarships.some((ngi) => ngi.pending === true)
                    )
                    .map((meow) => (
                      <Card key={meow.id} className="w-full">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-1.5">
                            <UserRound />
                            {meow.name}
                            <p className="text-xs py-1 px-2 rounded-2xl bg-blue-100 text-blue-700  border-1 font-semibold flex items-center gap-2 shadow">
                              In review
                              <Clock
                                className="bg-blue-500 rounded-full text-white  shadow "
                                size={15}
                              />
                            </p>
                          </CardTitle>
                          <CardDescription>
                            {meow.course}-{meow.yearLevel}
                            {meow.section}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <h1>Total Application: {meow.scholarships.length}</h1>
                        </CardContent>
                        <CardFooter>
                          <Modal meow={meow} />
                        </CardFooter>
                      </Card>
                    ))
                )}
              </div>
            ) : (
              <div className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Application</CardTitle>
                    <CardDescription>
                      Can review and approve students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-center">
                            Applications
                          </TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.map((meow) => (
                          <TableRow key={meow.id}>
                            <TableCell>{meow.name}</TableCell>
                            <TableCell>{meow.email}</TableCell>
                            <TableCell className="text-center">
                              {meow.scholarships.length}
                            </TableCell>
                            <TableCell className="text-center">
                              <Modal meow={meow} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        )}
        {activeTab === "approved" && (
          <TabsContent value="approved">
            {viewMode === "card" ? (
              <div className="grid grid-cols-4 gap-2 py-4">
                {student.filter((student) => student.approved).length > 0 ? (
                  student
                    .filter((meow) => meow.approved)
                    .map((meow) => (
                      <Card key={meow.id} className="w-full">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-1.5">
                            <UserRound />
                            {meow.name}
                            <p className="text-xs py-1 px-2 rounded-2xl bg-green-100 text-green-700 border-1 font-semibold flex items-center gap-2 shadow">
                              Approved
                              <Check
                                className="bg-green-500 rounded-full text-white shadow"
                                size={15}
                              />
                            </p>
                          </CardTitle>
                          <CardDescription>{meow.email}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col justify-center items-start gap-1">
                            {meow.scholarships
                              .filter((arf) => arf.approved) // Filtering scholarships once
                              .map((oink) => (
                                <p key={oink.name}>{oink.name}</p>
                              ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Modal meow={meow} />
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <p>No approved students found.</p>
                )}
              </div>
            ) : (
              <div className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Application</CardTitle>
                    <CardDescription>
                      Can review and approve students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-center">
                            Applications
                          </TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.map((meow) => (
                          <TableRow key={meow.id}>
                            <TableCell>{meow.name}</TableCell>
                            <TableCell>{meow.email}</TableCell>
                            <TableCell className="text-center">
                              {meow.scholarships.length}
                            </TableCell>
                            <TableCell className="text-center">
                              <Modal meow={meow} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        )}
        {activeTab === "missing" && (
          <TabsContent value="missing">
            {viewMode === "card" ? (
              <div className="grid grid-cols-4 gap-2 py-4">
                {student
                  .filter((arf) =>
                    arf.scholarships.some(
                      (ngi) => ngi.missingRequirements === true
                    )
                  )
                  .map((meow) => (
                    <Card key={meow.id} className="w-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-1.5">
                          <UserRound />
                          {meow.name}
                          <p className="text-xs py-1 px-2 rounded-2xl bg-yellow-100 text-yellow-700 border-1 font-semibold flex items-center gap-2 shadow">
                            Missing
                            <Minus
                              className="bg-yellow-500 rounded-full text-white shadow"
                              size={15}
                            />
                          </p>
                        </CardTitle>
                        <CardDescription>{meow.email}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <h1>
                          Missing Requirements:{" "}
                          {
                            meow.scholarships.filter(
                              (s) => s.missingRequirements === true
                            ).length
                          }
                        </h1>
                      </CardContent>
                      <CardFooter>
                        <Modal meow={meow} />
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Application</CardTitle>
                    <CardDescription>
                      Can review and approve students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-center">
                            Applications
                          </TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.map((meow) => (
                          <TableRow key={meow.id}>
                            <TableCell>{meow.name}</TableCell>
                            <TableCell>{meow.email}</TableCell>
                            <TableCell className="text-center">
                              {meow.scholarships.length}
                            </TableCell>
                            <TableCell className="text-center">
                              <Modal meow={meow} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
    </>
  );
}

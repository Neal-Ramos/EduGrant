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
  FileText,
  SendHorizontal,
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
  const [scholar, setScholar] = useState([]);
  useEffect(() => {
    async function fetchStudent() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch("/appli.json");
      const data = await response.json();

      setStudent(data);
      setLoading(false);
    }
    fetchStudent();
  }, []);

  useEffect(() => {
    async function fetchScholar() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch("/ships.json");
      const data = await response.json();

      setScholar(data);
      setLoading(false);
    }
    fetchScholar();
  }, []);

  const [open, setOpen] = useState(false);

  const [viewMode, setviewMode] = useState("table");

  const [activeTab, setActiveTab] = useState("review");

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [combo, setCombo] = useState("");

  const filteredData = student.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.scholarships.some((q) =>
        q.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );
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

  function InReviewModal({ meow }) {
    const [activeReject, setActiveReject] = useState(null);
    return (
      <Sheet>
        <SheetTrigger className="bg-blue-800 px-3 py-2 font-semibold text-sm rounded-md text-white">
          Review Student
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-center text-3xl zxc tracking-[-4px]">
              {meow.name}
            </SheetTitle>
            <SheetDescription className="text-center">
              <div>
                {meow.course}-{meow.yearLevel}
                {meow.section}
              </div>
              <div>{meow.email}</div>
            </SheetDescription>
          </SheetHeader>

          <div className="flex gap-3 p-5 justify-center items-center  ">
            {meow.scholarships.map((arf) => (
              <Card>
                <CardHeader>
                  <h1>{arf.name}</h1>
                  <CardDescription>
                    Application Date: {arf.applicationDate}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {arf.submittedDocs.map((ngi) => (
                    <p className="underline flex items-center gap-1 cursor-pointer">
                      <FileText size={18} />
                      {ngi.documentLabel}
                    </p>
                  ))}

                  {activeReject === `${meow.id}-${arf.name}` && (
                    <div className="space-y-2 mt-4">
                      <Textarea placeholder="Enter your message here ..." />
                      <div className="flex justify-end">
                        <Button>
                          Send
                          <SendHorizontal />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="grid grid-cols-3 gap-2">
                  <Button className="w-full bg-green-200 text-green-800 shadow-xs hover:bg-green-300 cursor-pointer">
                    <Check className="text-white bg-green-600 rounded shadow-xs" />
                    Approved
                  </Button>

                  <Button
                    onClick={() => setActiveReject(`${meow.id}-${arf.name}`)}
                    className="w-full bg-yellow-200 text-yellow-800 shadow-xs hover:bg-yellow-300 cursor-pointer"
                  >
                    <Minus className="text-white bg-yellow-600 rounded shadow-xs" />{" "}
                    Mark As Missing
                  </Button>
                  <Button className="w-full bg-red-200 text-red-800 shadow-xs hover:bg-red-300 cursor-pointer">
                    <X className="text-white bg-red-600 rounded shadow-xs" />{" "}
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
  function ApprovedModal({ meow }) {
    return (
      <Sheet>
        <SheetTrigger className="bg-green-800 px-3 py-2 font-semibold text-sm rounded-md text-white w-full">
          Details
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-center text-3xl zxc tracking-[-4px]">
              {meow.name}
            </SheetTitle>
            <SheetDescription className="text-center">
              <div>
                {meow.course}-{meow.yearLevel}
                {meow.section}
              </div>
              <div>{meow.email}</div>
            </SheetDescription>
          </SheetHeader>

          <div className="flex gap-3 p-5 justify-center items-center  ">
            {meow.scholarships
              .filter((me) => me.approved)
              .map((me) => (
                <Card key={me.name} className=" w-[300px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {me.name}{" "}
                      <p className="text-xs py-1 px-2 rounded-2xl bg-green-100 text-green-700 border-1 font-semibold flex items-center gap-2 shadow">
                        Approved
                        <Check
                          className="bg-green-500 rounded-full text-white shadow"
                          size={15}
                        />
                      </p>
                    </CardTitle>
                    <CardDescription>
                      Application Date: {me.applicationDate}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {me.submittedDocs.map((ngi) => (
                      <p className="underline flex items-center gap-1 cursor-pointer">
                        <FileText size={18} />
                        {ngi.documentLabel}
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter className="grid grid-cols-3 gap-2"></CardFooter>
                </Card>
              ))}

            {meow.scholarships
              .filter((me) => me.approved === false)
              .map((me) => (
                <Card key={me.name} className=" w-[300px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-500">
                      {me.name}{" "}
                      <p className="text-xs py-1 px-2 rounded-2xl bg-gray-100 text-gray-700 border-1 font-semibold flex items-center gap-2 shadow">
                        Blocked
                        <X
                          className="bg-gray-500 rounded-full text-white shadow"
                          size={15}
                        />
                      </p>
                    </CardTitle>

                    <CardDescription>
                      Application Date: {me.applicationDate}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {me.submittedDocs.map((ngi) => (
                      <p className="underline flex items-center gap-1  text-gray-500">
                        <FileText size={18} />
                        {ngi.documentLabel}
                      </p>
                    ))}
                  </CardContent>
                  <CardFooter className="grid grid-cols-3 gap-2"></CardFooter>
                </Card>
              ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  function MissingModal({ meow }) {
    const [activeReject, setActiveReject] = useState(null);

    return (
      <Sheet>
        <SheetTrigger className="bg-yellow-800 px-3 py-2 font-semibold text-sm rounded-md text-white w-full">
          Review Student
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-center text-3xl zxc tracking-[-4px]">
              {meow.name}
            </SheetTitle>
            <SheetDescription className="text-center">
              <div>
                {meow.course}-{meow.yearLevel}
                {meow.section}
              </div>
              <div>{meow.email}</div>
            </SheetDescription>
          </SheetHeader>

          <div className="flex gap-3 p-5 justify-center items-center">
            {student.filter((z) =>
              z.scholarships.some((c) => c.missingRequirements === true)
            ).length > 0 ? (
              student
                .filter((z) =>
                  z.scholarships.some((c) => c.missingRequirements === true)
                )
                .map((student) =>
                  student.scholarships
                    .filter((arf) => arf.missingRequirements === true)
                    .map((arf) => (
                      <Card
                        key={`${student.id}-${arf.name}`}
                        className="w-[350px]"
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <h1>{arf.name}</h1>
                            <p className="text-xs py-1 px-2 rounded-2xl bg-yellow-100 text-yellow-700 border-1 font-semibold flex items-center gap-2 shadow">
                              Missing
                              <Minus
                                className="bg-yellow-500 rounded-full text-white shadow"
                                size={15}
                              />
                            </p>
                          </CardTitle>
                          <CardDescription>
                            Application Date: {arf.applicationDate}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-3">
                          {arf.submittedDocs.map((ngi, index) => (
                            <p
                              key={index}
                              className="underline flex items-center gap-1 cursor-pointer"
                            >
                              <FileText size={18} />
                              {ngi.documentLabel}
                            </p>
                          ))}

                          {activeReject === `${student.id}-${arf.name}` && (
                            <div className="space-y-2 mt-4">
                              <Textarea placeholder="Enter your message here ..." />
                              <div className="flex justify-end">
                                <Button>Send</Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                          <Textarea placeholder="Your document is blurred, Please send another" />
                          <Button>Edit comment</Button>
                        </CardFooter>
                      </Card>
                    ))
                )
            ) : (
              <p>No missing requirements</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  function Loader() {
    return (
      <div className="flex justify-center items-center col-span-4">
        <div className="w-8 h-8 border-4 border-t-transparent border-black border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <header className="flex  bg-gradient-to-bl from-green-700 to-green-900 h-16 items-center justify-between px-5 text-white border-b shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
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
                  Applications
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="px-5 py-5 flex gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              <Funnel />
              {combo || "Filter Scholarships"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Scholarship..." />
              <CommandList>
                <CommandEmpty>No Scholarship found.</CommandEmpty>
                <CommandGroup>
                  {scholar.map((a) => (
                    <CommandItem
                      key={a.name}
                      onSelect={() => {
                        setSearchTerm(a.name);
                        setCombo(a.name);
                        setOpen(false);
                      }}
                    >
                      {a.name}
                    </CommandItem>
                  ))}
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
          <TabsTrigger value="review">For Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="missing">Missing Requirements</TabsTrigger>
        </TabsList>

        {activeTab === "review" && (
          <TabsContent value="review">
            {viewMode === "card" ? (
              <div className="grid grid-cols-4 gap-2 py-4">
                {loading ? (
                  <Loader />
                ) : filteredData.filter((a) =>
                    a.scholarships.some((b) => b.pending)
                  ).length > 0 ? (
                  filteredData
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
                              For review
                              <Clock
                                className="bg-blue-500 rounded-full text-white  shadow "
                                size={15}
                              />
                            </p>
                          </CardTitle>
                          <CardDescription className="flex justify-between">
                            <div>
                              {meow.course}-{meow.yearLevel}
                              {meow.section}
                            </div>
                            <div>Documents 3/3</div>
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="">
                          <div className="flex  gap-2">
                            <GraduationCap />
                            <div className="">
                              <p>Applied Scholarships</p>
                              <p className="text-3xl font-semibold">
                                {meow.scholarships.length}
                              </p>
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter>
                          <InReviewModal meow={meow} />
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <p>No Students Found</p>
                )}
              </div>
            ) : (
              <div>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Student Application</CardTitle>
                    <CardDescription>
                      Can review and approve students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <Loader />
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Course, Year & Section</TableHead>
                            <TableHead className="text-center">
                              Applications
                            </TableHead>
                            <TableHead className="text-center">
                              Status
                            </TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredData.filter((student) =>
                            student.scholarships.some(
                              (scholarship) => scholarship.pending
                            )
                          ).length > 0 ? (
                            filteredData
                              .filter((student) =>
                                student.scholarships.some(
                                  (scholarship) => scholarship.pending
                                )
                              )

                              .map((meow) => (
                                <TableRow key={meow.id}>
                                  <TableCell>{meow.name}</TableCell>
                                  <TableCell>
                                    {meow.course}-{meow.yearLevel}
                                    {meow.section}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {meow.scholarships.length}
                                  </TableCell>
                                  <TableCell className="flex justify-center items-center">
                                    <p className="text-xs py-1 px-2 rounded-2xl bg-blue-100 text-blue-700  border-1 font-semibold flex items-center gap-2 shadow">
                                      For review
                                      <Clock
                                        className="bg-blue-500 rounded-full text-white  shadow "
                                        size={15}
                                      />
                                    </p>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <InReviewModal meow={meow} />
                                  </TableCell>
                                </TableRow>
                              ))
                          ) : (
                            <p>No Students Found</p>
                          )}
                        </TableBody>
                      </Table>
                    )}
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
                {filteredData.filter((student) => student.approved).length >
                0 ? (
                  filteredData
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
                                <div key={oink.name}>
                                  <p className="text-md">Scholarship</p>
                                  <p className="text-xl font-bold">
                                    {" "}
                                    {oink.name}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <ApprovedModal meow={meow} />
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <p>No approved students found.</p>
                )}
              </div>
            ) : (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Student Application</CardTitle>
                  <CardDescription>List of approved students</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Scholarship</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.filter(
                        (babyqatrina) => babyqatrina.approved
                      ).length > 0 ? (
                        filteredData
                          .filter((meow) => meow.approved)
                          .map((arf) => (
                            <TableRow key={arf.id}>
                              <TableCell>{arf.name}</TableCell>
                              <TableCell>{arf.email}</TableCell>
                              <TableCell>
                                {arf.scholarships
                                  .filter((arf) => arf.approved)
                                  .map((oink) => (
                                    <p key={oink.name}> {oink.name}</p>
                                  ))}
                              </TableCell>
                              <TableCell className="flex justify-start items-center">
                                <p className="text-xs py-1 px-2 rounded-2xl bg-green-100 text-green-700  border-1 font-semibold flex items-center gap-2 shadow">
                                  Approved
                                  <Check
                                    className="bg-green-500 rounded-full text-white  shadow "
                                    size={15}
                                  />
                                </p>
                              </TableCell>
                              <TableCell className="text-center">
                                <ApprovedModal meow={arf} />
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <p>No approved students found.</p>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}
        {activeTab === "missing" && (
          <TabsContent value="missing">
            {viewMode === "card" ? (
              <div className="grid grid-cols-4 gap-2 py-4">
                {filteredData.filter((a) =>
                  a.scholarships.some((b) => b.missingRequirements)
                ).length > 0 ? (
                  filteredData
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
                          <MissingModal meow={meow} />
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <p className=" text-center">No Student Found.</p>
                )}
              </div>
            ) : (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Student Application</CardTitle>
                  <CardDescription>
                    Students with missing requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">
                          Missing Requirements
                        </TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.filter((a) =>
                        a.scholarships.some(
                          (w) => w.missingRequirements === true
                        )
                      ).length > 0 ? (
                        filteredData
                          .filter((a) =>
                            a.scholarships.some(
                              (b) => b.missingRequirements === true
                            )
                          )
                          .map((meow) => (
                            <TableRow key={meow.id}>
                              <TableCell>{meow.name}</TableCell>
                              <TableCell>{meow.email}</TableCell>
                              <TableCell className="text-center">
                                {
                                  meow.scholarships.filter(
                                    (s) => s.missingRequirements === true
                                  ).length
                                }
                              </TableCell>
                              <TableCell className="flex items-center justify-center">
                                <p className="text-xs py-1 px-2 rounded-2xl bg-yellow-100 text-yellow-700 border-1 font-semibold flex items-center gap-2 shadow">
                                  Missing
                                  <Minus
                                    className="bg-yellow-500 rounded-full text-white shadow"
                                    size={15}
                                  />
                                </p>
                              </TableCell>
                              <TableCell className="text-center">
                                <MissingModal meow={meow} />
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <p className="text-center p-2">No Student Found.</p>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}
      </Tabs>
    </>
  );
}

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
import axios from "axios";

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
  const [requirements, setRequirements] = useState([]);

  const handleAddRequirement = () => {
    setRequirements([...requirements, { label: ""}]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...requirements];
    updated[index][field] = value;
    setRequirements(updated);
  };
  useEffect(() => {
    const getScholar =async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_EXPRESS_API_EDUGRANT_ADMIN}/getScholarships`,{},{withCredentials:true})
        setScholar(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getScholar()
  },[])
  // useEffect(() => {
  //   async function fetchScholar() {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     const response = await fetch("/ngi.json");
  //     const data = await response.json();
  //     setScholar(data);
  //     setLoading(false);
  //   }
  //   fetchScholar();
  // }, []);

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
    meow.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [newScholarData, setNewScholarData] = useState({
    newScholarName:null,
    newScholarDeadline:null,
    newScholarSponsorLogo:null,
    newScholarCoverImg:null,
    newScholarDescription:null
  })
  const handleAddScholarship = async () => {
    try {
      const formData = new FormData();
      formData.append('newScholarName', newScholarData.newScholarName);
      formData.append('newScholarDeadline', newScholarData.newScholarDeadline);
      formData.append('newScholarDescription', newScholarData.newScholarDescription);
      formData.append('requirements', JSON.stringify(requirements)); // if it's an array/object
      // Attach files
      formData.append('sponsorLogo', newScholarData.newScholarSponsorLogo);
      formData.append('coverImg', newScholarData.newScholarCoverImg);
      
      const res = await axios.post(`${import.meta.env.VITE_EXPRESS_API_EDUGRANT_ADMIN}/adminAddScholarships`,formData,{withCredentials:true})
      if(res.status === 200){alert("Scholarship Added!!")}
    } catch (error) {
      if(error.status === 500){alert(error.response.data.error)}
      else{alert(error.response.data.message)}
    }
  }

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
                  <Card key={scholarship.scholarshipId } className="w-full">
                    <CardHeader>
                      <CardTitle className="flex items-center  gap-2">
                        <GraduationCap className="min-w-6" />
                        <p>{scholarship.scholarshipName}</p>
                        <p className="text-xs py-1 px-2 rounded-2xl bg-green-100 text-green-700 border-1 font-semibold flex items-center gap-1 shadow">
                          Active
                          <Check
                            className="bg-green-500 rounded-full text-white shadow"
                            size={15}
                          />
                        </p>
                      </CardTitle>
                      <CardDescription>
                        End Date: {scholarship.scholarshipDealine}
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
                          scholarship.scholarshipName
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
                        <TableHead className="text-left">Deadline</TableHead>
                        <TableHead className="text-center">Status</TableHead>

                        <TableHead className=""></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((scholarship) => (
                        <TableRow key={scholarship.scholarshipId }>
                          <TableCell className="font-medium">
                            {scholarship.scholarshipName}
                          </TableCell>
                          <TableCell>{scholarship.totalApplicants}</TableCell>

                          <TableCell>{scholarship.totalApproved}</TableCell>
                          <TableCell className="text-left">
                            {scholarship.scholarshipDealine}
                          </TableCell>
                          <TableCell className="flex items-center justify-center">
                            <p className="text-xs py-1 px-2 rounded-2xl bg-green-100 text-green-700 border-1 font-semibold flex items-center gap-1 shadow">
                              Active
                              <Check
                                className="bg-green-500 rounded-full text-white shadow"
                                size={15}
                              />
                            </p>
                          </TableCell>
                          <TableCell className="text-center">
                            <Link
                              className="w-full"
                              to={`/admin-home/scholarships/${encodeURIComponent(
                                scholarship.scholarshipName
                              )}`}
                            >
                              <Button className=" bg-green-700 hover:bg-green-800">
                                View
                              </Button>
                            </Link>
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
              <CardContent className="space-y-4">
                <div className="flex gap-3 w-full">
                  <div className="space-y-1 w-full">
                    <Label htmlFor="scholarshipName">Scholarship Name</Label>
                    <Input
                      id="scholarshipName"
                      type="text"
                      placeholder="Enter scholarship title"
                      onChange={(e) => {
                        setNewScholarData({...newScholarData, newScholarName:e.target.value})
                      }}
                    />
                  </div>
                  <div className="space-y-1 w-full">
                    <Label htmlFor="applicationDeadline">
                      Application Deadline
                    </Label>
                    <Input id="applicationDeadline" type="date" onChange={(e) => {
                        setNewScholarData({...newScholarData, newScholarDeadline:e.target.value})
                      }}/>
                  </div>
                </div>
                <div className="flex gap-3 w-full">
                  <div className="space-y-1 w-full">
                    <Label htmlFor="sponsorImage">Sponsor Logo/Image</Label>
                    <Input
                      id="sponsorImage"
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif, .webp, .bmp, .svg"
                      onChange={(e) => {
                        setNewScholarData({...newScholarData, newScholarSponsorLogo:e.target.files[0]})
                      }}
                    />
                  </div>
                  <div className="space-y-1 w-full">
                    <Label htmlFor="scholarshipCover">
                      Cover Image for Details Page
                    </Label>
                    <Input
                      id="scholarshipCover"
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif, .webp, .bmp, .svg"
                      onChange={(e) => {
                        setNewScholarData({...newScholarData, newScholarCoverImg:e.target.files[0]})
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="scholarshipDescription">
                    Scholarship Description
                  </Label>
                  <Textarea
                    id="scholarshipDescription"
                    placeholder="Provide an overview of the scholarship, eligibility, and other key information"
                    onChange={(e) => {
                      setNewScholarData({...newScholarData, newScholarDescription:e.target.value})
                    }}
                  />
                </div>
                {requirements.map((req, index) => (
                  <div className=" flex gap-3 w-full" key={index}>
                    <div className="flex flex-col   w-full">
                      <label
                        htmlFor={`docLabel-${index}`}
                        className="text-sm font-medium"
                      >
                        Document Label
                      </label>
                      <Input
                        id={`docLabel-${index}`}
                        type="text"
                        placeholder="e.g., Transcript of Records"
                        value={req.label}
                        onChange={(e) =>
                          handleChange(index, "label", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col  w-full">
                      <label
                        htmlFor={`docType-${index}`}
                        className="text-sm font-medium"
                      >
                        Document Type
                      </label>
                      <Input
                        id={`docType-${index}`}
                        disabled
                        type="file"
                        value={req.type}
                        onChange={(e) =>
                          handleChange(index, "type", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}

                <div className="w-full flex justify-end">
                  <Button onClick={handleAddRequirement}>
                    Add More Requirements
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddScholarship}>Add Scholarship</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

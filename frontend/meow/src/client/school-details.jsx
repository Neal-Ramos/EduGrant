import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Notification from "./breadcrumbs-widget";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ScholarshipDetail() {
  const { id } = useParams();
  const [scholarDetails, setScholarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchScholarDetails() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/scho.json");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const scholar = data.scholars.find((s) => s.name === id);

        if (!scholar) {
          throw new Error("Scholarship not found");
        }

        setScholarDetails(scholar);
      } catch (err) {
        setError(err.message);
        setScholarDetails(null);
      } finally {
        setLoading(false);
      }
    }

    fetchScholarDetails();
  }, [id]);
  const [documents, setDocuments] = useState([{ name: "", file: null }]);
  const handleAddDocument = () => {
    setDocuments([...documents, { name: "", file: null }]);
  };
  const handleDocChange = (index, key, value) => {
    const updatedDocs = [...documents];
    updatedDocs[index][key] = value;
    setDocuments(updatedDocs);
  };

  function BirthdaySelect() {
    const currentYear = new Date().getFullYear();

    const months = useMemo(
      () => Array.from({ length: 12 }, (_, index) => index + 1),
      []
    );

    const years = useMemo(
      () =>
        Array.from(
          { length: currentYear - 1900 + 1 },
          (_, index) => currentYear - index
        ),
      [currentYear]
    );

    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");

    // Generate days based on the selected month
    const daysInMonth = useMemo(() => {
      if (!month) return [];
      const daysInMonthMap = {
        1: 31,
        2:
          currentYear % 4 === 0 &&
          (currentYear % 100 !== 0 || currentYear % 400 === 0)
            ? 29
            : 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31,
      };
      const days = Array.from(
        { length: daysInMonthMap[month] },
        (_, index) => index + 1
      );
      return days;
    }, [month, currentYear]);

    return (
      <div className="w-full space-y-2">
        <Label htmlFor="birthday">Birthday</Label>
        <div className="flex gap-1">
          {/* Month Select */}
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date Select */}
          <Select value={day} onValueChange={setDay}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              {daysInMonth.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year Select */}
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  const [address, setAddress] = useState([]);

  useEffect(() => {
    async function fetchAddress() {
      try {
        const response = await fetch("/setAddress.json");
        if (!response.ok) {
          throw new Error("Failed to fetch address");
        }
        const data = await response.json();
        setAddress(data.cities_and_municipalities);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }

    fetchAddress();
  }, []);

  console.log(address);

  return (
    <>
      <header className="flex bg-green-800 h-16 items-center justify-between px-5 text-white border-b shadow-sm">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Navigation</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Scholarships
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {scholarDetails?.name || "Loading..."}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Notification />
      </header>

      <div className="flex items-center justify-center p-5">
        <Tabs defaultValue="details" className="w-3/4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Scholarship Details</TabsTrigger>
            <TabsTrigger value="form">Scholarship Form</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            {loading ? (
              <p className="text-center mt-10">Loading details...</p>
            ) : error ? (
              <p className="text-center mt-10 text-red-500">Error: {error}</p>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle> {scholarDetails.name}</CardTitle>
                  <CardDescription>{scholarDetails.details}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 flex items-center justify-center">
                  <img
                    src={scholarDetails.requireImage}
                    alt={scholarDetails.name}
                    className="h-1/2 w-w-1/2 object-contain rounded-md shadow-lg"
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Download Form</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle>Scholarship Form</CardTitle>
                <CardDescription>
                  Enter your information to apply scholarship
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex w-full gap-2">
                  <div className="w-full space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" type="text" />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="middleName">Middle name</Label>
                    <Input id="middleName" type="text" />
                  </div>
                </div>
                <div className="flex w-full gap-2">
                  <div className="w-full space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" type="text" />
                  </div>
                  <div
                    className="w-full space-y-2 flex justify-center
                  items-center gap-4 mt-6"
                  >
                    <RadioGroup
                      defaultValue="option-one"
                      className="flex w-full justify-around"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ip" id="ip" />
                        <Label htmlFor="ip">Indigenous People</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pwd" id="pwd" />
                        <Label htmlFor="pwd">PWD</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="flex w-full gap-2 mt-3">
                  <div className="w-full space-y-2">
                    <Label htmlFor="lastName">Sex</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="bulacan">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <BirthdaySelect />
                  <div className="w-full space-y-2">
                    <Label htmlFor="lastName">Contact</Label>
                    <Input id="lastName" type="text" />
                  </div>
                </div>
                <div className="flex w-full gap-2 mt-3">
                  <div className="w-full space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bulacan">Bulacan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="municipality">Municipality</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Municipality" />
                      </SelectTrigger>
                      <SelectContent>
                        {address.map((meow, index) => (
                          <SelectItem key={index} value="bulacan">
                            {meow}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex w-full gap-2 mt-3">
                  <div className="w-full space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input id="course" type="text" />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="text" />
                  </div>
                  <div className="w-full space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Input id="section" type="text" />
                  </div>
                </div>
              </CardContent>

              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Upload the required documents</CardDescription>

                <div className="mt-3 flex flex-col gap-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <Label>Document Name</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Document Name"
                          value={doc.name}
                          onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                          }
                        />
                        <Input
                          type="file"
                          onChange={(e) =>
                            handleChange(index, "file", e.target.files[0])
                          }
                        />
                        <Button type="button">Submit</Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" onClick={handleAddDocument}>
                    + Add More
                  </Button>
                </div>
              </CardHeader>
              <CardFooter>
                <Button>Apply Now</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

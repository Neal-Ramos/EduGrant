import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Notification from "./notif";
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

// ...imports remain unchanged

export default function ScholarshipDetail() {
  const { id } = useParams();
  const [scholarDetails, setScholarDetails] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    studentId: "",
    yearsection: "",
  });

  const [documents, setDocuments] = useState([{ label: "", file: null }]);
  const [submitStatus, setSubmitStatus] = useState(null); // success | error | null

  useEffect(() => {
    async function fetchScholarDetails() {
      const response = await fetch("/scho.json");
      const data = await response.json();
      const scholar = data.scholars.find((s) => s.name === id);
      setScholarDetails(scholar);
    }

    fetchScholarDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.firstName && formData.lastName && formData.studentId) {
      setSubmitStatus("success");
    } else {
      setSubmitStatus("error");
    }
  };

  if (!scholarDetails)
    return <p className="text-center mt-10">Loading details...</p>;

  return (
    <div className="h-screen">
      <header className="flex bg-green-800 h-16 items-center justify-between px-5 text-white border-b shadow-sm">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">General</BreadcrumbLink>
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
                  {scholarDetails.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Notification />
      </header>

      <div className="max-w-5xl mx-auto p-6 bg-zinc-200 shadow-md dark:bg-zinc-900 rounded-2xl mt-10 shadow-md space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          {scholarDetails.name}
        </h1>

        <img
          src={scholarDetails.requireImage}
          alt={scholarDetails.name}
          className="w-full max-h-[300px] object-contain rounded-lg border border-gray-200 dark:border-zinc-700 shadow"
        />

        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {scholarDetails.details}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition">
                Apply Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-gray-800 dark:text-white">
                  Apply for {scholarDetails.name}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-4">
                <Input
                  name="studentId"
                  placeholder="Student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                />
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Input
                  name="middleName"
                  placeholder="Middle Name"
                  value={formData.middleName}
                  onChange={handleChange}
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <Input
                  name="yearsection"
                  placeholder="Year&Section"
                  value={formData.yearsection}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-3 mt-4">
                <label className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                  Supporting Documents
                </label>
                {documents.map((doc, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      type="text"
                      placeholder="Document Label"
                      value={doc.label}
                      onChange={(e) => {
                        const updatedDocs = [...documents];
                        updatedDocs[index].label = e.target.value;
                        setDocuments(updatedDocs);
                      }}
                    />
                    <Input
                      type="file"
                      onChange={(e) => {
                        const updatedDocs = [...documents];
                        updatedDocs[index].file = e.target.files[0];
                        setDocuments(updatedDocs);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setDocuments(documents.filter((_, i) => i !== index))
                      }
                      className="text-red-500"
                    >
                      ❌
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() =>
                    setDocuments([...documents, { label: "", file: null }])
                  }
                >
                  ➕ Add Document
                </Button>
              </div>

              <DialogFooter className="mt-4">
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Submit Application
                </Button>
              </DialogFooter>

              {submitStatus === "success" && (
                <p className="text-green-600 text-sm mt-3 text-center animate-pulse">
                  ✅ Application submitted successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 text-sm mt-3 text-center">
                  ⚠️ Please complete all required fields.
                </p>
              )}
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={() => alert("Download your application form.")}
            className="hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            📥 Download Application Form
          </Button>
        </div>
      </div>
    </div>
  );
}

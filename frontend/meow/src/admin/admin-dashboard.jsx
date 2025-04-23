import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../components/ui/sidebar";
import { useEffect, useState } from "react";
import { CheckCheck, GraduationCap, Layers, Timer, X } from "lucide-react";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [scholar, setScholar] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/students.json");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to load student data:", error);
      }
    };

    fetchStudents();
  }, []);
  useEffect(() => {
    const fetchScholar = async () => {
      try {
        const response = await fetch("/meow.json");
        const data = await response.json();
        setScholar(data);
      } catch (error) {
        console.error("Failed to load student data:", error);
      }
    };

    fetchScholar();
  }, []);

  const approvedCount = students.filter(
    (student) => student.scholarshipStatus === "Approved"
  ).length;
  const pendingCount = students.filter(
    (student) => student.scholarshipStatus === "Pending"
  ).length;
  const rejectedCount = students.filter(
    (student) => student.scholarshipStatus === "Rejected"
  ).length;
  return (
    <>
      <header className="flex bg-green-800 h-16 items-center justify-between px-5 text-white border-b shadow-sm">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Application Management</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid grid-cols-4 text-center p-2 text-left zxc gap-5 tracking-[-2px]">
          <span className="p-3 bg-blue-100 rounded-md flex items-center gap-3">
            <span className="bg-blue-300 p-3 rounded-md">
              <Layers size={44} absoluteStrokeWidth />
            </span>
            <span>
              <p> TOTAL</p>
              <p className="text-5xl">{students.length}</p>
            </span>
          </span>
          <span className="p-3  bg-green-200 rounded-md flex items-center gap-3">
            <span className="bg-green-400 p-3 rounded-md">
              <CheckCheck size={44} absoluteStrokeWidth />
            </span>
            <span>
              <p>APPROVED</p>
              <p className="text-5xl">{approvedCount}</p>
            </span>
          </span>

          <span className="p-3  bg-amber-200 rounded-md flex items-center gap-3">
            <span className="bg-amber-400 p-3 rounded-md">
              <Timer size={44} absoluteStrokeWidth />
            </span>
            <span>
              <p>PENDING</p>
              <p className="text-5xl">{pendingCount}</p>
            </span>
          </span>
          <span className="p-3  bg-purple-200 rounded-md flex items-center gap-3">
            <span className="bg-purple-400 p-3 rounded-md">
              <GraduationCap size={44} absoluteStrokeWidth />
            </span>
            <span>
              <p>ACTIVE SCHOLAR</p>
              <p className="text-5xl"> {scholar.length}</p>
            </span>
          </span>
        </div>
      </div>

      
    </>
  );
}

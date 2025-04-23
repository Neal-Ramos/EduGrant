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
import { Loader2 } from "lucide-react";
import Notification from "./notif";
import { Link } from "react-router-dom";

const tabs = [
  "All",
  "Pending",
  "Reviewing Requirements",
  "Approved",
  "Rejected",
  "Missing Requirements",
];

export default function ClientApplication() {
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [adminComments, setAdminComments] = useState({});

  useEffect(() => {
    async function fetchScholarship() {
      const response = await fetch("/info.json");
      const data = await response.json();
      setStudent(data); // Your JSON is a single student object, not an array
      setLoading(false);
    }
    fetchScholarship();
  }, []);

  const filterScholarships = (applications) => {
    if (activeTab === "All") return applications;
    if (activeTab === "Reviewing Requirements")
      return applications.filter((app) => app.reviewingRequirements);
    if (activeTab === "Missing Requirements")
      return applications.filter((app) => app.missingRequirements);
    return applications.filter(
      (app) => app.status.toLowerCase() === activeTab.toLowerCase()
    );
  };

  return (
    <>
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
                  My Applications
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Notification />
      </header>

      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition duration-200 ${
                activeTab === tab
                  ? "bg-green-600 text-white shadow"
                  : "bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
            <span className="ml-2 text-gray-500">Loading scholarships...</span>
          </div>
        ) : !student ? (
          <p className="text-center text-gray-500">No student data found.</p>
        ) : filterScholarships(student.applications).length === 0 ? (
          <p className="text-center text-gray-500">
            No scholarships found for this status.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterScholarships(student.applications).map((app) => (
              <div
                key={app.application_id}
                className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-sm p-5 transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-green-600 truncate">
                  {app.scholarship_details.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  <strong>Application Date:</strong> {app.submission_date}
                </p>
                <p className="text-sm mt-1">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </p>
                {app.missingRequirements && (
                  <div className="mt-4 space-y-2">
                    <input
                      type="text"
                      placeholder="Admin comments..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={adminComments[app.application_id] || ""}
                      onChange={(e) =>
                        setAdminComments({
                          ...adminComments,
                          [app.application_id]: e.target.value,
                        })
                      }
                    />
                    <Link
                      to={`/home/scholarship/${encodeURIComponent(
                        app.scholarship_details.name
                      )}`}
                    >
                      <button className="w-full px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">
                        Apply Again
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

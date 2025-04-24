import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { SidebarTrigger } from "../components/ui/sidebar";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Notification from "./notif";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      setStudent(data);
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                Navigation
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex flex-wrap gap-2 justify-start">
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab} value={tab}>
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                  <span className="ml-2 text-gray-500 mt-5">
                    Loading scholarships...
                  </span>
                </div>
              ) : !student ? (
                <p className="text-center text-gray-500 mt-5">
                  No student data found.
                </p>
              ) : filterScholarships(student.applications).length === 0 ? (
                <p className="text-center text-gray-500 mt-5">
                  No scholarships found for this status.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                  {filterScholarships(student.applications).map((app) => (
                    <Card key={app.application_id}>
                      <CardHeader>
                        <CardTitle className="text-green-600 truncate">
                          {app.scholarship_details.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          <strong>Application Date:</strong>{" "}
                          {app.submission_date}
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}

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
import { Link } from "react-router-dom";
import Notification from "./notif";
export default function ClientScholarship() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function fetchScholarship() {
      const response = await fetch("/scho.json");
      const data = await response.json();
      setStudent(data);
    }
    fetchScholarship();
  }, []);

  return (
    <>
      <header className="w-full flex bg-green-800 h-16 items-center justify-between px-5 text-white border-b shadow-sm">
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
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Notification />
      </header>

      <main className="w-full px-6 py-10 min-h-screen">
        <section className="mb-10">
          <h1 className="text-4xl font-bold text-zinc-800 mb-2">
            Available Scholarships
          </h1>
          <p className="text-gray-600 max-w-2xl text-base">
            Explore and apply to scholarship programs. Click a card to view full
            details, requirements, and application procedures.
          </p>
        </section>

        {student ? (
          student.scholars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {student.scholars.map((scholar) => (
                <Link
                  to={`/home/scholarship/${encodeURIComponent(scholar.name)}`}
                  key={scholar.name}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200"
                >
                  <div className="overflow-hidden">
                    <img
                      src={scholar.image}
                      alt={scholar.name}
                      className="w-full h-52 object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                      {scholar.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Tap to view more info
                    </p>
                  </div>

                  {/* Optional Tag */}
                  <div className="absolute top-3 right-3 bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full shadow-sm">
                    Open
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No scholarships available at the moment.
            </p>
          )
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Loading scholarships...
          </p>
        )}
      </main>
    </>
  );
}

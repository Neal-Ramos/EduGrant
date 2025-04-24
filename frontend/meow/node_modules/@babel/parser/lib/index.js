import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../components/ui/sidebar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
export default function Application() {
  const [student, setStudent] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredText = student.filter((item) => {
    const scholarshipsMatch = item.scholarships.some((scholarship) =>
      scholarship.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toString().toLowerCase().includes(search.toLowerCase()) ||
      scholarshipsMatch
    );
  });
  // const filteredText = student.filter((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase())
  // );

  useEffect(() => {
    async function fetchStudent() {
      const response = await fetch("/applicant.json");
      const data = await response.json();
      setStudent(data);
    }
    fetchStudent();
  }, []);

  function handleViewClick(item) {
    setSelectedStudent(item);
    setIsModalOpen(true);
  }
  const [missingDocs, setMissingDocs] = useState({});

  const handleSendMissingDocs = (index) => {
    const docNote = missingDocs[index]?.text;
    if (docNote?.trim()) {
      alert(
        `Missing docs for "${selectedStudent.scholarships[index].name}": ${docNote}`
      );
      setMissingDocs((prev) => ({
        ...prev,
        [index]: { show: false, text: "" },
      }));
    } else {
      alert("Please enter a message about the missing document(s).");
    }
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
                <BreadcrumbLink href="#">Application Management</BreadcrumbLink>
              </BreadcrumbItem>
              Management
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Application
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 overflow-x ">
        <div>
          <input
            type="text"
            value={search}
            onChange={(textInput) => setSearch(textInput.target.value)}
            placeholder="Search by ID, name or scholarship ..."
            className="p-2 border rounded w-full bg-white"
          />
        </div>
        {student.length === 0 ? (
          <p>No Students Found</p>
        ) : (
          <div>
            <div className="grid grid-cols-5 p-3 font-semibold text-sm border-b bg-green-700 text-white sticky top-0 z-10">
              <span>Student ID</span>
              <span>Name</span>
              <span>Year & Section</span>
              <span>Applied Program</span>

              <span className="text-center">Action</span>
            </div>

            <List
              height={497}
              width="100%"
              itemCount={filteredText.length}
              itemSize={100}
            >
              {({ index, style }) => {
                const item = filteredText[index];

                return (
                  <div
                    style={style}
                    key={index}
                    className="grid grid-cols-5 px-3 py-2 text-sm border-b hover:bg-muted transition-colors bg-background"
                  >
                    <span className="flex items-center truncate">
                      {item.id}
                    </span>
                    <span className="flex items-center truncate">
                      {item.name}
                    </span>
                    <span className="flex gap-1 items-center truncate">
                      <p>{item.course}</p>
                      <p>{item.yearSection}</p>
                    </span>
                    <span className="flex  flex-col justify-center items-start">
                      {item.scholarships.map((meow, idx) => (
                        <div key={idx}>
                          <p> {meow.name}</p>
                        </div>
                      ))}
                    </span>

                    <span
                      className="flex items-center justify-center text-green-700 hover:underline cursor-pointer"
                      onClick={() => handleViewClick(item)}
                    >
                      View
                    </span>
                  </div>
                );
              }}
            </List>
          </div>
        )}
      </div>

      {isModalOpen && selectedStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white max-w-4xl w-full p-6 sm:p-10 rounded-2xl shadow-xl  max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {selectedStudent.name}'s Profile
            </h2>

            <div className="flex flex-col gap-8">
              {/* Profile Info */}
              <div className="flex items-center gap-8">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt="Profile"
                  className="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover border border-gray-300 shadow-sm"
                />
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-gray-500 text-sm">Student Name</p>
                    <p className="font-medium text-base">
                      {selectedStudent.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Course</p>
                    <p className="font-medium text-base">
                      {selectedStudent.course}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scholarships Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Scholarships
                </h3>

                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {selectedStudent.scholarships.length > 0 ? (
                    selectedStudent.scholarships.map((scholarship, index) => {
                      const isMissing = missingDocs[index]?.show || false;

                      return (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <p className="font-medium text-sm text-gray-800">
                              {scholarship.name}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Button className="bg-green-600 text-white hover:bg-green-700 text-xs">
                                Approve
                              </Button>
                              <Button className="bg-red-600 text-white hover:bg-red-700 text-xs">
                                Reject
                              </Button>
                              <Button
                                className="bg-yellow-500 text-white hover:bg-yellow-600 text-xs"
                                onClick={() =>
                                  setMissingDocs((prev) => ({
                                    ...prev,
                                    [index]: {
                                      show: true,
                                      text: prev[index]?.text || "",
                                    },
                                  }))
                                }
                              >
                                Mark as Missing Documents
                              </Button>
                            </div>
                          </div>

                          {/* Documents */}
                          <div className="mt-3">
                            <p className="text-gray-500 text-sm mb-1">
                              Submitted Documents:
                            </p>
                            {scholarship.documents?.length > 0 ? (
                              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                                {scholarship.documents.map((doc, docIndex) => (
                                  <li key={docIndex}>
                                    <a
                                      href={doc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-green-700 hover:underline"
                                    >
                                      {doc.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="italic text-sm text-gray-400">
                                No documents submitted.
                              </p>
                            )}
                          </div>

                          {/* Missing Docs Input */}
                          {isMissing && (
                            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                              <input
                                type="text"
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Specify missing document(s)..."
                                value={missingDocs[index]?.text || ""}
                                onChange={(e) =>
                                  setMissingDocs((prev) => ({
                                    ...prev,
                                    [index]: {
                                      ...prev[index],
                                      text: e.target.value,
                                    },
                                  }))
                                }
                              />
                              <Button
                                className="bg-green-600 text-white text-sm px-5 py-2 rounded-md hover:bg-green-700"
                                onClick={() => handleSendMissingDocs(index)}
                              >
                                Send
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No scholarships found.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

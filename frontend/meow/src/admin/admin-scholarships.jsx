import { useState, useEffect } from "react";
import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Button } from "../components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { FixedSizeList as List } from "react-window";
import { Input } from "@/components/ui/input";
import { Label } from "../components/ui/label";

export default function Scholarships() {
  const [scholar, setScholar] = useState([]);
  const [filteredScholar, setFilteredScholar] = useState([]);
  const [selectedScholar, setSelectedScholar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview to the file's data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  useEffect(() => {
    async function fetchScholar() {
      const response = await fetch("/meow.json");
      const data = await response.json();
      setScholar(data);
    }
    fetchScholar();
  }, []);

  useEffect(() => {
    const filtered = scholar.filter((s) =>
      s.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredScholar(filtered);
  }, [filterText, scholar]);

  function handleViewClick(item) {
    setSelectedScholar(item);
    setIsModalOpen(true);
  }

  // Step 1: State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editableScholar, setEditableScholar] = useState(selectedScholar);

  // Step 2: Handle Edit/Save button
  const handleEditSave = () => {
    if (isEditing) {
      // Save changes (you can add logic to save the changes here, e.g., API call)
      console.log("Saving changes:", editableScholar);
    }
    setIsEditing(!isEditing); // Toggle between edit and view mode
  };

  useEffect(() => {
    setEditableScholar(selectedScholar); // Reset editableScholar when selectedScholar changes
  }, [selectedScholar]);

  return (
    <>
      <header className="flex bg-green-800 h-16 items-center justify-between px-5 text-white border-b shadow-sm">
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
                  Scholarships
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <Button className="bg-green-700" onClick={() => setIsAddOpen(true)}>
            Add Scholarships
          </Button>
          <input
            type="text"
            placeholder="Search scholarship..."
            className="border px-3 py-2 rounded-md w-full md:w-1/3 bg-white"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-2 p-3 font-semibold text-sm border-b bg-green-700 text-white dark:bg-zinc-800 sticky top-0 z-10">
            <div>Name</div>
            <div></div>
          </div>
          {filteredScholar.length === 0 ? (
            <p className="text-center p-3">No scholarships found.</p>
          ) : (
            <div className="min-w-full text-left border overflow-hidden">
              <List
                height={490}
                itemCount={filteredScholar.length}
                itemSize={60}
                width="100%"
              >
                {({ index, style }) => {
                  const item = filteredScholar[index];
                  return (
                    <div
                      style={style}
                      key={index}
                      className="grid grid-cols-2 px-3 py-2 text-sm border-b hover:bg-muted transition-colors bg-white"
                    >
                      <span className="flex items-center truncate">
                        {item.name}
                      </span>
                      <span
                        className="flex items-center justify-center text-green-600 hover:underline cursor-pointer"
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
      </div>

      {isModalOpen && selectedScholar && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-primary">
                {selectedScholar.name}
              </DialogTitle>
              <DialogDescription>
                Scholarship Details Overview
              </DialogDescription>
            </DialogHeader>

            {/* Scholarship Image */}
            {selectedScholar.banner ? (
              <div className="mt-4">
                <img
                  src={selectedScholar.banner}
                  alt="Scholarship Banner"
                  className="w-48 h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            ) : (
              <div className="mt-4 text-center text-gray-500">
                No image available
              </div>
            )}

            {/* Image Upload (visible in edit mode) */}
            {isEditing && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-muted-foreground">
                  Upload New Image
                </label>
                <input
                  type="file"
                  className="mt-1 block w-full text-sm text-gray-500"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            )}

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex">
                <span className="w-40 font-medium text-muted-foreground">
                  Details:
                </span>
                {isEditing ? (
                  <textarea
                    className="w-full text-foreground border p-2 rounded h-45"
                    value={editableScholar.details}
                    onChange={(e) =>
                      setEditableScholar({
                        ...editableScholar,
                        details: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span className="text-foreground">
                    {selectedScholar.details}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="bg-green-700" onClick={handleEditSave}>
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {isAddOpen && (
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Scholarship</DialogTitle>
              <DialogDescription>
                Enter the scholarship name, details, and upload a banner image.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col mt-3 gap-4">
              <div>
                <Label className="mb-1" htmlFor="scholarship-name">
                  Scholarship Name
                </Label>
                <Input id="scholarship-name" className="rounded-none" />
              </div>

              <div>
                <Label className="mb-1" htmlFor="scholarship-details">
                  Details
                </Label>
                <textarea
                  id="scholarship-details"
                  className="w-full h-32 border px-3 py-2 rounded-none resize-none bg-background text-foreground"
                  placeholder="Enter scholarship details..."
                ></textarea>
              </div>

              <div>
                <Label className="mb-1" htmlFor="scholarship-banner">
                  Scholarship Banner
                </Label>
                <Input
                  type="file"
                  id="scholarship-banner"
                  accept="image/*"
                  className="rounded-none"
                  onChange={handleImageChange}
                />
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Banner Preview"
                    className="w-full h-28 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}

              <div className="text-right">
                <Button className="mt-4">Submit</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

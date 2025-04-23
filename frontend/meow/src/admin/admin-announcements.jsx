import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Separator } from "@radix-ui/react-separator";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    date: "",
    content: "",
    banner: "",
  });

  function handleAddAnnouncement(e) {
    e.preventDefault();
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    setNewAnnouncement({ title: "", date: "", content: "", banner: "" });
    setIsAddModalOpen(false);
  }

  useEffect(() => {
    async function fetchAnnouncements() {
      const response = await fetch("/announcements.json");
      const data = await response.json();

      // This will correctly extract the announcements array
      setAnnouncements(data.announcements || []);
    }
    fetchAnnouncements();
  }, []);

  function handleViewClick(item) {
    setSelectedAnnouncement(item);
    setIsModalOpen(true);
  }
  function handleDeleteAnnouncement() {
    setAnnouncements((prev) => prev.filter((a) => a !== selectedAnnouncement));
    setIsModalOpen(false);
    setSelectedAnnouncement(null);
  }
  // Inside your component (below announcements states)
  const [slides, setSlides] = useState([]);
  const [isAddSlideModalOpen, setIsAddSlideModalOpen] = useState(false);
  const [newSlide, setNewSlide] = useState({
    title: "",
    image: "",
  });

  // Add Slide Handler
  function handleAddSlide(e) {
    e.preventDefault();
    setSlides((prev) => [newSlide, ...prev]);
    setNewSlide({ title: "", image: "" });
    setIsAddSlideModalOpen(false);
  }

  // Delete Slide Handler
  function handleDeleteSlide(indexToDelete) {
    setSlides((prev) => prev.filter((_, i) => i !== indexToDelete));
  }

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
                  Announcements
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-col gap-4 p-4">
        <div className="text-lg font-bold mb-2">Scholar Announcements</div>
        <Button
          className="self-start px-4 py-2 bg-green-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add Announcement
        </Button>

        {announcements.length === 0 ? (
          <p className="text-center p-3">No announcements available.</p>
        ) : (
          <div className="space-y-4">
            {announcements.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-white dark:bg-zinc-800 shadow hover:shadow-md cursor-pointer transition-all"
                onClick={() => handleViewClick(item)}
              >
                <div className="text-lg font-semibold">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedAnnouncement && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>{selectedAnnouncement.title}</DialogTitle>
            </DialogHeader>

            {selectedAnnouncement.banner && (
              <img
                src={selectedAnnouncement.banner}
                alt="Announcement Banner"
                className="w-full h-60 object-cover rounded-lg my-4"
              />
            )}

            <div className="text-sm text-foreground whitespace-pre-wrap">
              {selectedAnnouncement.content}
            </div>

            <div className="text-xs text-muted-foreground mt-4">
              Posted on: {selectedAnnouncement.date}
            </div>
            <Button
              variant="destructive"
              onClick={handleDeleteAnnouncement}
              className="mt-4 "
            >
              Delete Announcement
            </Button>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Add New Announcement</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAnnouncement} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full border p-2 rounded"
              value={newAnnouncement.title}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  title: e.target.value,
                })
              }
              required
            />
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={newAnnouncement.date}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, date: e.target.value })
              }
              required
            />
            <input
              type="url"
              placeholder="Banner Image URL (optional)"
              className="w-full border p-2 rounded"
              value={newAnnouncement.banner}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  banner: e.target.value,
                })
              }
            />
            <textarea
              placeholder="Content"
              className="w-full border p-2 rounded"
              rows="5"
              value={newAnnouncement.content}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  content: e.target.value,
                })
              }
              required
            />
            <Button type="submit">Post Announcement</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mt-10 p-4 gap-3">
        <Button
          className=" px-4 py-2 bg-green-700"
          onClick={() => setIsAddSlideModalOpen(true)}
        >
          + Add Slide
        </Button>

        {slides.length === 0 ? (
          <p className="text-center p-3 text-zinc-500">No slides added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="border border-zinc-200 rounded-lg p-4 bg-white shadow"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <div className="font-semibold text-zinc-800">{slide.title}</div>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteSlide(index)}
                  className="mt-2"
                >
                  Delete Slide
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isAddSlideModalOpen} onOpenChange={setIsAddSlideModalOpen}>
        <DialogContent className="max-w-xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-zinc-800">Add New Slide</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSlide} className="space-y-4">
            <input
              type="text"
              placeholder="Slide Title"
              className="w-full border border-zinc-300 p-2 rounded text-zinc-800 placeholder-zinc-400"
              value={newSlide.title}
              onChange={(e) =>
                setNewSlide({ ...newSlide, title: e.target.value })
              }
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              className="w-full border border-zinc-300 p-2 rounded text-zinc-800 placeholder-zinc-400"
              value={newSlide.image}
              onChange={(e) =>
                setNewSlide({ ...newSlide, image: e.target.value })
              }
              required
            />
            <Button className="bg-green-700" type="submit">Add Slide</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { SidebarTrigger } from "../components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function Application() {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    async function fetchStudent() {
      const response = await fetch("/applicant.json");
      const data = await response.json();
      setStudent(data);
    }
    fetchStudent();
  }, []);
  console.log(student);
  const [open, setOpen] = useState(false);
  const [activeReject, setActiveReject] = useState(null);
  const toggleText = (id) => {
    setTextVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
                <BreadcrumbLink href="#">Scholarship Management</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Scholarships Applications
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="px-10 py-5 flex gap-3">
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

        <Input type="search" placeholder="Search student name ..." />
      </div>
      <div className="grid grid-cols-4 gap-2 p-3 ">
        {student.map((meow) => (
          <Card key={meow.id} className="w-full ">
            <CardHeader>
              <CardTitle>{meow.name}</CardTitle>
              <CardDescription>{meow.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <h1>Total Application: {meow.scholarships.length}</h1>
            </CardContent>
            <CardFooter className="">
              <Sheet>
                <SheetTrigger className="bg-green-800 px-3 py-2 font-semibold text-sm rounded-md text-white">
                  Review Student
                </SheetTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-md">
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle className="text-center">
                          {meow.name}
                        </SheetTitle>
                        <SheetDescription className="text-center">
                          {meow.email}
                        </SheetDescription>
                      </SheetHeader>

                      <div className="flex gap-3 p-5 justify-center items-center">
                        {meow.scholarships.map((arf) => (
                          <div className="p-3 flex flex-col gap-5">
                            <h1>{arf.name}</h1>
                            <div className="font-semibold">
                              NO DOCUMENTS FOUND ...
                            </div>  
                            <div className="grid grid-cols-3 gap-2">
                              <Button className="w-full">Approved</Button>

                              <Button className="w-full">Missing</Button>
                              <Button
                                onClick={() =>
                                  setActiveReject(`${meow.id}-${arf.name}`)
                                }
                                variant="destructive"
                                className="w-full"
                              >
                                Reject
                              </Button>
                            </div>
                            {activeReject === `${meow.id}-${arf.name}` && (
                              <div className="space-y-2">
                                <Textarea placeholder="Enter your message here ..." />
                                <div className="flex justify-end">
                                  <Button>Send</Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </SheetContent>
                  </div>
                </DrawerContent>
              </Sheet>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

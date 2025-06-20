"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import morty from "@/assets/image.png";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  Send,
  Check,
  ChevronsUpDown,
  Search,
  Clock,
  FileText,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";

const sortOptions = [
  {
    value: "deadline",
    label: "Deadline",
  },
  {
    value: "amount-high",
    label: "Amount (High to Low)",
  },
  {
    value: "amount-low",
    label: "Amount (Low to High)",
  },
  {
    value: "name",
    label: "Name (A-Z)",
  },
];

const scholarships = [
  {
    id: 1,
    name: "Academic Excellence Scholarship",
    description:
      "Merit-based scholarship for outstanding academic performance and leadership potential.",
    deadline: "2025-03-15",
    amount: 15000,
    provider: "Bulacan Agricultural State College",
    documents: "3/3",
    daysLeft: 45,
    status: "active",
  },
  {
    id: 2,
    name: "STEM Innovation Grant",
    description:
      "For students in Science, Technology, Engineering, or Mathematics pursuing innovative research.",
    deadline: "2025-04-01",
    amount: 10000,
    provider: "Department of Science and Technology",
    documents: "2/3",
    daysLeft: 62,
    status: "active",
  },
  {
    id: 3,
    name: "Financial Aid for Farmers' Children",
    description:
      "Supporting students from agricultural families to pursue higher education.",
    deadline: "2025-02-20",
    amount: 8000,
    provider: "Department of Agriculture",
    documents: "1/2",
    daysLeft: 22,
    status: "urgent",
  },
];

export default function ClientScholarship() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <header className="flex w-full items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex h-16 shrink-0 items-center gap-5 px-4">
          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Browse Scholarships</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mr-4">
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Explore Available Scholarships
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover scholarship opportunities tailored to your academic goals.
            Browse, filter, and apply for financial aid that supports your
            education.
          </p>
        </div>

        {/* Search and Sort Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full sm:w-[200px] justify-between"
              >
                {sortBy
                  ? sortOptions.find((option) => option.value === sortBy)?.label
                  : "Sort by..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search sort options..." />
                <CommandList>
                  <CommandEmpty>No sort option found.</CommandEmpty>
                  <CommandGroup>
                    {sortOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          setSortBy(
                            currentValue === sortBy ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            sortBy === option.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-6">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-68 w-full h-48 md:h-auto flex-shrink-0 bg-muted">
                  <img
                    src={morty.src}
                    alt={`${scholarship.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between p-6 w-full">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">
                          {scholarship.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          by {scholarship.provider}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <Clock className="h-4 w-4" />
                          {scholarship.daysLeft} days left
                        </div>
                        <Badge
                          variant={
                            scholarship.status === "urgent"
                              ? "destructive"
                              : "secondary"
                          }
                          className={cn(
                            "uppercase",
                            scholarship.status === "active" &&
                              "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          )}
                        >
                          {scholarship.status === "urgent"
                            ? "URGENT"
                            : "ACTIVE"}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {scholarship.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        Amount
                      </span>
                      <div className="text-lg font-bold text-green-600 mt-1">
                        ₱{scholarship.amount.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        Required Documents
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {scholarship.documents}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-end  md:justify-end">
                      <Link href={`/home/scholarships/${scholarship.id}/form`}>
                        <Button size="sm" className="gap-2">
                          <Send className="h-4 w-4" />
                          Apply Now
                        </Button>
                      </Link>
                      <Link href={`/home/scholarships/${scholarship.id}`}>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Info className="h-4 w-4" />
                          More Info
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Scholarships
          </Button>
        </div>
      </div>
    </div>
  );
}

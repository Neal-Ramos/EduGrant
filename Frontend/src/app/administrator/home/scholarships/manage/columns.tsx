// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ColumnDef } from "@tanstack/react-table";
// import { ArrowUpDown } from "lucide-react";
// export type Scholarship = {
//   id: string;
//   title: string;
//   provider: string;
//   type: string;
//   status: "active" | "closed" | "upcoming";
//   region: string;
//   deadline: string;
// };

// export const columns: ColumnDef<Scholarship>[] = [
//   {
//     accessorKey: "title",
//     header: ({ column }) => {
//       return (
//         <Button
//           className="lg:text-lg"
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Scholarship Title
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => (
//       <span className="underline">{row.getValue("title")}</span>
//     ),
//   },

//   {
//     accessorKey: "provider",
//     header: "Provider",
//   },

//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status = row.getValue("status") as string;

//       const statusColorMap: Record<string, string> = {
//         active: "bg-green-900 text-foreground",
//         closed: "bg-red-900 text-foreground",
//         upcoming: "bg-yellow-100 text-yellow-800",
//       };

//       return (
//         <Badge
//           className={statusColorMap[status] || "bg-gray-100 text-gray-800"}
//         >
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: "deadline",
//     header: ({ column }) => {
//       return (
//         <Button
//           className="lg:text-lg"
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Deadline
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },
// ];

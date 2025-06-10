// "use client";

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   ColumnFiltersState,
//   getFilteredRowModel,
//   VisibilityState,
//   getPaginationRowModel,
//   SortingState,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import Link from "next/link";
// import SpotlightBorderWrapper from "@/components/ui/border";
// import { Ring } from "ldrs/react";
// import "ldrs/react/Ring.css";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Filter, Grid2x2Check } from "lucide-react";

// interface DataTableProps<TData extends { id: string }, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   loading?: boolean;
// }

// export function DataTable<TData extends { id: string }, TValue>({
//   columns,
//   data,
//   loading = false,
// }: DataTableProps<TData, TValue>) {
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const table = useReactTable({
//     data,
//     columns,

//     getCoreRowModel: getCoreRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     state: {
//       columnFilters,
//       columnVisibility,
//       sorting,
//     },
//   });

//   return (
//     <>
//       <div className="flex items-center py-4 gap-3">
//         <div className="flex items-center justify-between w-full ">
//           <SpotlightBorderWrapper className="flex-1 max-w-md">
//             <div className="flex relative">
//               <Input
//                 placeholder="Filter scholarships..."
//                 value={
//                   (table.getColumn("title")?.getFilterValue() as string) ?? ""
//                 }
//                 onChange={(event) =>
//                   table.getColumn("title")?.setFilterValue(event.target.value)
//                 }
//               />
//               <Button className="absolute right-1" variant="ghost">
//                 <Filter />
//               </Button>
//             </div>
//           </SpotlightBorderWrapper>
//         </div>
//         <SpotlightBorderWrapper>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 <Grid2x2Check /> Columns
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </SpotlightBorderWrapper>
//       </div>
//       <div className="rounded-md border overflow-hidden ">
//         <SpotlightBorderWrapper>
//           <Table>
//             <TableHeader className="bg-[var(--eclipse)]">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => {
//                     return (
//                       <TableHead key={header.id}>
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                       </TableHead>
//                     );
//                   })}
//                 </TableRow>
//               ))}
//             </TableHeader>

//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="text-center py-6"
//                   >
//                     <Ring size={40} speed={2} bgOpacity={0} color="yellow" />
//                   </TableCell>
//                 </TableRow>
//               ) : table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow
//                     key={row.id}
//                     data-state={row.getIsSelected() && "selected"}
//                     className="cursor-pointer"
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         <Link
//                           href={`/administrator/home/scholarships/manage/${row.original.id}`}
//                           prefetch={true}
//                         >
//                           {flexRender(
//                             cell.column.columnDef.cell,
//                             cell.getContext()
//                           )}
//                         </Link>
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="h-24 text-center"
//                   >
//                     No results.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </SpotlightBorderWrapper>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </>
//   );
// }

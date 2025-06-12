import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDashboardData from "@/lib/useDashboard";

export default function TableDashboard() {
  const { data, loading } = useDashboardData();
  return (
    <Card className="bg-background/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
        <CardDescription>
          List of students who recently applied for scholarships.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="!text-base !h-12">Invoice</TableHead>
              <TableHead className="!text-base !h-12">Status</TableHead>

              <TableHead className="!text-base text-right !h-10">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((invoice) => (
              <TableRow key={invoice.applicationsApproved}>
                <TableCell className="font-medium">
                  {invoice.scholarshipName}
                </TableCell>
                <TableCell>{invoice.applicationsReceived}</TableCell>
                <TableCell className="text-right">
                  {invoice.applicationsApproved}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

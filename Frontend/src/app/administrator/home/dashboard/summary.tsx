import {
  Activity,
  CheckCheck,
  CloudAlert,
  CloudUpload,
  Plus,
  TrendingUp,
} from "lucide-react";

export default function ApplicationSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="space-y-2 bg-background/40 flex flex-col justify-center px-3 py-3 rounded-xl border shadow-sm">
        <div className="flex justify-between items-start ">
          <span className="border p-2 rounded-md">
            <TrendingUp />
          </span>
          <p className="flex text-xs border p-1 rounded-sm bg-green-800/10 text-blue-600">
            + 100 today
          </p>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-sm text-muted-foreground">Total Application</p>
          <p className="text-3xl font-semibold text-blue-600">500</p>
        </div>
      </div>
      <div className="space-y-2 bg-background/40 flex flex-col justify-center px-3 py-3 rounded-xl border shadow-sm">
        <div className="flex justify-between items-start ">
          <span className="border p-2 rounded-md">
            <CheckCheck />
          </span>
          <p className="flex text-xs border p-1 rounded-sm bg-green-800/10 text-green-600">
            + 100 today
          </p>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-3xl font-semibold text-green-600">500</p>
        </div>
      </div>
      <div className="space-y-2 bg-background/40 flex flex-col justify-center px-3 py-3 rounded-xl border shadow-sm">
        <div className="flex justify-between items-start ">
          <span className="border p-2 rounded-md">
            <CloudUpload />
          </span>
          <p className="flex text-xs border p-1 rounded-sm bg-green-800/10 text-yellow-500">
            + 100 today
          </p>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-sm text-muted-foreground">Submitted</p>
          <p className="text-3xl font-semibold text-yellow-500">500</p>
        </div>
      </div>
      <div className="space-y-2 bg-background/40 flex flex-col justify-center px-3 py-3 rounded-xl border shadow-sm">
        <div className="flex justify-between items-start ">
          <span className="border p-2 rounded-md">
            <Activity />
          </span>
          <p className="flex text-xs border p-1 rounded-sm bg-green-800/10 text-green-600">
            + 1 today
          </p>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-sm text-muted-foreground">Active Scholarships</p>
          <p className="text-3xl font-semibold text-green-600">3</p>
        </div>
      </div>
    </div>
  );
}

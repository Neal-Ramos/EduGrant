import { Activity, CheckCheck, CloudAlert, TrendingUp } from "lucide-react";

const summaryData = [
  {
    title: "Total Applications",
    value: 500,
    icon: <TrendingUp className="h-6 w-6" />,
    color: "blue",
  },
  {
    title: "Submitted",
    value: 500,
    icon: <CloudAlert className="h-6 w-6" />,
    color: "amber",
  },
  {
    title: "Approved",
    value: 500,
    icon: <CheckCheck className="h-6 w-6" />,
    color: "green",
  },
  {
    title: "Active Scholarship",
    value: 500,
    icon: <Activity className="h-6 w-6" />,
    color: "violet",
  },
];

export default function ApplicationSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => (
        <div
          key={index}
          className={`group p-6 rounded-2xl border border-border bg-background/40 backdrop-blur-md shadow-md transition-all duration-300 
            hover:-translate-y-1 hover:shadow-2xl`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl bg-${item.color}-100 dark:bg-${item.color}-900/20 text-${item.color}-900 dark:text-${item.color}-300 shadow-inner`}
            >
              {item.icon}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground">
                {item.title}
              </h4>
              <p
                className={`text-4xl font-bold text-${item.color}-900 dark:text-${item.color}-300`}
              >
                {item.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

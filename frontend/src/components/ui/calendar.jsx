import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  const [startDate, setStartDate] = React.useState(null);

  return (
    <div className={cn("p-3", className)}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showPopperArrow={false}
        dayClassName={(date) => {
          // You can add custom day class names here if needed
          return "";
        }}
        calendarClassName={cn(
          "border rounded-md shadow-md",
          classNames?.calendar || ""
        )}
        {...props}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-center items-center gap-2 mb-2">
            <button
              type="button"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              )}
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-sm font-medium">
              {date.toLocaleString("default", { month: "long", year: "numeric" })}
            </span>
            <button
              type="button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              )}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      />
    </div>
  );
}

export { Calendar };

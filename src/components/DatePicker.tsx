"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import * as React from "react";

interface DatePickerProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  today?: boolean;
  placeholder?: string | undefined;
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  setDate,
  today,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2 items-center flex-0">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {today && (
        <Button
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            date && "text-muted-foreground"
          )}
          onClick={() => setDate(new Date())}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>Today</span>
        </Button>
      )}
    </div>
  );
};

export default DatePicker;

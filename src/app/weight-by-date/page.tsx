"use client";

import DatePicker from "@/components/DatePicker";
import { calculateTimeBetweenDates } from "@/lib/dateCalculations";
import * as React from "react";

const WeightByDate = () => {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [differenceInDates, setDifferenceInDates] = React.useState<{
    days: number;
    weeks: number;
    months: number;
  }>();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (startDate && endDate) {
      if (startDate < endDate) {
        setError(false);
        setDifferenceInDates(calculateTimeBetweenDates(startDate, endDate));
      } else {
        setError(true);
        setEndDate(undefined);
      }
    }
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col items-center my-6 gap-2">
      <div className="flex gap-2 justify-center container">
        <DatePicker
          date={startDate}
          setDate={setStartDate}
          today
          placeholder="Start Date"
        />
        <DatePicker
          date={endDate}
          setDate={setEndDate}
          placeholder="End Date"
        />
      </div>
      {error && (
        <div className="text-red-500">Start date must be before end date</div>
      )}
    </div>
  );
};

export default WeightByDate;

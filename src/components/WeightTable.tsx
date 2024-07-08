import { useWeight } from "@/context/WeightContext";
import {
  calculateWeightLoss,
  DeficitResult,
  WeekWeight,
} from "@/lib/calculations";
import { cn } from "@/lib/utils";
import { WeightContextType } from "@/types/global";
import React, { useEffect, useState } from "react";

const WeightTable: React.FC = () => {
  const { currentWeight, goalWeight, heightFt, heightIn }: WeightContextType =
    useWeight();

  const [result, setResult] = useState<DeficitResult[]>([]);

  const dailyDeficits = [250, 500, 750, 1000];

  useEffect(() => {
    const weightLossResult = calculateWeightLoss(
      currentWeight,
      goalWeight,
      dailyDeficits,
      heightFt,
      heightIn
    );
    setResult(weightLossResult);
  }, [currentWeight, goalWeight]);

  console.log(result);

  // Assuming result[0] contains the data structure as per your function's return type
  const data = result[0] || {};

  return (
    <div>
      <div className="py-4 flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <div className="h-[20px] w-[50px] bg-red-700 rounded-md"></div>
          <span>Underweight</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="h-[20px] w-[50px] bg-green-400 rounded-md"></div>
          <span>Normal</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="h-[20px] w-[50px] bg-orange-400 rounded-md"></div>
          <span>Overweight</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="h-[20px] w-[50px] bg-red-400 rounded-md"></div>
          <span>Obese</span>
        </div>
      </div>
      <table className="mx-auto my-6">
        <thead>
          <tr>
            <th>Week / Deficit</th>
            {dailyDeficits.map((deficit) => (
              <th key={deficit}>{deficit}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(data).length > 0 &&
            Object.values(data)[0].weekWeights.map((week: WeekWeight) => (
              <tr key={week.week}>
                <td>{`Week ${week.week}`}</td>
                {dailyDeficits.map((deficit) => {
                  const weekData = data[deficit].weekWeights.find(
                    (w) => w.week === week.week
                  );
                  let bgColor = "";
                  switch (weekData?.bmiGroup) {
                    case "Underweight":
                      bgColor = "bg-red-700";
                      break;
                    case "Normal":
                      bgColor = "bg-green-400";
                      break;
                    case "Overweight":
                      bgColor = "bg-yellow-400";
                      break;
                    case "Obese":
                      bgColor = "bg-red-400";
                      break;
                  }
                  return (
                    <td key={deficit} className={cn("px-2", bgColor)}>
                      {weekData?.weight}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeightTable;

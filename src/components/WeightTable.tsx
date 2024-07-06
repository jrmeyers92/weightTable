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
  const { currentWeight, goalWeight }: WeightContextType = useWeight();

  const [result, setResult] = useState<DeficitResult[]>([]);

  const dailyDeficits = [250, 500, 750, 1000];

  useEffect(() => {
    const weightLossResult = calculateWeightLoss(
      currentWeight,
      goalWeight,
      dailyDeficits
    );
    setResult(weightLossResult);
  }, [currentWeight, goalWeight]);

  // Assuming result[0] contains the data structure as per your function's return type
  const data = result[0] || {};

  return (
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
                return (
                  <td
                    key={deficit}
                    className={cn(
                      "px-2",
                      weekData?.goalReached ? "bg-green-400" : ""
                    )}
                  >
                    {weekData?.weight}
                  </td>
                );
              })}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default WeightTable;

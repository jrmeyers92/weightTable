import { useWeight } from "@/context/WeightContext";
import { createTableJson } from "@/lib/calculations";
import { WeightContextType } from "@/types/global";
import { useEffect, useState } from "react";

const WeightTable = () => {
  const { currentWeight, goalWeight }: WeightContextType = useWeight();
  const [tableJson, setTableJson] = useState<{ [key: string]: number[] }>({});

  useEffect(() => {
    setTableJson(createTableJson(currentWeight, goalWeight));
  }, [currentWeight, goalWeight]);

  // Calculate the maximum array length to determine the number of weeks
  const maxWeeks = Math.max(
    ...Object.values(tableJson).map((arr) => arr.length)
  );

  return (
    <div className="my-6">
      <table className="mx-auto">
        <thead>
          <tr>
            <th className="px-2">Week</th>
            <th className="px-2">500 Calorie Deficit</th>
            <th className="px-2">750 Calorie Deficit</th>
            <th className="px-2">1000 Calorie Deficit</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxWeeks }).map((_, weekIndex) => (
            <tr key={weekIndex}>
              <td>{weekIndex + 1}</td>
              {Object.keys(tableJson).map((deficit, index) => (
                <td className="px-2" key={index}>
                  {tableJson[deficit][weekIndex] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeightTable;

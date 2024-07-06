"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWeight } from "@/context/WeightContext";
import { WeightContextType } from "@/types/global";
import { useEffect, useState } from "react";

const WeightInputs = () => {
  const {
    leftToLose,
    setLeftToLose,
    currentWeight,
    setCurrentWeight,
    goalWeight,
    setGoalWeight,
  }: WeightContextType = useWeight();

  // Function to calculate the weight left to lose
  const calculateLeftToLose = () => {
    if (currentWeight > 0 && goalWeight > 0) {
      const result = currentWeight - goalWeight;
      setLeftToLose(result);
    }
  };

  // Update current weight and recalculate left to lose
  const handleCurrentWeightChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCurrentWeight = parseFloat(e.target.value);
    setCurrentWeight(newCurrentWeight);
    localStorage.setItem("currentWeight", newCurrentWeight.toString());
  };

  // Update goal weight and recalculate left to lose
  const handleGoalWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGoalWeight = parseFloat(e.target.value);
    setGoalWeight(newGoalWeight);
    localStorage.setItem("goalWeight", newGoalWeight.toString());
  };

  useEffect(() => {
    calculateLeftToLose();
  }, [currentWeight, goalWeight]);

  useEffect(() => {
    const storedCurrentWeight = parseFloat(
      localStorage.getItem("currentWeight") || "0"
    );
    const storedGoalWeight = parseFloat(
      localStorage.getItem("goalWeight") || "0"
    );

    setCurrentWeight(storedCurrentWeight);
    setGoalWeight(storedGoalWeight);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 items-center justify-center w-full">
        <div>
          <Label htmlFor="currentWeight">Current Weight</Label>
          <Input
            placeholder="Current Weight"
            type="number"
            value={currentWeight.toString()}
            onChange={handleCurrentWeightChange}
            id="currentWeight"
          />
        </div>
        <div>
          <Label htmlFor="goalWeight">Goal Weight</Label>
          <Input
            placeholder="Goal Weight"
            type="number"
            value={goalWeight.toString()}
            onChange={handleGoalWeightChange}
            id="goalWeight"
          />
        </div>

        <div>
          <Label htmlFor="leftToLose">Amount to Lose</Label>
          <Input
            placeholder="Amount to Lose"
            type="text"
            value={leftToLose}
            disabled
            id="leftToLose"
          />
        </div>
      </div>
    </div>
  );
};

export default WeightInputs;

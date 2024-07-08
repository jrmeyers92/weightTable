"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWeight } from "@/context/WeightContext";
import {
  calculateBMI,
  calculateBMIGroup,
  calculateLeftToLose,
} from "@/lib/calculations";
import { WeightContextType } from "@/types/global";
import { useEffect } from "react";

const WeightInputs = () => {
  const {
    leftToLose,
    setLeftToLose,
    currentWeight,
    setCurrentWeight,
    goalWeight,
    setGoalWeight,
    heightFt,
    setHeightFt,
    heightIn,
    setHeightIn,
    bmi,
    setBmi,
  }: WeightContextType = useWeight();

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

    let calculatedBmi = calculateBMI(currentWeight, heightFt, heightIn);
    if (typeof calculatedBmi === "number") {
      let bmiGroup = calculateBMIGroup(calculatedBmi);
    }
  };

  const handleHeightFtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeightFt = parseFloat(e.target.value);
    setHeightFt(newHeightFt);
    localStorage.setItem("heightFt", newHeightFt.toString());
  };

  const handleHeightInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeightIn = parseFloat(e.target.value);
    setHeightIn(newHeightIn);
    localStorage.setItem("heightIn", newHeightIn.toString());
  };

  useEffect(() => {
    let lefttaLose = calculateLeftToLose(currentWeight, goalWeight);
    if (typeof lefttaLose === "number") {
      setLeftToLose(lefttaLose);
    }
    let calculatedBMI = calculateBMI(currentWeight, heightFt, heightIn);
    if (typeof calculatedBMI === "number") {
      setBmi(calculatedBMI);
    }
  }, [currentWeight, goalWeight, heightFt, heightIn]);

  useEffect(() => {
    const storedCurrentWeight = parseFloat(
      localStorage.getItem("currentWeight") || "0"
    );
    const storedGoalWeight = parseFloat(
      localStorage.getItem("goalWeight") || "0"
    );

    const storedHeightFt = parseFloat(localStorage.getItem("heightFt") || "0");
    const storedHeightIn = parseFloat(localStorage.getItem("heightIn") || "0");

    setHeightFt(storedHeightFt);
    setHeightIn(storedHeightIn);
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 items-center justify-center w-full">
        <div>
          <Label htmlFor="heightFt">Height in Feet</Label>
          <Input
            placeholder="Height in Feet"
            type="number"
            value={heightFt.toString()}
            onChange={handleHeightFtChange}
            id="heightFt"
          />
        </div>

        <div>
          <Label htmlFor="heightIn">Height in Feet</Label>
          <Input
            placeholder="Height in Feet"
            type="number"
            value={heightIn.toString()}
            onChange={handleHeightInChange}
            id="heightIn"
          />
        </div>

        <div>
          <Label htmlFor="bmi">BMI</Label>
          <Input placeholder="BMI" type="text" value={bmi} disabled id="bmi" />
        </div>
      </div>
    </div>
  );
};

export default WeightInputs;

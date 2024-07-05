import React, { createContext, useContext, useState } from "react";

interface WeightContextType {
  leftToLose: number;
  setLeftToLose: React.Dispatch<React.SetStateAction<number>>;
  currentWeight: number;
  setCurrentWeight: React.Dispatch<React.SetStateAction<number>>;
  goalWeight: number;
  setGoalWeight: React.Dispatch<React.SetStateAction<number>>;
}

const WeightContext = createContext<WeightContextType | undefined>(undefined);

export const useWeight = () => {
  const context = useContext(WeightContext);
  if (context === undefined) {
    throw new Error("useWeight must be used within a WeightProvider");
  }
  return context;
};
export const WeightProvider = ({ children }: { children: React.ReactNode }) => {
  const [leftToLose, setLeftToLose] = useState<number>(0);
  const [currentWeight, setCurrentWeight] = useState<number>(0);
  const [goalWeight, setGoalWeight] = useState<number>(0);

  const value = {
    leftToLose,
    setLeftToLose,
    currentWeight,
    setCurrentWeight,
    goalWeight,
    setGoalWeight,
  };

  return (
    <WeightContext.Provider value={value}>{children}</WeightContext.Provider>
  );
};
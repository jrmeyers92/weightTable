export interface WeightContextType {
  leftToLose: number;
  setLeftToLose: React.Dispatch<React.SetStateAction<number>>;
  currentWeight: number;
  setCurrentWeight: React.Dispatch<React.SetStateAction<number>>;
  goalWeight: number;
  setGoalWeight: React.Dispatch<React.SetStateAction<number>>;
}

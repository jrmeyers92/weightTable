export interface WeightContextType {
  leftToLose: number;
  setLeftToLose: React.Dispatch<React.SetStateAction<number>>;
  currentWeight: number;
  setCurrentWeight: React.Dispatch<React.SetStateAction<number>>;
  goalWeight: number;
  setGoalWeight: React.Dispatch<React.SetStateAction<number>>;
  heightFt: number;
  setHeightFt: React.Dispatch<React.SetStateAction<number>>;
  heightIn: number;
  setHeightIn: React.Dispatch<React.SetStateAction<number>>;
  bmi: number;
  setBmi: React.Dispatch<React.SetStateAction<number>>;
}

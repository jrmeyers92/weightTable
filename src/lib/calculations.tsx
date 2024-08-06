export type WeekWeight = {
  week: number;
  weight: string;
  goalReached: boolean;
  bmiGroup?: string;
};

export type DeficitResult = {
  [deficit: number]: {
    weekWeights: WeekWeight[];
  };
};

export function calculateWeightLoss(
  currentWeight: number,
  goalWeight: number,
  dailyDeficits: number[],
  heightFt?: number, // Make heightFt optional
  heightIn?: number // Make heightIn optional
): DeficitResult[] {
  const poundsPerCalorie = 3500; // 3500 calories in a pound of body fat
  const daysInWeek = 7;
  let weeksToGoal: number | undefined = undefined;

  const results = dailyDeficits.reduce((acc: any, deficit) => {
    let weight = currentWeight;
    const weekWeights: WeekWeight[] = [];

    if (weeksToGoal === undefined) {
      weeksToGoal = 0;
      while (weight > goalWeight) {
        weight -= (deficit * daysInWeek) / poundsPerCalorie;
        weeksToGoal++;
      }
    }

    weight = currentWeight;
    for (let i = 1; i <= weeksToGoal; i++) {
      weight -= (deficit * daysInWeek) / poundsPerCalorie;
      const weekWeight: WeekWeight = {
        week: i,
        weight: weight.toFixed(2),
        goalReached: weight <= goalWeight,
      };

      // Conditionally calculate BMI and BMI group if height is provided
      if (heightFt && heightIn) {
        const bmi = calculateBMI(weight, heightFt, heightIn);
        if (bmi !== null) {
          weekWeight.bmiGroup = calculateBMIGroup(bmi);
        }
      }

      weekWeights.push(weekWeight);
    }

    acc[deficit] = { weekWeights };
    return acc;
  }, {});

  return [results];
}

export const calculateBMI = (
  currentWeight: number,
  heightFt: number,
  heightIn: number
): number | null => {
  if (currentWeight > 0 && heightFt > 0 && heightIn > 0) {
    const heightInInches = heightFt * 12 + heightIn;
    const heightInMeters = heightInInches * 0.0254;
    const currentWeightInKg = currentWeight * 0.453592;
    const bmi = currentWeightInKg / (heightInMeters * heightInMeters);

    return bmi;
  }

  return null;
};

export const calculateBMIGroup = (bmi: number) => {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 24.9) {
    return "Normal";
  } else if (bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

export const calculateLeftToLose = (
  currentWeight: number,
  goalWeight: number
): number | null => {
  if (currentWeight > 0 && goalWeight > 0) {
    const result = currentWeight - goalWeight;

    return result;
  }
  return null;
};

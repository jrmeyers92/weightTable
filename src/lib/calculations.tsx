export type WeekWeight = {
  week: number;
  weight: string;
  goalReached: boolean;
};

export type DeficitResult = {
  [deficit: number]: {
    weekWeights: WeekWeight[];
  };
};

export function calculateWeightLoss(
  currentWeight: number,
  goalWeight: number,
  dailyDeficits: number[]
): DeficitResult[] {
  const poundsPerCalorie = 3500; // 3500 calories in a pound of body fat
  const daysInWeek = 7;
  let weeksToGoal: number | undefined = undefined;

  const results = dailyDeficits.reduce((acc: any, deficit) => {
    let weight = currentWeight;
    const weekWeights: WeekWeight[] = [];

    // Calculate weeks to goal for the first deficit to set the number of weeks for all
    if (weeksToGoal === undefined) {
      weeksToGoal = 0;
      while (weight > goalWeight) {
        weight -= (deficit * daysInWeek) / poundsPerCalorie;
        weeksToGoal++;
      }
    }

    // Reset for actual calculation
    weight = currentWeight;
    for (let i = 1; i <= weeksToGoal; i++) {
      weight -= (deficit * daysInWeek) / poundsPerCalorie;
      weekWeights.push({
        week: i,
        weight: weight.toFixed(2),
        goalReached: weight <= goalWeight,
      });
    }

    acc[deficit] = { weekWeights };
    return acc;
  }, {});

  return [results];
}

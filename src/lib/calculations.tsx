export const calculateWeightsWeeks = (
  initialWeight: number,
  goalWeight: number,
  dailyDeficit: number
): number[] => {
  const weeklyWeights: number[] = [];
  let amountToLose = initialWeight - goalWeight;
  const weightLossPerWeek = (dailyDeficit * 7) / 3500; // Moved outside the loop for efficiency
  let currentWeight = initialWeight; // Use a local variable instead of mutating the parameter

  while (amountToLose > 0) {
    currentWeight -= weightLossPerWeek;
    weeklyWeights.push(currentWeight);
    amountToLose -= weightLossPerWeek;
  }

  return weeklyWeights;
};

export const createTableJson = (currentWeight: number, goalWeight: number) => {
  const dailyDeficits = [500, 750, 1000];
  const tableJson: { [key: number]: number[] } = {};
  dailyDeficits.forEach((deficit) => {
    tableJson[deficit] = calculateWeightsWeeks(
      currentWeight,
      goalWeight,
      deficit
    );
  });

  console.log(tableJson);

  return tableJson;
};

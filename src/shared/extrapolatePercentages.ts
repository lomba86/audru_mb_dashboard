interface requiredProperties {
  value: number;
}

export const extrapolatePercentages = <T>(data: (T & requiredProperties)[]) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const newItem = data.map(item => {
    const percentage = (item.value / total) * 100;

    return {
      ...item,
      percentage,
      percentageStr: percentage.toFixed(2),
    };
  });
  return newItem;
};

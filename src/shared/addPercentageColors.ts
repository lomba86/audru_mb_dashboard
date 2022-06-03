interface requiredProperties {
  percentage: number;
}

export const addPercentageColors = <T>(data: (T & requiredProperties)[]) => {
  const newItem = data.map(item => {
    let color;
    if (item.percentage > 20) {
      color = '#ac9013';
    } else if (item.percentage > 10) {
      color = '#ffdc23';
    } else {
      color = '#ffefa3';
    }

    return { ...item, color };
  });
  return newItem;
};

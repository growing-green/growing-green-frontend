export const getCurrentHeight = (temp, height) => {
  const borderWidth = 3;
  const totalTemperature = 70;
  const minusTemperature = 30;

  return (
    ((Number(temp) + minusTemperature) / totalTemperature) * height +
    borderWidth
  );
};

export function penaltyPointValidator(plant) {
  if (plant.pernalty_point + 1 > 10) {
    return true;
  }

  return false;
}

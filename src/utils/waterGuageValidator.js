export function waterGuageValidator(plant) {
  const { waterGuage } = plant;

  if (waterGuage.defaultGuage < waterGuage.currentGuage + 1) {
    return false;
  }

  return true;
}

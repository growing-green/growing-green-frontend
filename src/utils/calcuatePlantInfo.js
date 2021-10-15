import differenceInDays from 'date-fns/differenceInDays';
import addHours from 'date-fns/addHours';

export function calculatePlantInfo(plant, weather) {
  const {
    createdAt,
    updatedAt,
    waterGuage,
    isBlindUp,
    isSunPlant,
    sunGuage,
    penaltyPoints,
    growthState,
  } = plant;

  const updates = {
    sunGuage: sunGuage.currentGuage,
    waterGuage: waterGuage.currentGuage,
    penaltyPoints,
    growthState,
  };

  const createdDate = new Date(createdAt);
  const lastLoginDate = new Date(updatedAt);
  const today = new Date();

  const watering = waterGuage.defaultGuage;
  const elapsedDate = differenceInDays(today, createdDate);

  const passedDays = [];

  for (let i = 0; i < elapsedDate; i++) {
    const passedDay = addHours(createdDate, 24 * (i + 1));

    passedDays.push(passedDay);
  }

  if (passedDays.length > 7) {
    updates.growthState = growthState + 1 < 3 ? 3 : growthState + 1;
  } else if (passedDays.length > 14) {
    updates.growthState = growthState + 1 < 3 ? 3 : growthState + 1;
  } else {
    updates.growthState = 3;
  }

  const wateringDays = [];

  for (let i = 0; i < elapsedDate / 5; i++) {
    const wateringDay = addHours(createdDate, 24 * ((i + 1) * watering));

    wateringDays.push(wateringDay);
  }

  const passDaysAfterUpdate = passedDays.filter((day) => day > lastLoginDate);
  const wateringDaysAfterUpdate = wateringDays.filter(
    (day) => day > lastLoginDate && day < today,
  );

  const wateringCount = wateringDaysAfterUpdate.length;


  if (wateringCount > 0) {
    updates.waterGuage = 0;
  }

  if (wateringCount > 1) {
    updates.penaltyPoints = penaltyPoints - wateringCount - 1;
  }

  if (weather === 'rainy') {
    updates.waterGuage = waterGuage.defaultGuage;
  }

  if (isSunPlant === true) {
    if (isBlindUp === true) {
      const increasedGuage = sunGuage.currentGuage + passDaysAfterUpdate.length;
      const defaultGauge = sunGuage.defaultGuage;

      updates.sunGuage =
        increasedGuage > defaultGauge ? defaultGauge : increasedGuage;
    }

    if (isBlindUp === false) {
      const decreasedGuage = sunGuage.currentGuage - passDaysAfterUpdate.length;

      updates.sunGuage = decreasedGuage > 0 ? decreasedGuage : 0;

      if (decreasedGuage < 0) {
        updates.penaltyPoints = penaltyPoints - decreasedGuage;
      }
    }
  }

  if (isSunPlant === false) {
    if (isBlindUp === true) {
      const increasedGuage = sunGuage.currentGuage + passDaysAfterUpdate.length;
      const defaultGauge = sunGuage.defaultGuage;

      updates.sunGuage =
        increasedGuage > defaultGauge ? defaultGauge : increasedGuage;

      if (increasedGuage > defaultGauge) {
        const decreasePoints = increasedGuage - defaultGauge;
        updates.penaltyPoints = penaltyPoints - decreasePoints;
      }
    }

    if (isBlindUp === false) {
      const decreasedGuage = sunGuage.currentGuage - passDaysAfterUpdate.length;

      updates.sunGuage = decreasedGuage > 0 ? decreasedGuage : 0;
    }
  }

  const updatedPlant = {
    ...plant,
    sunGauge: {
      currentGuage: updates.sunGuage,
    },
    waterGauge: {
      currentGuage: updates.waterGuage,
    },
    penaltyPoints: updates.penaltyPoints,
    growthState: updates.growthState,
  };

  return updatedPlant;
}

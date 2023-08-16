export const farmsFromAlpacas = (alpacas, { publicFarmsOnly = true }) => {
  // Get farms with count of alpacas from list of alpacas

  const farms = new Map();

  const alpacasByFarmType = alpacas.filter((alpaca) => {
    return publicFarmsOnly === true ? alpaca.public === true : alpacas;
  });

  for (const alpaca of alpacasByFarmType) {
    const lat = alpaca?.location?.coordinates[1] ?? null;
    const lng = alpaca?.location?.coordinates[0] ?? null;

    if (!farms.has(alpaca.keeperName)) {
      // First time for farm
      farms.set(alpaca.keeperName, {
        name: alpaca.keeperName,
        countOfAlpacas: 0,
      });
    }

    if (farms.has(alpaca.keeperName)) {
      // Increment alpaca count for existing farm, and fill out rest of values
      const count = farms.get(alpaca.keeperName).countOfAlpacas + 1;
      farms.set(alpaca.keeperName, {
        id: alpaca.companyId,
        city: alpaca.city,
        countOfAlpacas: count,
        lat: lat,
        lng: lng,
        public: alpaca.public ?? false,
        name: alpaca.keeperName,
      });
    }
  }

  const myOutput = Array.from(farms.values());
  return myOutput;
};

import { capitaliseFirstLetter } from "./capitaliseFirstLetter.js";

export const farmsFromAlpacas = (alpacas, { publicFarmsOnly = true }, includeAlpacas = false) => {
  // Get farms with count of alpacas from list of alpacas

  const farms = new Map();

  const alpacasByFarmType = alpacas.filter((alpaca) => {
    return publicFarmsOnly === true ? alpaca.public === true : alpacas;
  });

  for (const alpaca of alpacasByFarmType) {
    const lat = alpaca?.location?.coordinates[1] ?? null;
    const lng = alpaca?.location?.coordinates[0] ?? null;
    const location = alpaca?.location ?? null;

    if (!farms.has(alpaca.keeperName)) {
      // First time for farm
      farms.set(alpaca.keeperName, {
        name: alpaca.keeperName,
        countOfAlpacas: 0,
        alpacas: [],
      });
    }

    if (farms.has(alpaca.keeperName)) {
      // Increment alpaca count for existing farm, and fill out rest of values
      const count = farms.get(alpaca.keeperName).countOfAlpacas + 1;

      if (includeAlpacas) {
        farms.get(alpaca.keeperName).alpacas.push(alpaca);
      }

      const farm = {
        id: alpaca.companyId,
        city: alpaca.city ? capitaliseFirstLetter(alpaca?.city) : alpaca.city,
        countOfAlpacas: count,
        descriptionCompany: alpaca.descriptionCompany,
        email: alpaca.email,
        lat: lat, // TODO remove this field when alpaca app is updated to use location.coordinates
        lng: lng, // TODO remove this field when alpaca app is updated to use location.coordinates
        location: location,
        name: alpaca.keeperName,
        phone: alpaca.phone,
        public: alpaca.public ?? false,
        private: !alpaca.public ?? true,
        webpage: alpaca.webpage,
      };

      farms.set(
        alpaca.keeperName,
        includeAlpacas ? Object.assign(farm, { alpacas: farms.get(alpaca.keeperName).alpacas }) : farm
      );
    }
  }

  const myOutput = Array.from(farms.values());
  return myOutput;
};

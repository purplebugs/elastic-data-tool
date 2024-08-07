import { capitaliseFirstLetter } from "./capitaliseFirstLetter.js";
import { FARM_CATEGORY } from "./sql_queries/farm_category.js";

export const farmsFromAlpacas = (
  alpacas,
  { publicFarmsOnly = true, includeAlpacas = false } = {}
) => {
  // Get farms with count of alpacas from list of alpacas

  const farms = new Map();

  const alpacasByFarmType = alpacas.filter((alpaca) => {
    return publicFarmsOnly === true ? alpaca.public === true : alpacas;
  });

  for (const alpaca of alpacasByFarmType) {
    const lat = alpaca?.location?.geo_json?.coordinates[1] ?? null;
    const lng = alpaca?.location?.geo_json?.coordinates[0] ?? null;
    const location = alpaca?.location ?? null;

    if (!farms.has(alpaca.keeperName)) {
      // First time for farm
      farms.set(alpaca.keeperName, {
        name: alpaca.keeperName,
        count: {
          alpacas: { status: { active: 0, export: 0, dead: 0 }, total: 0 },
        },
        alpacas: { status: { active: [], export: [], dead: [] }, all: [] },
      });
    }

    if (farms.has(alpaca.keeperName)) {
      // Increment alpaca count for existing farm, and fill out rest of values

      const count_total =
        farms.get(alpaca.keeperName)?.count?.alpacas?.total + 1;
      let count_status_active = farms.get(alpaca.keeperName)?.count?.alpacas
        ?.status.active;
      let count_status_dead = farms.get(alpaca.keeperName)?.count?.alpacas
        ?.status.dead;
      let count_status_export = farms.get(alpaca.keeperName)?.count?.alpacas
        ?.status.export;

      switch (alpaca?.status) {
        case "STATUS_ACTIVE":
          count_status_active = count_status_active + 1;
          break;
        case "STATUS_DEAD":
          count_status_dead = count_status_dead + 1;
          break;
        case "STATUS_EXPORT":
          count_status_export = count_status_export + 1;
          break;
        default:
          console.log(`[LOG] No status matched alpacaId: ${alpaca.alpacaId}`);
      }

      if (includeAlpacas) {
        const {
          webpage,
          descriptionCompany,
          email,
          phone,
          location,
          url,
          public: publicHandler, // Temporarily rename field "public" because it is a reserved word and cannot be used in a const
          private: privateHandler, // Temporarily rename field "private" because it is a reserved word and cannot be used in a const
          ...alpacaDetailsToKeep
        } = alpaca;

        farms.get(alpaca.keeperName).alpacas.all.push(alpacaDetailsToKeep);

        switch (alpaca?.status) {
          case "STATUS_ACTIVE":
            farms
              .get(alpaca.keeperName)
              .alpacas.status.active.push(alpacaDetailsToKeep);
            break;
          case "STATUS_DEAD":
            farms
              .get(alpaca.keeperName)
              .alpacas.status.dead.push(alpacaDetailsToKeep);
            break;
          case "STATUS_EXPORT":
            farms
              .get(alpaca.keeperName)
              .alpacas.status.export.push(alpacaDetailsToKeep);
            break;
          default:
            console.log(`[LOG] No status matched alpacaId: ${alpaca.alpacaId}`);
        }
      }

      const farm = {
        id: alpaca.companyId,
        category: FARM_CATEGORY.find(
          (farm) => farm.companyId === alpaca.companyId
        )?.category ?? {
          alpacaSales: false,
          alpacaWalking: false,
          bookable: false,
          shop: false,
          overnightStay: false,
          private: true,
          public: false,
          studServices: false,
        },
        city: alpaca.city ? capitaliseFirstLetter(alpaca?.city) : alpaca.city,
        count: {
          alpacas: {
            status: {
              active: count_status_active,
              dead: count_status_dead,
              export: count_status_export,
            },
            total: count_total,
          },
        },
        descriptionCompany: alpaca.descriptionCompany,
        email: alpaca.email,
        lat: lat, // TODO remove this field when alpaca app is updated to use location.geo_json
        lng: lng, // TODO remove this field when alpaca app is updated to use location.geo_json
        location: location,
        name: alpaca.keeperName,
        phone: alpaca.phone,
        // TODO remove public field everywhere in this app when alpaca app is updated to use category.public
        public: alpaca.public ?? false,
        // TODO remove private field everywhere in this app when alpaca app is updated to use category.private
        private: !alpaca.public ?? true,
        url: alpaca?.url ?? null,
        webpage: alpaca.webpage,
      };

      farms.set(
        alpaca.keeperName,
        includeAlpacas
          ? Object.assign(farm, {
              alpacas: farms.get(alpaca.keeperName).alpacas,
            })
          : farm
      );
    }
  }

  const myOutput = Array.from(farms.values());
  return myOutput;
};

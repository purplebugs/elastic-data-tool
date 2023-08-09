import { PUBLIC_FARMS } from "./public_farms.js";

export const getPublicFarms = async (connection) => {
  // query database
  const query =
    "SELECT idCompany AS keeper, Name AS name FROM `alp_Company` WHERE `Name` IN (" + PUBLIC_FARMS + ") ORDER BY Name";
  const result = await connection.execute(query);

  return result;
};

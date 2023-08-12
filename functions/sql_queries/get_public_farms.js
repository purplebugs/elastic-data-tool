import { PUBLIC_FARMS } from "./public_farms.js";

const publicFarms = PUBLIC_FARMS.map((farm) => {
  return `"${farm}"`;
});

export const getPublicFarms = async (connection) => {
  // query database
  const query = `SELECT idCompany AS keeper, Name AS name FROM alp_Company WHERE Name IN (${publicFarms}) ORDER BY Name`;
  const result = await connection.execute(query);

  return result;
};

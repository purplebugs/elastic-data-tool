export const getAlpacaRegistries = async (connection) => {
  // query database
  const result = await connection.execute("SELECT * FROM `alp_Registry`");

  return result;
};

export const getAlpacaIdsFromNorwegianRegistry = async (connection) => {
  // query database
  const result = await connection.execute(
    "SELECT r.Alpaca FROM `alp_Register` r INNER JOIN `alp_Registry` y ON r.Registry = y.idRegistry where r.Registry=1"
  );

  return result;
};

export const getAlpacaDetails = async (connection) => {
  const query =
    "select a.idAlpaca as alpacaId, a.ShortName AS alpacaShortName, " +
    "s.Name AS gender, " +
    "color1.Name AS alpacaColor1, " +
    "CONVERT(DOB, DATE) AS DOB, CONVERT(DOD, DATE) AS DOD, " +
    "a.Keeper AS keeper, c.idCompany AS companyId, c.Name AS keeperName, c.Street AS street, c.Zip AS zip, c.City AS city, c.Country as country, c.Webpage FROM `alp_Alpaca` a " +
    "INNER JOIN alp_Sex s ON a.Sex = s.idSex " +
    "INNER JOIN alp_Color color1 ON a.Color1 = color1.idColor " +
    "INNER JOIN alp_Company c on a.Keeper = c.idCompany WHERE a.idAlpaca IN " +
    "(SELECT r.Alpaca FROM alp_Register r INNER JOIN alp_Registry y ON r.Registry = y.idRegistry where r.Registry=1)";

  const result = await connection.execute(query);
  return result;
};

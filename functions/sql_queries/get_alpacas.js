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
    "select a.idAlpaca as alpacaId, a.RegisteredName AS alpacaRegisteredName, a.ShortName AS alpacaShortName, " +
    "s.Name AS gender, " +
    "CONVERT(DOB, DATE) AS DOB, CONVERT(DOD, DATE) AS DOD, " +
    "b.Name AS breed, " +
    "st.Name AS status, " +
    "a.TagId as tagId, " +
    "tc.Name AS tagColor, " +
    "a.MicrochipNO AS microchipNumber, a.MicrochipLoc AS microchipLOC," +
    "color1.Name AS color1, color2.Name AS color2, color3.Name AS color3, colorSolid.Name AS colorSolid, " +
    "a.description AS descriptionAlpaca, " +
    "a.Keeper AS keeper, c.idCompany AS companyId, c.Name AS keeperName, c.Street AS street, c.Zip AS zip, c.City AS city, c.Country as country, c.Webpage as webpage, c.Description as descriptionCompany, c.Email as email, c.Phone as phone FROM `alp_Alpaca` a " +
    "INNER JOIN alp_Sex s ON a.Sex = s.idSex " +
    "INNER JOIN alp_Breed b ON a.Breed = b.idBreed " +
    "LEFT JOIN alp_status st ON a.Status = st.idStatus " +
    "LEFT JOIN alp_TagColor tc ON a.TagColor = tc.idTagColor " +
    "INNER JOIN alp_Color color1 ON a.Color1 = color1.idColor " +
    "LEFT JOIN alp_Color color2 ON a.Color2 = color2.idColor " +
    "LEFT JOIN alp_Color color3 ON a.Color3 = color3.idColor " +
    "LEFT JOIN alp_Color colorSolid ON a.ColorSolid = colorSolid.idColor " +
    "INNER JOIN alp_Company c on a.Keeper = c.idCompany WHERE a.idAlpaca IN " + // " WHERE a.Keeper IN (61) AND a.idAlpaca IN" for troubleshooting
    "(SELECT r.Alpaca FROM alp_Register r INNER JOIN alp_Registry y ON r.Registry = y.idRegistry where r.Registry=1)"; // append "LIMIT 20" while troubleshooting

  const result = await connection.execute(query);
  return result;
};

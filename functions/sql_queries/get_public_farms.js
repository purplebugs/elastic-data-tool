export const getPublicFarms = async (connection) => {
  // query database
  const result = await connection.execute(
    "SELECT idCompany AS keeper, Name AS name FROM `alp_Company` WHERE `Name` IN ('Farm name 1', 'Farm name 2') ORDER BY Name"
  );

  return result;
};

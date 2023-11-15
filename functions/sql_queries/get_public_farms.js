export const getPublicFarms = async (connection) => {
  // query database
  const query = `SELECT idCompany AS keeper, Name AS name FROM alp_Company WHERE idCompany IN (SELECT idCompanyCategory from alp_CompanyCategories where Category = 1) ORDER BY Name`;
  const result = await connection.execute(query);

  return result;
};

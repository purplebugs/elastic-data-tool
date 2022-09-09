import fetch from "node-fetch";

// {"Zip":"1667","City":"Rolvsøy","Name":"Alpakka Enghaugen","Gender":"SEX_FEMALE","Keeper":16,"Street":"Ringstadhavna 7","color1":"COLOR_WHITE","Country":"NO","Webpage":"http://www.alpakkaenghaugen.no/","alpacaId":271,"DateOfBirth":"2004-05-13","DateOfDeath":null,"alpacaShortName":"ANDAMOOKA CONSTANTINE"}
// {"Zip":"1667","City":"Rolvsøy","Street":"Ringstadhavna 7"}

const addressJSON = {
  Zip: "2436",
  City: "Våler i Solør",
  Street: "Risåsvegen 71",
}; // Previously "Risåsvegen 71, 2436, Våler i Solør";

const addressJSONtoString = (address) => {
  // { Zip: "2436", City: "Våler i Solør", Street: "Risåsvegen 71"} ->  "Risåsvegen 71, 2436, Våler i Solør"
  return `${addressJSON["Street"]}, ${addressJSON["Zip"]}, ${addressJSON["City"]}`;
};

// console.log(addressJSONtoString(addressJSON));

const getLatLongFromGeoNorge = async (address) => {
  // https://ws.geonorge.no/stedsnavn/v1/#/default/get_sted

  console.log(address);

  // sokeStreng: 'sok=Ris%C3%A5svegen%2071,%202436,%20V%C3%A5ler%20i%20Sol%C3%B8r&fuzzy=true&utkoordsys=4258&treffPerSide=10&side=1'

  const response = await fetch(
    `https://ws.geonorge.no/stedsnavn/v1/sted?sok=${address}&fuzzy=true&utkoordsys=4258&treffPerSide=10&side=1`
  );
  const data = await response.json();

  return data;
};

getLatLongFromGeoNorge(addressJSONtoString(addressJSON)).then((data) =>
  // Example response: { 'øst': 11.77152, nord: 60.68571, koordsys: 4258 }

  console.log(data?.navn[0]?.representasjonspunkt)
);

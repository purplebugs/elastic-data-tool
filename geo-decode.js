import fetch from "node-fetch";

// {"Zip":"0167","City":"Oslo","Name":"My alpacca test farm","Gender":"SEX_FEMALE","Keeper":123,"Street":"Wergelandsveien 15","color1":"COLOR_WHITE","Country":"NO","Webpage":"http://www.myalpacatestfarm.com/","alpacaId":456,"DateOfBirth":"2008-05-13","DateOfDeath":null,"alpacaShortName":"ANITA"}
// {"Zip":"0167","City":"Oslo","Street":"Wergelandsveien 15"}

const addressJSON = {
  Zip: "0167",
  City: "Oslo",
  Street: "Wergelandsveien 15",
};

const addressJSONtoString = (address) => {
  // { Zip: "0167", City: "Oslo", Street: "Wergelandsveien 15"} ->  "Wergelandsveien 15, 0167, Oslo"
  return `${addressJSON["Street"]}, ${addressJSON["Zip"]}, ${addressJSON["City"]}`;
};

// console.log(addressJSONtoString(addressJSON));

const getLatLongFromGeoNorge = async (address) => {
  // https://ws.geonorge.no/stedsnavn/v1/#/default/get_sted

  console.log(address);

  // sokeStreng: "sok=Wergelandsveien%2015%2C%200167%2C%20Oslo&fuzzy=true&utkoordsys=4258&treffPerSide=10&side=1"
  // TODO - investigate using kommunenavn= for when more than one result:  "sokeStreng": "sok=Hagegata%2028%2C%200653&fuzzy=true&kommunenavn=Oslo&utkoordsys=4258&treffPerSide=10&side=1"

  const response = await fetch(
    `https://ws.geonorge.no/stedsnavn/v1/sted?sok=${address}&fuzzy=true&utkoordsys=4258&treffPerSide=10&side=1`
  );
  const data = await response.json();

  return data;
};

getLatLongFromGeoNorge(addressJSONtoString(addressJSON)).then((data) =>
  // Example response: { 'øst': 7.72357, nord: 63.11076, koordsys: 4258 }

  console.log(data?.navn[0]?.representasjonspunkt)
);

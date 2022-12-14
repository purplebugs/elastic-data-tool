# Elastic Data Tool âïļ

Convert data to formats to easily ingest into Elasticsearch

## Purpose ð

Personal learning project which should result in a greater understanding of how to manipulate data formats, eg

- SQL -> JSON
- geo decoding JSON data containing location by adding latitude, longitude from address fields using external API
- geo enriching JSON data containing location by adding population statistics using external API
- JSON -> NDJSON -> import file to Elasticsearch
- JSON -> NDJSON -> Elasticsearch API `POST /_bulk` command, eg

```
POST alpacas/_bulk
{"index":{"_id":1}}
{"country": "NO","alpacaId":9876543210,"keeper":0123456789,"gender":"SEX_FEMALE","alpacaShortName":"ANITA IS COOL","name":"Anita's Alpacas"}
{"index":{"_id":2}}
{"country": "NO","alpacaId":9999543210,"keeper":0123456789,"gender":"SEX_MALE","alpacaShortName":"THOR IS COOL","name":"Anita's Alpacas"}
```

## 1. Install app ðĢ

1. Clone repo and navigate to new repo
2. Run `npm install`

### First time users only ðŠī

MySQL to JSON converter:

- An .env file in the root of your project should contain the keys

```
MYSQL_PASSWORD="YOUR PASSWORD GOES HERE"
MYSQL_DATABASE="YOUR DATABASE NAME GOES HERE"
```

NDJSON file to Elasticsearch index:

- An .env file in the root of your project should contain the keys

```
ELASTIC_CLOUD_ID="UPDATE-ME"
ELASTIC_USERNAME="UPDATE-ME"
ELASTIC_PASSWORD="UPDATE-ME"
```

## 2. Use the app ð·

### SQL -> JSON ðū

1. JSON file is created from .sql file dump and stored in [./data](./data)
2. If this is not the case, follow the steps at [pre-requisistes.md](pre-requisistes.md)

### JSON -> NDJSON -> import file to Elasticsearch ðū

Generate NDJSON file to import to Elasticsearch

1. Edit the JSON filename to read from in [index.js](./index.js) and save the file
2. Run `node index`
3. Look for the generated file in the directory
4. Import this file to Elasticsearch

### JSON -> NDJSON -> Elasticsearch API `POST /_bulk` command ðĪ

Generate a POST body of an API \_bulk query

1. Before running the script, uncomment the line that references `POST /_bulk` then at the final step use the contents of the generated file as the POST body
2. Run Steps 1-3 above
3. Use the contents of generated file as the POST body of an `POST /_bulk` to copy into Kibana DevTools

- In progress: automate with Elasticsearch client and aliases `node functions/elasticsearch-commands/index.js`

## 3. Use the app helpers ðâðĶš

### Regenerate latest population data ðķ

Run the following, then update the file referenced by the app to use this latest file

Note: the app by default geo enriches using a static file

1. Run `node functions/geo-enrich/get-population-by-municipality.js` to generate a standalone JSON file and a standalone NDJSON file in [./data](./data) containing population by municipality, eg

.json

```
[{"municipalityNumberFromSSB":"K-3001","municipalityNumber":"3001","municipalityName":"Halden","population":31444},{"municipalityNumberFromSSB":"K-3002","municipalityNumber":"3002","municipalityName":"Moss","population":50290}]
```

.ndjson

```
{"municipalityNumber":"K-3001","municipalityName":"Halden","population":31444}
{"municipalityNumber":"K-3002","municipalityName":"Moss","population":50290}
```

### Get public farms ðĶ

- This is an independent helper tool to create NDJSON file for Elasticsearch API `POST /_bulk` command, eg

```
{"index":{"_id":1}}
{"keeper":32,"name":"Farm name 1","public":true}
{"index":{"_id":2}}
{"keeper":16,"name":"Farm name 2","public":true}
```

1. Pre-condition: search for getPublicFarms query and replace farm list with actual
1. Run `node get-public-farms.js` and look at console log and for file in [./data](./data)

## Create data in Elasticsearch from scratch ðļ

- [Data setup in Elasticsearch](elasticsearch-data-setup.md)

## Credits ð

- Location data from [Geo Norge](https://www.geonorge.no/)
- Population data from [SSB - Statistisk sentralbyrÃĨ - Statistics Norway](https://www.ssb.no/)

## LicenseÂ ð

The work is under exclusive copyright by default.

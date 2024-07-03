# Elastic Data Tool ⚒️

Convert data to formats to easily ingest into Elasticsearch

## Purpose 💖

Personal learning project which should result in a greater understanding of how to manipulate data formats, eg

- SQL -> JSON
- geo decoding JSON data containing location by adding latitude, longitude from address fields using external API
- JSON -> NDJSON -> import file to Elasticsearch
- JSON -> NDJSON -> Elasticsearch API `POST /_bulk` command, eg

```
POST alpacas/_bulk
{"index":{"_id":1}}
{"country": "NO","alpacaId":9876543210,"keeper":0123456789,"gender":"SEX_FEMALE","alpacaShortName":"ANITA IS COOL","name":"Anita's Alpacas"}
{"index":{"_id":2}}
{"country": "NO","alpacaId":9999543210,"keeper":0123456789,"gender":"SEX_MALE","alpacaShortName":"THOR IS COOL","name":"Anita's Alpacas"}
```

## 1. Install app 🐣

1. Clone repo and navigate to new repo
2. Run `npm install`

### First time users only 🪴

- See [config.js](config/config.js) and override any non sensitive values in the corresponding environment files eg [config.test.json](config/config.test.json)

MySQL

- `.env` file in root project should contain keys for sensitive values, eg

```
MYSQL_PASSWORD="YOUR PASSWORD GOES HERE"
```

MySQL on Azure portal

1. Get certificate from https://portal.azure.com/ MySQL flexible server > Settings > Networking > Download SSL Certificate
2. Put it in the [./data](./data) folder which must be in `.gitignore`
3. Update filename to match config `db.ssl_ca` value

Elasticsearch

```
ELASTIC_CLOUD_ID="UPDATE-ME"
ELASTIC_USERNAME="UPDATE-ME"
ELASTIC_PASSWORD="UPDATE-ME"
```

Google API

```
GOOGLE_MAPS_API_KEY="UPDATE-ME"
```

## 2. Use the app 🎷

Pre-conditions

1. `.env` file contains correct overrides for sensitive values for corrent environment
2. `mysql.server start` if need to run SQL commands locally
3. If need JSON file locally, file is created from .sql file dump and stored in [./data](./data), if not follow the steps at [pre-requisistes.md](pre-requisistes.md)

### SQL -> Elasticsearch index 🤖

1. Local env `npm run sql_to_elastic` or test env `npm run sql_to_elastic_test`

### SQL -> JSON File 👾

1. Local env `npm run sql_to_json` or test env `npm run sql_to_json_test`

### JSON File -> Elasticsearch index 🤖

Automate with Elasticsearch client

1. Create index in Elasticsearch from existing JSON file: `node json_to_elastic` - edit JSON filename as needed // TODO automate getting this fromSQL -> JSON step
2. Verify the index was created in Elasticsearch Dev Tools: `GET alpacas/_search` - note it uses an alias that is updated `GET _alias/alpacas`

### JSON File -> NDJSON File -> import file to Elasticsearch 💾

Generate NDJSON file to import manually to Elasticsearch

1. Edit the JSON filename to read from in [json_to_ndjson.js](./json_to_ndjson.js) and save the file
2. Run `node json_to_ndjson`
3. Look for the generated file in the directory
4. Import this file to Elasticsearch

## 3. Test app ✅

`npm run test`

## 4. Create data in Elasticsearch from scratch 🎸

- [Data setup in Elasticsearch](elasticsearch_data_setup.md)

## 5. Override database with real world farm categories 🛍️

1. Edit the file [farm_category.js](functions/sql_queries/farm_category.js) to contain actual categories for farms
2. The values in the file overrides values in the database which are not up to date

## 6. Development

Format the code

```
npm run prettier
```

## Credits 👏

- Location data from [Google Maps](https://developers.google.com/maps/documentation/geocoding/)

## License 📝

The work is under exclusive copyright by default.

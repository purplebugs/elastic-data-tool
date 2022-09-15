# Elastic Data Tool ⚒️

Convert data to formats to easily ingest into Elasticsearch

## Purpose 💖

Personal learning project which should result in a greater understanding of how to manipulate data formats, eg

- SQL -> JSON (Status: TO DO)
- JSON -> NDJSON -> import file to Elasticsearch
- geo decoding JSON data containing location by adding latitude, longitude from address fields using external API
- geo enriching JSON data containing location by adding population statistics using external API
- JSON -> NDJSON -> Elasticsearch API `POST /_bulk` command, eg

```
POST grocery-store/_bulk
{"index":{"_id":1}}
{"title": "Eple og Ingefærjuice", "category": "Juice og fruktdrikker", "subCategory": "Frukt- og bærjuice"}
{"index":{"_id":2}}
{"title": "Grans Taffel Eple", "category": "Vann og mineralvann", "subCategory": "Vann med kullsyre"}Op
```

## Install app 🐣

1. Clone repo and navigate to new repo
2. Run `npm install`

## Use the app 🎷

Pre-requisites

1. Create folder at root level named [./data](./data) - used for locally storing JSON files that will not be committed to the repo
2. JSON file is created from SQL query or otherwise and stored in [./data](./data)
3. Note: SQL to JSON tool is in progress. To try proof of concept Run `node SQL-to-JSON.cjs`

Steps 🪜

Option one: Generate NDJSON file to import to Elasticsearch 💾

1. Edit the JSON filename to read from in [index.js](./index.js) and save the file
2. Run `node index`
3. Look for the generated file in the directory
4. Import this file to Elasticsearch

Option two: To generate a POST body of an API \_bulk query: 🤖

1. Before running the script, uncomment the line that references `POST /_bulk` then at the final step use the contents of the generated file as the POST body
2. Run Steps 1-3 above
3. Use the contents of generated file as the POST body of an `POST /_bulk` to copy into Kibana DevTools

Geo enrich: current status

1. Run `node functions/geo-enrich/population-by-municipality.js` to generate a standalone NDJSON file in [./functions/geo-enrich](./functions/geo-enrich) containing population by min

```
{"municipalityNumber":"K-3001","municipalityName":"Halden","population":31444}
{"municipalityNumber":"K-3002","municipalityName":"Moss","population":50290}
```

## Create data in Elasticsearch from scratch 🎸

- [Data setup in Elasticsearch](elasticsearch-data-setup.md)

## License 📝

The work is under exclusive copyright by default.

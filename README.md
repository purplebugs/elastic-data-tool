# Elastic Data Tool ⚒️

Convert data to formats to easily ingest into Elasticsearch

## Purpose 💖

Personal learning project which should result in a greater understanding of how to manipulate data from formats such as

- SQL
- JSON

into formats that Elasticsearch likes such as

- NDJSON
- API commands with JSON body

```
POST grocery-store/_bulk
{"index":{"_id":1}}
{"title": "Eple og Ingefærjuice", "category": "Juice og fruktdrikker", "subCategory": "Frukt- og bærjuice"}
{"index":{"_id":2}}
{"title": "Grans Taffel Eple", "category": "Vann og mineralvann", "subCategory": "Vann med kullsyre"}
{"index":{"_id":3}}
```

and

- enriching data with location by adding latitude, longitude from address fields using external API

## Install app 🐣

1. Clone repo and navigate to new repo
2. Run `npm install`

## Use the JSON -> NDJSON Elastic compatible app

Pre-requisites

1. Create folder at root level named [data](data) - used for locally storing JSON files that will not be committed to the repo
2. JSON file is created from SQL query or otherwise and stored in [./data](./data)

Steps

1. Edit the JSON filename to read from in [index.js](./index.js) and save the file
2. Run `node index`
3. Look for the generated file in the directory
4. Use the contents of this file to import into Elasticsearch - currently it the POST body of an API \_bulk query to copy into Kibana DevTools

Create data in Elasticsearch from scratch

- [Data setup in Elasticsearch](elasticsearch-data-setup.md)

## License 📝

The work is under exclusive copyright by default.

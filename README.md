# Elastic Data Tool ⚒️

Convert data to formats to easily ingest into Elasticsearch


## Purpose 💖

Personal learning project which should result in a greater understanding of how to manipulate data from formats such as

- SQL
- JSON 

into formats that Elasticsearch likes such as 

- NDJSON 
- API commands with JSON body such as 

```
POST grocery-store/_bulk
{"index":{"_id":1}}
{"title": "Eple og Ingefærjuice", "category": "Juice og fruktdrikker", "subCategory": "Frukt- og bærjuice"}
{"index":{"_id":2}}
{"title": "Grans Taffel Eple", "category": "Vann og mineralvann", "subCategory": "Vann med kullsyre"}
{"index":{"_id":3}}
```


## License 📝

The work is under exclusive copyright by default.

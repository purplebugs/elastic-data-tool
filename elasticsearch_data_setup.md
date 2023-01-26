## 1. Create index with mappings 🦙 📝

- Clean start

```
DELETE alpaca-anita-geopoint
```

- Create mapping

```
PUT alpaca-anita-geopoint
{
  "mappings": {
    "properties": {
      "alpacaId": {
        "type": "long"
      },
      "alpacaShortName": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "city": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "color1": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "country": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "dateOfBirth": {
        "type": "date"
      },
      "dateOfDeath": {
        "type": "date"
      },
      "gender": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "keeper": {
        "type": "long"
      },
      "location": {
        "properties": {
          "coordinates": {
            "type": "geo_point"
          }
        }
      },
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "street": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "webpage": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "zip": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      }
    }
  }
}
```

- Index data into index

```
##  Note: Copy/paste contents of file generated after running tool as body of PUT command

PUT alpaca-anita-geopoint/_bulk
{"index":{"_id":2}}
{"zip":"1234","city":"Some city","name":"Alpaca cutie","color1":"COLOR_WHITE","gender":"SEX_MALE","keeper":345,"street":"Wergelandsveien 15","country":"NO","webpage":"http://www.something.no/","alpacaId":789,"dateOfBirth":"2009-10-23","dateOfDeath":null,"alpacaShortName":"CUTE ALPACA","location":{"type":"Point","coordinates":[10.97662911768462,90.295708720373376]}}
{"index":{"_id":3}}
{"zip":"1234","city":"Some city","name":"Alpaca cutie two","color1":"COLOR_WHITE","gender":"SEX_FEMALE","keeper":345,"street":"Wergelandsveien 15","country":"NO","webpage":"http://www.something.no/","alpacaId":789,"dateOfBirth":"20015-01-02","dateOfDeath":null,"alpacaShortName":"CUTE ALPACA TWO","location":{"type":"Point","coordinates":[10.97662911768462,90.295708720373376]}}
```

- Verify data and mappings

```
GET alpaca-anita-geopoint/_search

GET alpaca-anita-geopoint/_mapping

```

## 2. Update documents 🦙 📄

- Update location coordinates of part of document 1

- Note: 0,0 places the document location on equator on a map

```
POST alpaca-anita-geopoint/_update/1
{
  "doc": {
    "location": {
      "type": "Point",
      "coordinates": [
        0,
        0
      ]
    }
  }
}
```

- Note: null,null excludes the document location from map

```
POST alpaca-anita-geopoint/_update/1
{
  "doc": {
    "location": {
      "type": "Point",
      "coordinates": [
        null,
        null
      ]
    }
  }
}
```

## 3. Update alapaca index with public farm flag 🦙 💐

- Create index containing only public farms
- Tip, generate this command using this tool as per README

```
POST alpaca-public-farms/_bulk
{"index":{"_id":1}}
{"keeper":32,"name":"Farm name 1","public":true}
{"index":{"_id":2}}
{"keeper":16,"name":"Farm name 2","public":true}
```

- Create enrich policy to add public facing farm flag

```
PUT _enrich/policy/add_public_farm_policy
{
  "match": {
    "indices": "alpaca-public-farms",
    "match_field": "keeper",
    "enrich_fields": ["public"]
  }
}

POST _enrich/policy/add_public_farm_policy/_execute

```

- Create processor that uses policy

```
PUT _ingest/pipeline/Flag public alpaca farms
{
  "processors": [
  {
    "enrich": {
      "field": "keeper",
      "policy_name": "add_public_farm_policy",
      "target_field": "farmType"
    }
  },
  {
    "set": {
      "field": "farmType.public",
      "value": "false",
      "if": "ctx.farmType == null"
    }
  },
  {
    "convert": {
      "field": "farmType.public",
      "type": "boolean"
    }
  }
]
}
```

- Create new index using public farm policy

```
POST _reindex
{
  "source": {
    "index": "alpacas-all-public-before-enrich"
  },
  "dest": {
    "index": "alpacas-enriched-with-public-farm-flag",
    "op_type": "create",
    "pipeline": "Flag public alpaca farms"
  }
}
```

- Verify

```
GET alpacas-enriched-with-public-farm-flag/_search
{
  "query": {
    "match": {
      "farmType.public": true
    }
  }
}
```

## 4. Use alias to keep index up to date in an automated way 🦙 🤖

Steps 🪜

1. Create index template containing mappings used by indices starting with name eg. `alpacas-*`
2. Alias eg. `alpacas` created used to point to latest index, eg `alpacas-2022-11-05_13-59`. Old index will be removed from the alias, new index added to the alias.

Note

- If the alias doesn’t exist, the request creates it. Ref [aliases.html#add-alias](https://www.elastic.co/guide/en/elasticsearch/reference/current/aliases.html#add-alias)
- During this swap the alias will have no downtime. Ref [aliases.html#multiple-actions](https://www.elastic.co/guide/en/elasticsearch/reference/current/aliases.html#multiple-actions)

```
# Create index template

PUT _index_template/alpacas_template
{
  "index_patterns": "alpacas-*",
  "template": {
    "mappings": {
      "properties": {
        "alpacaId": {
          "type": "long"
        },
        "alpacaShortName": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "city": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "color1": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "country": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "dateOfBirth": {
          "type": "date"
        },
        "dateOfDeath": {
          "type": "date"
        },
        "gender": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "keeper": {
          "type": "long"
        },
        "location": {
          "properties": {
            "coordinates": {
              "type": "geo_point"
            }
          }
        },
        "name": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "street": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "webpage": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "zip": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        }
      }
    }
  }
}

```

```
# Alias points to latest index

POST _aliases
{
  "actions": [
    {
      "remove": {
        "index": "alpacas-2022-09-01_11-20",
        "alias": "alpacas"
      }
    },
    {
      "add": {
        "index": "alpacas-2022-11-05_13-59",
        "alias": "alpacas"
      }
    }
  ]
}
```

## 5. Experiment

### Calculate human to alpaca ratio 🦙 🧮

- TODO filter out alpacas that are dead 🦙 😢

#### Script field to existing index

- For all municipalities (there are 80) return top 10 human to alpaca ratio

```
GET alpaca-anita-population-by-municipality/_search
{
  "size": 0,
  "query": {
    "bool": {
      "should": [
        {
          "exists": {
            "field": "found.population"
          }
        }
      ],
      "minimum_should_match": 1
    }
  },
  "aggs": {
    "municipality_buckets": {
      "terms": {
        "field": "found.municipalityName.keyword",
        "size": 80
      },
      "aggs": {
        "alpacas_per_municipality": {
          "cardinality": {
            "field": "alpacaId"
          }
        },
        "humans_per_municipality": {
          "max": {
            "field": "found.population"
          }
        },
        "alpaca_to_population_percentage": {
          "bucket_script": {
            "buckets_path": {
              "alpacas_per_muni": "alpacas_per_municipality",
              "humans_per_muni": "humans_per_municipality"
            },
            "script": "(params.alpacas_per_muni / params.humans_per_muni) * 100"
          }
        },
        "alpaca_to_population_percentage_bucket_sort": {
          "bucket_sort": {
            "sort": [
              {
                "alpaca_to_population_percentage": "desc"
              }
            ],
            "size": 10
          }
        }
      }
    }
  }
}
```

#### Transformed index with script field

- TODO Order by highest percent, show top 10 only

```
PUT _transform/alpaca-anita-population-transform-and-percent
{
  "source": {
    "index": [
      "alpaca-anita-population-by-municipality"
    ],
    "query": {
      "bool": {
        "should": [
          {
            "exists": {
              "field": "found.population"
            }
          }
        ],
        "minimum_should_match": 1
      }
    }
  },
  "pivot": {
    "group_by": {
      "found.municipalityName": {
        "terms": {
          "field": "found.municipalityName.keyword"
        }
      }
    },
    "aggregations": {
      "alpacaId.cardinality": {
        "cardinality": {
          "field": "alpacaId"
        }
      },
      "found.population.max": {
        "max": {
          "field": "found.population"
        }
      },
      "alpaca_to_population_percentage": {
        "bucket_script": {
          "buckets_path": {
            "alpacas_per_municipality": "alpacaId.cardinality.value",
            "humans_per_municipality": "found.population.max.value"
          },
          "script": "(params.alpacas_per_municipality / params.humans_per_municipality) * 100"
        }
      }
    }
  },
  "description": "alpaca-anita-population-transform-and-percent Transform Group by MunicipalityName calculate percent",
  "dest": {
    "index": "alpaca-anita-population-transform-and-percent"
  }
}
```

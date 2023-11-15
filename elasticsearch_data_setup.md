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

## 3. Use alias to keep index up to date in an automated way 🦙 🤖

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

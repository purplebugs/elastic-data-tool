import dotenv from "dotenv";
const config = dotenv.config();
import { Client } from "@elastic/elasticsearch";

// Ref https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html
const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID,
  },
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
});

const indexName = "alpacas";
const indexTemplateName = `${indexName}_template`;
const indexPatterns = `${indexName}-*`;

// TODO do I want to create alias as part of the template?
// TODO Instead POST _aliases actions remove "alpacas-*" add "alpacas-newly-created"
const template = {
  name: indexTemplateName,
  create: true,
  index_patterns: indexPatterns,
  template: {
    mappings: {
      properties: {
        alpacaId: {
          type: "long",
        },
        alpacaShortName: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        city: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        color1: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        country: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        dateOfBirth: {
          type: "date",
        },
        dateOfDeath: {
          type: "date",
        },
        gender: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        keeper: {
          type: "long",
        },
        location: {
          properties: {
            coordinates: {
              type: "geo_point",
            },
          },
        },
        name: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        street: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        webpage: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        zip: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
      },
    },
    aliases: {
      alpacas: {},
    },
  },
};

const alpacaDocument_1 = {
  zip: "0577",
  country: "NO",
  alpacaId: 9876543210,
  gender: "SEX_FEMALE",
  alpacaShortName: "ANITA IS COOL",
  city: "Tøyen",
  dateOfDeath: null,
  keeper: 30,
  dateOfBirth: null,
  color1: "COLOR_LIGHT_FAWN",
  public: false,
  farmType: {
    public: true,
    keeper: 30,
  },
  street: "Alpaca street",
  name: "Anita's Alpacas",
  populationByMunicipality: "not found",
  location: {
    kommunenavn: null,
    coordinates: [null, null],
    kommunenummer: null,
    type: "Point",
  },
  webpage: "http://www.AnitaLovesAlpacas.com/",
};

const alpacaDocument_2 = {
  zip: "0577",
  country: "NO",
  alpacaId: 9999943210,
  gender: "SEX_MALE",
  alpacaShortName: "THOR IS COOL",
  city: "Tøyen",
  dateOfDeath: null,
  keeper: 30,
  dateOfBirth: null,
  color1: "COLOR_BLACK",
  public: false,
  farmType: {
    public: true,
    keeper: 30,
  },
  street: "Alpaca street",
  name: "Anita's Alpacas",
  populationByMunicipality: "not found",
  location: {
    kommunenavn: null,
    coordinates: [null, null],
    kommunenummer: null,
    type: "Point",
  },
  webpage: "http://www.AnitaLovesAlpacas.com/",
};

async function createIndexWithDocuments(indexName) {
  const indexTemplateExists = await client.indices.existsIndexTemplate({
    name: indexTemplateName,
  });

  console.log(
    `[LOG] Index template: ${indexTemplateName} exists: ${indexTemplateExists}`
  );

  if (!indexTemplateExists) {
    console.log(
      `[LOG] Index template: ${indexTemplateName} does not exist, create`
    );
    const resultCreateIndexTemplate = await client.indices.putIndexTemplate(
      template
    );

    console.log(
      `[LOG] Result of create index template: ${JSON.stringify(
        resultCreateIndexTemplate
      )}`
    );
  }

  // TODO create the index using the NDJSON generated from SQL database instead
  const resultCreateIndex = await client.bulk({
    index: indexName,
    body: [{ create: {} }, alpacaDocument_1, { create: {} }, alpacaDocument_2],
  });

  console.log(
    `[LOG] Result of create index: ${JSON.stringify(resultCreateIndex)}`
  );
}

createIndexWithDocuments(indexName).catch(console.log);

import config from "../../config/config.js";
import { Client } from "@elastic/elasticsearch";

// Ref https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html
const client = new Client({
  cloud: {
    id: config.get("cloud.id"), //process.env.ELASTIC_CLOUD_ID,
  },
  auth: {
    username: config.get("auth.username"),
    password: config.get("auth.password"),
  },
});

const indexName = `alpacas`;
const indexTemplateName = `alpacas_template`;
const indexPatterns = `alpacas-*`;

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

const CreateIndexName = (indexName) => {
  const addLeadingZero = (number) => (number < 10 ? `0${number}` : number);

  const date = new Date();
  const month = addLeadingZero(date.getMonth() + 1);
  const day = addLeadingZero(date.getDate());
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  return `${indexName}-${date.getFullYear()}-${month}-${day}_${hours}-${minutes}`;
};

const SwitchAlias = async (newIndexName, aliasName) => {
  let actions = [
    {
      add: {
        index: newIndexName,
        alias: indexName,
      },
    },
  ];

  // TODO can check to remove old alias only if exists, meanwhile simply remove all that match
  actions.unshift({
    remove: {
      index: `alpacas-*`,
      alias: indexName,
    },
  });

  console.log("[LOG] Alias actions: ", actions);

  try {
    await client.indices.updateAliases({
      body: {
        actions: actions,
      },
    });
    return true;
  } catch (error) {
    console.error(JSON.stringify(error));
    return false;
  }
};

export default async function createIndexWithDocuments(alpacaArray) {
  const indexNameWithTimestamp = CreateIndexName(indexName);

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

  const resultCreateIndex = await client.bulk({
    index: indexNameWithTimestamp,
    body: alpacaArray, // [{ create: {} }, alpacaDocument_1, { create: {} }, alpacaDocument_2], // alpacaArray,
  });

  console.log(
    `[LOG] Result of create index: ${JSON.stringify(resultCreateIndex)}`
  );

  const resultSwitchAlias = await SwitchAlias(
    indexNameWithTimestamp,
    indexName
  );

  console.log(
    `[LOG] Result of switch alias: ${JSON.stringify(resultSwitchAlias)}`
  );

  // TODO remove old indices
}

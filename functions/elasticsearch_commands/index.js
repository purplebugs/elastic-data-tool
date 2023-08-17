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
const indexTemplateName = `${indexName}_index_template`;
const indexPatterns = `${indexName}-*`;

const indexTemplate = {
  name: indexTemplateName,
  create: true,
  index_patterns: indexPatterns,
  priority: 1,
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

const createIndexName = (indexName) => {
  try {
    const addLeadingZero = (number) => (number < 10 ? `0${number}` : number);

    const date = new Date();
    const month = addLeadingZero(date.getMonth() + 1);
    const day = addLeadingZero(date.getDate());
    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    return `${indexName}-${date.getFullYear()}-${month}-${day}_${hours}-${minutes}`;
  } catch (error) {
    console.error(error);
    throw new Error("🧨 createIndexName: Could not create index name");
  }
};

const createIndexTemplate = async (indexTemplateName) => {
  try {
    const indexTemplateExists = await client.indices.existsIndexTemplate({
      name: indexTemplateName,
    });

    console.log(`[LOG] Index template: ${indexTemplateName} exists: ${indexTemplateExists}`);

    if (!indexTemplateExists) {
      console.log(`[LOG] Index template: ${indexTemplateName} does not exist, create`);
      const resultCreateIndexTemplate = await client.indices.putIndexTemplate(indexTemplate);

      if (!resultCreateIndexTemplate.acknowledged) {
        console.error(error);
        throw new Error("🧨 createIndexTemplate:", resultCreateIndexTemplate);
      }

      console.log(`[LOG] ✅ Result of create index template:`, resultCreateIndexTemplate);
    }
  } catch (error) {
    console.error(error);
    throw new Error("🧨 createIndexTemplate:", error);
  }
};

const switchAlias = async (newIndexName, indexName) => {
  try {
    let actions = [
      {
        remove: {
          index: `alpacas-*`,
          alias: indexName,
        },
      },
    ];

    actions.push({
      add: {
        index: newIndexName,
        alias: indexName,
      },
    });

    console.log("[LOG] Alias actions:", actions);

    const resultSwitchAlias = await client.indices.updateAliases({
      body: {
        actions: actions,
      },
    });

    if (!resultSwitchAlias.acknowledged) {
      console.error(error);
      throw new Error("🧨 switchAlias:", resultSwitchAlias);
    }

    console.log(`[LOG] ✅ Result of switch alias:`, resultSwitchAlias);
  } catch (error) {
    console.error(error);
    throw new Error("🧨 switchAlias:", error);
  }
};

export default async function createIndexWithDocuments(alpacaArray) {
  try {
    const indexNameWithTimestamp = createIndexName(indexName);
    await createIndexTemplate(indexTemplateName);

    const resultCreateIndex = await client.bulk({
      index: indexNameWithTimestamp,
      body: alpacaArray, // [{ create: {} }, alpacaDocument_1, { create: {} }, alpacaDocument_2],
    });

    if (resultCreateIndex.errors) {
      console.error(error);
      throw new Error("🧨 resultCreateIndex:", resultCreateIndex);
    }

    console.log(
      `[LOG] ✅ Result of create index - Errors: ${resultCreateIndex.errors} - Total items: ${resultCreateIndex.items.length}`
    );

    await switchAlias(indexNameWithTimestamp, indexName);
  } catch (error) {
    console.error(error);
    throw new Error("🧨 createIndexWithDocuments:", error);
  }
}

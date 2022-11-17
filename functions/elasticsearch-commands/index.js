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

const indexTemplateName = "alpacas_template";

const template = {
  name: indexTemplateName,
  create: true,
  index_patterns: "alpacas-*",
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
  },
};

async function setupIndices() {
  const indexTemplateExists = await client.indices.existsIndexTemplate({
    name: indexTemplateName,
  });

  console.log(`[LOG] Index template exists: ${indexTemplateExists}`);

  if (!indexTemplateExists) {
    console.log("[LOG] Index template does not exit, create");
    const resultCreateIndexTemplate = await client.indices.putIndexTemplate(
      template
    );

    console.log(
      `[LOG] Result of create index template: ${JSON.stringify(
        resultCreateIndexTemplate
      )}`
    );
  }

  // TODO create the index
}

setupIndices().catch(console.log);

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

const createComponentTemplate = async (
  componentTemplateName,
  componentTemplate
) => {
  try {
    console.log(
      `[LOG] 🤖 Start of create component template: ${componentTemplateName}`
    );

    const resultCreateComponentTemplate =
      await client.cluster.putComponentTemplate({
        name: componentTemplateName,
        template: componentTemplate.template,
        create: componentTemplate.create,
        _meta: componentTemplate._meta,
      });

    if (!resultCreateComponentTemplate.acknowledged) {
      console.error(error);
      throw new Error(
        "🧨 createComponentTemplate:",
        resultCreateComponentTemplate
      );
    }

    console.log(
      `[LOG] ✅ Result of create component template: ${componentTemplateName}`,
      resultCreateComponentTemplate
    );
  } catch (error) {
    console.error(error);
    throw new Error("🧨 createComponentTemplate:", error);
  }
};

const createIndexTemplate = async (indexTemplateName, indexTemplate) => {
  try {
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
      const resultCreateIndexTemplate =
        await client.indices.putIndexTemplate(indexTemplate);

      if (!resultCreateIndexTemplate.acknowledged) {
        console.error(error);
        throw new Error("🧨 createIndexTemplate:", resultCreateIndexTemplate);
      }

      console.log(
        `[LOG] ✅ Result of create index template:`,
        resultCreateIndexTemplate
      );
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
          index: `${indexName}-*`,
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

export default async function createIndexWithDocuments(
  indexName,
  items,
  componentTemplate,
  componentTemplate2 = null
) {
  try {
    const componentTemplateName = `${indexName}_component_template`;
    const componentTemplateName2 =
      `${indexName}_component_template2` ?? componentTemplate2;
    const indexTemplateName = `${indexName}_index_template`;
    const indexPatterns = `${indexName}-*`;

    const composed_of = [componentTemplateName];

    if (componentTemplate2 !== null) {
      composed_of.push(componentTemplateName2);
    }

    const indexTemplate = {
      name: indexTemplateName,
      create: false, // Can create or update existing
      index_patterns: indexPatterns,
      priority: 1,
      composed_of: composed_of,
      template: {
        aliases: {
          indexName: {},
        },
      },
    };

    const indexNameWithTimestamp = createIndexName(indexName);
    await createComponentTemplate(componentTemplateName, componentTemplate);

    if (componentTemplate2 !== null) {
      await createComponentTemplate(componentTemplateName2, componentTemplate2);
    }

    await createIndexTemplate(indexTemplateName, indexTemplate);

    const resultCreateIndex = await client.bulk({
      index: indexNameWithTimestamp,
      body: items, // [{ create: {} }, alpacaDocument_1, { create: {} }, alpacaDocument_2],
    });

    if (resultCreateIndex?.errors === true) {
      console.error(JSON.stringify(resultCreateIndex?.errors));
      throw new Error("🧨 resultCreateIndex:", resultCreateIndex?.errors);
    }

    console.log(
      `[LOG] ✅ Result of create index - Errors: ${resultCreateIndex?.errors} - Total items: ${resultCreateIndex?.items?.length} 💚`
    );

    await switchAlias(indexNameWithTimestamp, indexName);
  } catch (error) {
    console.error(error);
    throw new Error("🧨 createIndexWithDocuments:", error);
  }
}

export default function bulkSyntax(items) {
  try {
    // For Elasticsearch POST /_bulk body format, eg
    // [{ create: {} }, alpacaDocument_1, { create: {} }, alpacaDocument_2]
    const result = [];
    items.map((item) => {
      result.push({ create: {} });
      result.push(item);
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("🧨 bulkSyntax: Could not create Elasticsearch _bulk syntax");
  }
}

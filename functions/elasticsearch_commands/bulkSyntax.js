export default function bulkSyntax(items) {
  // For Elasticsearch POST /_bulk body format, eg
  //[{ create: {} }, alpacaDocument_1, { create: {} }, alpacaDocument_2],
  const result = [];
  items.map((item) => {
    result.push({ create: {} });
    result.push(item);
  });
  return result;
}

export default {
  create: false, // Replace/update existing. Ref: https://www.elastic.co/guide/en/elasticsearch/reference/8.9/indices-component-template.html#put-component-template-api-query-params
  template: {
    mappings: {
      properties: {
        city: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        countOfAlpacas: {
          type: "long",
        },
        id: {
          type: "long",
        },
        lat: {
          type: "float",
        },
        lng: {
          type: "float",
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
        public: {
          type: "boolean",
        },
        private: {
          type: "boolean",
        },
      },
    },
  },
  _meta: {
    description: "Define JSON structure of document",
  },
};

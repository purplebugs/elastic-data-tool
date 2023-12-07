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
        count: {
          properties: {
            alpacas: {
              properties: {
                status: {
                  properties: {
                    active: {
                      type: "long",
                    },
                    dead: {
                      type: "long",
                    },
                    export: {
                      type: "long",
                    },
                  },
                },
                total: {
                  type: "long",
                },
              },
            },
          },
        },
        descriptionCompany: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        email: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        id: {
          type: "long",
        },
        location: {
          properties: {
            coordinates: {
              type: "geo_point",
            },
            google: {
              properties: {
                formatted_address: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
                },
                place_id: {
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
        phone: {
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
        url: {
          properties: {
            domain: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                },
              },
            },
            full: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                },
              },
            },
            original: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                },
              },
            },
            path: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                },
              },
            },
            pretty: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256,
                },
              },
            },
            scheme: {
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
        webpage: {
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
  _meta: {
    description: "Define JSON structure of document",
  },
};

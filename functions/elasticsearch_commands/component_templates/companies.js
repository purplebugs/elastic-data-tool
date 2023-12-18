export default {
  create: false, // Replace/update existing. Ref: https://www.elastic.co/guide/en/elasticsearch/reference/8.9/indices-component-template.html#put-component-template-api-query-params
  template: {
    mappings: {
      properties: {
        alpacas: {
          properties: {
            all: {
              type: "nested",
              properties: {
                DOB: {
                  type: "date",
                },
                DOD: {
                  type: "date",
                },
                alpacaId: {
                  type: "long",
                },
                alpacaRegisteredName: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
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
                breed: {
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
                color: {
                  properties: {
                    color1: {
                      properties: {
                        pretty: {
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
                      },
                    },
                    color2: {
                      properties: {
                        pretty: {
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
                      },
                    },
                    color3: {
                      properties: {
                        pretty: {
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
                      },
                    },
                    colorSolid: {
                      properties: {
                        pretty: {
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
                      },
                    },
                  },
                },
                companyId: {
                  type: "long",
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
                descriptionAlpaca: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
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
                keeperName: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
                },
                microchipLOC: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
                },
                microchipNumber: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
                },
                status: {
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
                tagColor: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
                },
                tagId: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
                },
                type: {
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
            status: {
              properties: {
                active: {
                  type: "nested",
                  properties: {
                    DOB: {
                      type: "date",
                    },
                    DOD: {
                      type: "date",
                    },
                    alpacaId: {
                      type: "long",
                    },
                    alpacaRegisteredName: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
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
                    breed: {
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
                    color2: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    color3: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    colorSolid: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    companyId: {
                      type: "long",
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
                    descriptionAlpaca: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
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
                    keeperName: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    microchipNumber: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    status: {
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
                    tagColor: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    tagId: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    type: {
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
                dead: {
                  type: "nested",
                  properties: {
                    DOB: {
                      type: "date",
                    },
                    DOD: {
                      type: "date",
                    },
                    alpacaId: {
                      type: "long",
                    },
                    alpacaRegisteredName: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
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
                    breed: {
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
                    color2: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    color3: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    colorSolid: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    companyId: {
                      type: "long",
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
                    descriptionAlpaca: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
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
                    keeperName: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    microchipLOC: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    microchipNumber: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    status: {
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
                    tagColor: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    tagId: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    type: {
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
                export: {
                  type: "nested",
                  properties: {
                    DOB: {
                      type: "date",
                    },
                    alpacaId: {
                      type: "long",
                    },
                    alpacaRegisteredName: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
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
                    breed: {
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
                    color2: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    colorSolid: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    companyId: {
                      type: "long",
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
                    keeperName: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    status: {
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
                    tagColor: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    tagId: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256,
                        },
                      },
                    },
                    type: {
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

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
                  properties: {
                    original: {
                      type: "date",
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
                  },
                },
                DOD: {
                  properties: {
                    original: {
                      type: "date",
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
                  },
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
                        original: {
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
                      },
                    },
                    color2: {
                      properties: {
                        original: {
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
                      },
                    },
                    color3: {
                      properties: {
                        original: {
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
                      },
                    },
                    colorSolid: {
                      properties: {
                        original: {
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
                      properties: {
                        original: {
                          type: "date",
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
                      },
                    },
                    DOD: {
                      properties: {
                        original: {
                          type: "date",
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
                      },
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
                            original: {
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
                          },
                        },
                        color2: {
                          properties: {
                            original: {
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
                          },
                        },
                        color3: {
                          properties: {
                            original: {
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
                          },
                        },
                        colorSolid: {
                          properties: {
                            original: {
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
                          },
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
                      properties: {
                        original: {
                          type: "date",
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
                      },
                    },
                    DOD: {
                      properties: {
                        original: {
                          type: "date",
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
                      },
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
                            original: {
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
                          },
                        },
                        color2: {
                          properties: {
                            original: {
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
                          },
                        },
                        color3: {
                          properties: {
                            original: {
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
                          },
                        },
                        colorSolid: {
                          properties: {
                            original: {
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
                          },
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
                      properties: {
                        original: {
                          type: "date",
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
                      },
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
                            original: {
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
                          },
                        },
                        color2: {
                          properties: {
                            original: {
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
                          },
                        },
                        color3: {
                          type: "object",
                        },
                        colorSolid: {
                          properties: {
                            original: {
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
                          },
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
        lat: {
          type: "float",
        },
        lng: {
          type: "float",
        },
        location: {
          properties: {
            coordinates: {
              type: "float",
            },
            google: {
              properties: {
                administrative_area_level_1: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
                },
                administrative_area_level_2: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
                },
                directions_url_href: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
                },
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
            original: {
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
                country_code: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
                },
                country_code_original: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256,
                    },
                  },
                },
                country_name: {
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
                street: {
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
            type: {
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
        private: {
          type: "boolean",
        },
        public: {
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

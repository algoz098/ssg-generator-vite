
const cssTest = `
.navbar {
  display: flex;
  padding: 4px 8px;
}

.pag-control {
  display: flex;
  padding: 4px 8px;
  align-items: center;
  justify-content: center;
  gap: 16px
}

.navbar a,
.navbar span {
  margin: 4px 8px;
  padding: 4px 8px;
}

.spacer {
  flex-grow: 2;
}

.center-middle {
  display: flex;
  height: calc(100vh - 59px);
  width: 100%;
  align-items: center;
  justify-content: center;
}`

let response = {
  type: 'vite',
  title: 'SSG Generator',
  meta: [
    { name: 'description', content: 'This is a Static Sites Generation\'s Generator' },
    { name: 'robots', content: 'none' },
    { name: 'author', content: 'A author' },
    { name: 'keywords', content: 'SSG,Keywords' },
    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: 'https://metatags.io/' },
    { name: 'og:title', content: 'Meta Tags — Preview, Edit and Generate' },
    { name: 'og:description', content: 'With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!' },
    { name: 'og:image', content: 'https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: 'https://metatags.io/' },
    { name: 'twitter:title', content: 'Meta Tags — Preview, Edit and Generate' },
    { name: 'twitter:description', content: 'With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!' },
    { name: 'twitter:image', content: 'https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png' },
  ],
  css: {
    type: 'css',
    value: cssTest,
    presets: [
      // 'tailwind'
    ]
  },
  stores: {
    test: {
      type: 'composable',
      value: 'this is a store value'
    }
  },
  sources: [
    {
      type: 'items',
      name: 'reqres',
      baseUrl: 'https://reqres.in/api/users',
      paginated: true,
      paginationParameters: {
        name: 'page',
        valueFirst: 1,
        incrementalType: 'page',
        totalKeyName: 'total_pages',
        dataKeyName: 'data'
      },
      fixedParameters: [
        //     {
        //       name: 'size',
        //       value: '10'
        //     }
      ],
      components: {
        item: 'ItemComponent'
      }
    }
  ],
  components: [
    {
      name: 'ItemsReqres',
      is: 'RenderItems',
      content: {},
      props: {
        source: {
          type: 'fixed',
          value: 'reqres'
        },
        page: {
          type: 'route.params',
          value: 'page'
        }
      },
      children: []
    },
    {
      name: 'Line',
      is: 'hr',
      content: {},
      props: {
        style: {
          type: 'fixed',
          value: 'margin: 8px 0px 16px'
        }
      },
      children: [
      ]
    },
    {
      name: 'Spacer',
      is: 'div',
      content: {},
      props: {
        class: {
          type: 'fixed',
          value: 'spacer'
        }
      },
      children: [
      ]
    },
    {
      name: 'ItemAvatar',
      is: 'img',
      content: {},
      props: {
        src: {
          type: 'parent',
          value: 'src'
        }
      },
      children: []
    },
    {
      name: 'ItemName',
      is: 'p',
      content: {
        type: 'multiple',
        value: [
          {
            type: 'parent',
            value: 'name'
          },
          {
            type: 'text',
            value: ' '
          },
          {
            type: 'parent',
            value: 'lastName'
          },
        ]
      },
      props: {
      },
      children: [
      ]
    },
    {
      name: 'ItemComponent',
      is: 'div',
      content: {
        type: 'parent',
        value: 'email'
      },
      props: {
      },
      children: [
        {
          name: 'ItemName',
          events: {},
          props: {
            name: {
              type: 'parent',
              value: 'first_name'
            },
            lastName: {
              type: 'parent',
              value: 'last_name'
            }
          }
        },
        {
          name: 'ItemAvatar',
          events: {},
          props: {
            src: {
              type: 'parent',
              value: 'avatar'
            }
          }
        },
        {
          name: 'Line',
          events: {},
          props: {}
        }
      ]
    },
    {
      name: 'ItemRead',
      is: 'RenderSingleItem',
      content: {},
      methods: {},
      props: {
        targetKey: {
          type: 'fixed',
          value: 'first_name'
        },
        originKey: {
          type: 'fixed',
          value: 'name'
        },
        originPath: {
          type: 'fixed',
          value: 'route.meta'
        },
        name: {
          type: 'fixed',
          value: 'ItemRead'
        },
        source: {
          type: 'fixed',
          value: 'reqres'
        }
      },
      children: []
    },
    {
      name: 'PagControl',
      is: 'div',
      content: {},
      methods: {},
      props: {
        class: {
          type: 'fixed',
          value: 'pag-control'
        }
      },
      children: [
        {
          name: 'BtnPrevPage',
          if: {
            check: true,
            value: [
              {
                from: {
                  type: 'router.params',
                  value: 'page'
                },
                operator: {
                  type: 'fixed',
                  value: 'gt'
                },
                to: {
                  type: 'fixed',
                  value: 1
                }
              }
            ]
          },
          events: {
            click: {
              modifiers: [],
              actions: [
                {
                  type: 'router.params',
                  target: 'page',
                  method: 'sub',
                  value: 1
                }
              ]
            }
          }
        },
        {
          name: 'CurrentPage',
        },
        {
          name: 'BtnNextPage',
          if: {
            check: true,
            value: [
              {
                from: {
                  type: 'router.params',
                  value: 'page'
                },
                operator: {
                  type: 'fixed',
                  value: 'lt'
                },
                to: {
                  type: 'source',
                  source: 'reqres',
                  value: 'total'
                }
              }
            ]
          },
          events: {
            click: {
              modifiers: [],
              actions: [
                {
                  type: 'router.params',
                  target: 'page',
                  method: 'add',
                  value: 1
                }
              ]
            }
          }
        },
      ]
    },
    {
      name: 'BtnNextPage',
      is: 'button',
      content: {
        type: 'text',
        value: "Next page"
      },
      methods: {}
    },
    {
      name: 'BtnPrevPage',
      is: 'button',
      content: {
        type: 'text',
        value: "Prev page"
      },
      methods: {}
    },
    {
      name: 'CurrentPage',
      is: 'div',
      content: {
        type: 'route.params',
        value: "page"
      },
      methods: {}
    },

    {
      name: 'IndexBtn',
      is: 'RouterLink',
      content: {
        type: 'text',
        value: "Home"
      },
      props: {
        class: {
          type: 'fixed',
          value: "class-btn-1"
        },
        to: {
          type: 'fixed',
          value: {
            name: 'index',
          },
        }
      },
      children: []
    },
    {
      name: 'GeorgeBtn',
      is: 'RouterLink',
      content: {
        type: 'text',
        value: "George"
      },
      props: {
        class: {
          type: 'fixed',
          value: "class-btn-1"
        },
        to: {
          type: 'fixed',
          value: '/ler/George',
        }
      },
      children: []
    },
    {
      name: 'ArticlesBtn',
      is: 'RouterLink',
      content: {
        type: 'text',
        value: "Artigos"
      },
      props: {
        class: {
          type: 'fixed',
          value: "class-btn-1"
        },
        to: {
          type: 'fixed',
          value: {
            name: 'items',
            params: {
              page: 1
            }
          },
        }
      },
      children: []
    },
    {
      name: 'NavBar',
      is: 'div',

      content: {
        type: 'text',
        value: "SSG Generator"
      },
      props: {
        class: {
          type: 'fixed',
          value: "navbar",
        },
        style: {
          // type: 'fixed',
          // value: "border-color: #ff0000"
        }
      },
      data: {
        test: null,
      },
      children: [
        {
          name: 'Spacer',
        },
        {
          name: 'IndexBtn',
        },
        {
          name: 'GeorgeBtn',
        },
        {
          name: 'ArticlesBtn',
        }
      ]
    },
    {
      name: 'IndexComponent',
      is: 'div',

      content: {
        type: 'text',
        value: "This is the index page and os rendered based on a JSON data"
      },
      props: {
        class: {
          type: 'fixed',
          value: 'center-middle'
        }
      },
      data: {
      },
      children: [
      ]
    }
  ],
  pages: [
    {
      name: 'Index',
      type: 'Index',
      components: [
        {
          name: 'NavBar'
        },
        {
          name: 'IndexComponent'
        }
      ]
    },
    {
      name: 'PageItems',
      type: 'Index',
      title: 'Test',
      components: [
        {
          name: 'NavBar'
        },
        {
          name: 'ItemsReqres'
        },
        {
          name: 'PagControl'
        }
      ]
    },
    {
      name: 'PageRead',
      type: 'Index',
      components: [
        {
          name: 'NavBar'
        },
        {
          name: 'ItemRead'
        }
      ]
    },
    {
      name: 'Error404',
      type: 'Index',
      components: [
        // {
        //   name: 'Test'
        // }
      ]
    }
  ],
  layouts: [
    {
      name: 'Blank',
      type: 'BlankLayout'
    },
    {
      name: 'Test',
      type: 'TestLayout'
    }
  ],
  routes: [
    {
      path: '/',
      layout: 'Blank',
      name: 'index',
      page: 'Index',
      parameters: []
    },
    {
      path: '/ler',
      layout: 'Blank',
      name: 'read',
      page: 'PageRead',
      parameters: [
        {
          type: 'generate',
          source: 'reqres',
          targetKey: 'first_name',
          name: 'name',
        }
      ],
    },
    {
      path: '/items',
      layout: 'Blank',
      name: 'items',
      page: 'PageItems',
      parameters: [
        {
          type: 'mutable',
          name: 'page',
        }
      ],
    },
  ],
}

module.exports = response
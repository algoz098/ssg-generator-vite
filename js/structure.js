const timeoutPromise = () => {
    return new Promise((resolve, rejection) => {
        setTimeout(() => {
            resolve(mockStrucutre)
        }, 10)
    })
}

const pages = [
    {
        name: 'index',
        type: 'index',
        route: {
            path: '/'
        },
        components: [
            'divText01'
        ]
    },
    {
        name: 'about-us',
        type: 'basic',
        route: {
            path: '/about',
        },
        components: [
            'NuxtLink1',
            'divText01'
        ]
    },
    // {
    //     name: 'articles',
    //     type: 'generator',
    //     data: {
    //         baseUrl: 'https://jsonplaceholder.typicode.com/posts',
    //         paginate: false,
    //         path: [],
    //         routeSlug: 'id'
    //     },
    //     generated: [
    //         'article'
    //     ],
    //     route: {
    //         path: '/articles',
    //     },
    //     components: [
    //         'articleIntro'
    //     ]
    // },
    {
        name: 'articles-pages',
        type: 'generator',
        data: {
            baseUrl: 'https://dummyjson.com',
            single: {
                endpoint: {
                    route: '/products/{id}',
                    dataPath: [
                        'id'
                    ]
                }
            },
            paginate: {
                type: 'slice', // slice, page
                endpoint: {
                    route: '/products',
                },
                perPage: {
                    value: 10,
                    apiKey: 'limit'
                },
                page: {
                    routeKey: 'pagina',
                    apiKey: 'skip'
                },
                lastPage: {
                    apiKey: 'total'
                }
            },
            path: [
                'products'
            ],
            routeSlug: 'id'
        },
        generated: [
            'article'
        ],
        route: {
            path: '/articles-page',
        },
        components: [
            // 'articleIntro'
        ],
        after: [
            // 'pagination',
            'paginationButtons'
        ]
    }

]

const components = [
    {
        name: 'paginationButtons',
        tag: 'div',
        type: 'paginationButtons',
        contextButton: 'pageBtn',
        events: {
        },
        props: {
            style: {
                margin: '16px 0px'
            }
        },
        children: [
        ]
    },
    {
        name: 'pageBtn',
        tag: 'a',
        type: 'basic',
        context: {
            previousPage: {
                props: {
                    text: '<< Anterior',
                    href: {
                        type: 'interpolate',
                        value: '/articles-page/pagina-{pageNumber}',
                        pageNumber: {
                            origin: 'pageNumber',
                            action: 'minus',
                            name: 'pageNumber'
                        }
                    },
                }
            },
            intermediate: {
                props: {
                    text: '...',
                },
            },
            pageButton: {
                props: {
                    text: {
                        type: 'interpolate',
                        value: '{pageNumber}',
                        pageNumber: {
                            origin: 'pageNumber',
                            action: 'context',
                            name: 'pageNumber'
                        }
                    },
                    class: {
                        type: 'interpolate',
                        value: '{disabled}',
                        disabled: {
                            origin: 'condition',
                            action: 'eq',
                            dataOrigin: 'context',
                            dataTarget: 'pageNumber'
                        }
                    },
                    href: {
                        type: 'interpolate',
                        value: '/articles-page/pagina-{pageNumber}',
                        pageNumber: {
                            origin: 'pageNumber',
                            action: 'context',
                            name: 'pageNumber'
                        }
                    }
                }
            },
            nextPage: {
                props: {
                    text: 'Proximo >>',
                    href: {
                        type: 'interpolate',
                        value: '/articles-page/pagina-{pageNumber}',
                        pageNumber: {
                            origin: 'pageNumber',
                            action: 'add',
                            name: 'pageNumber'
                        }
                    }
                },

            }
        },
        events: {
        },
        props: {
            text: {
                type: 'context'
            },
            href: {
                type: 'context'
            },
            class: {
                type: 'context'
            },
            style: {
                border: '1px solid black',
                padding: '8px',
                margin: '10px 2px'
            }
        },
        children: [
        ]
    },
    {
        name: 'pagination',
        tag: 'div',
        type: 'basic',
        events: {
        },
        props: {
        },
        children: [
            'pagePrev',
            'pageNumber',
            'pageNext'
        ]
    },
    {
        name: 'pageNext',
        tag: 'a',
        type: 'basic',
        events: {
        },
        props: {
            text: 'Prox',
            href: {
                type: 'interpolate',
                value: '/articles-page/pagina-{pageNumber}',
                pageNumber: {
                    origin: 'pageNumber',
                    action: 'add',
                    name: 'pageNumber'
                }
            }
        },
        children: [
        ]
    },
    {
        name: 'pageNumber',
        tag: 'span',
        type: 'basic',
        
        events: {
        },
        props: {
            style: 'padding: 5px',
            text: {
                type: 'interpolate',
                value: 'Pagina: {pageNumber}',
                pageNumber: {
                    origin: 'pageNumber',
                    action: 'show',
                    name: 'pageNumber'
                }
            },
        },
        children: [
        ]
    },
    {
        name: 'pagePrev',
        tag: 'a',
        type: 'basic',
        events: {
        },
        props: {
            text: 'Prev',
            href: {
                type: 'interpolate',
                value: '/articles-page/pagina-{pageNumber}',
                pageNumber: {
                    origin: 'pageNumber',
                    action: 'minus',
                    name: 'pageNumber'
                }
            }
        },
        children: [
        ]
    },
    {
        name: 'NuxtLink1',
        tag: 'a',
        type: 'basic',
        events: {
        },
        props: {
            to: '/about',
            class: 'something',
            text: 'NuxtLink1',
        },
        children: []
    },

    {
        name: 'divText01',
        type: 'basic',
        tag: 'div',
        events: {
        },
        props: {
            text: 'Div text 01',
        },
        children: []
    },

    {
        name: 'article',
        type: 'dynamic',
        tag: 'div',
        children: [
            'articleTitle',
            'articleBody'
        ],
        events: {
        },
        props: {
        },
    },

    {
        name: 'articleIntro',
        type: 'dynamic',
        tag: 'div',
        children: [
            'articleTitle'
        ],
        events: {
        },
        props: {
        },
    },

    {
        name: 'articleTitle',
        type: 'dynamic',
        tag: 'a',
        events: {
        },
        props: {
            text: {
                type: 'data',

                path: [
                    'title'
                ],
            },

            href: {
                type: 'interpolate',
                value: '/articles-page/{id}',
                id: {
                    origin: 'data',
                    path: [
                        'id'
                    ]
                }
            }
        },
    },

    {
        name: 'articleBody',
        type: 'dynamic',
        tag: 'div',
        events: {
        },
        props: {
            text: {
                type: 'data',

                path: [
                    'description'
                ],
            },
        },
    }
]

const mockStrucutre = {
    pages,
    components
}

export let structure;

export async function load() {
    console.log('LOADING STRUCTURE')
    const res = await timeoutPromise()
    structure = res
    console.log('LOADED STRUCTURE')
    return res
}
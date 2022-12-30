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
            'tailwindBtn'
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
    {
        name: 'articles',
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
        generated: {
            metatags: [
                {
                    name: 'description',
                    value: {
                        type: 'data',

                        path: [
                            'description'
                        ],
                    },
                    ogTag: true,
                }
            ],
            components:[
                'article'
            ],
        },
        route: {
            path: '/articles',
        },
        components: [
            'articleIntro'
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
                        value: '/articles/pagina-{pageNumber}',
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
                    class: 'opacity-75'
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
                            from: {
                                origin: 'context'
                            },
                            to: {
                                origin: 'pageNumber',
                            },
                            result: {
                                origin: 'fixed',
                                value: 'cursor-not-allowed focus:outline-none opacity-75'
                            }
                        }
                    },
                    href: {
                        type: 'interpolate',
                        value: '/articles/pagina-{pageNumber}',
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
                        value: '/articles/pagina-{pageNumber}',
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
                type: 'context',
                value: 'my-10 mx-2 p-8 py-3 text-white bg-blue-600 rounded'
            },
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
                value: '/articles/pagina-{pageNumber}',
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
                value: '/articles/pagina-{pageNumber}',
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
        name: 'tailwindBtn',
        type: 'basic',
        tag: 'button',
        events: {
        },
        props: {
            text: 'This is a tailwind button',
            class: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
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
                value: '/articles/{id}',
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
    title: 'SSG Generator',
    language: 'pt-BR',
    icon: {
        type: 'fixed',
        extension: 'png',
        value: 'https://arcode.online/arcode_iot_logo.png'
    },
    metatags: [
        {
            name: 'description',
            value: 'A Static-Site Generator based on dynamic data and articles.',
            ogTag: true,
        }
    ],
    css: {
        tailwind: true
    },
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
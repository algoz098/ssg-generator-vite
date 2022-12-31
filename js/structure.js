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
            'navbar',
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
            'navbar',
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
        before: [
            'navbar',
        ],
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
        name: 'navbar',
        tag: 'nav',
        type: 'basic',
        events: {
        },
        props: {
            class: 'bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900'
        },
        children: [
            'navbar-container'
        ]
    },
    {
        name: 'navbar-container',
        tag: 'div',
        type: 'basic',
        events: {
        },
        props: {
            class: 'container flex flex-wrap items-center justify-between mx-auto'
        },
        children: [
            'logo',
            'menu-toggle',
            'menu'
        ]
    },
    {
        name: 'logo',
        tag: 'a',
        type: 'basic',
        events: {
        },
        props: {
            href: '/',
            class: 'flex items-center'
        },
        children: [
            'logo-text'
        ]
    },
    {
        name: 'logo-text',
        tag: 'span',
        type: 'basic',
        events: {
        },
        props: {
            text: 'SSG Generator',
            class: 'self-center text-xl font-semibold whitespace-nowrap dark:text-white'
        },
        children: [
        ]
    },
    {
        name: 'menu-toggle',
        tag: 'button',
        type: 'basic',
        events: {
        },
        props: {
            'data-collapse-toggle': "navbar-default",
            type: "button",
            text: 'Menu',
            class: "inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
            'aria-controls': "navbar-default",
            'aria-expanded':"false"
        },
        children: [
        ]
    },
    {
        name: 'menu',
        tag: 'div',
        type: 'basic',
        events: {
        },
        props: {
            id: 'navbar-default',
            class: 'hidden w-full md:block md:w-auto'
        },
        children: [
            'menu-list'
        ]
    },
    {
        name: 'menu-list',
        tag: 'ul',
        type: 'basic',
        events: {
        },
        props: {
            class: 'flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'
        },
        children: [
            'menu-home',
            'menu-about',
            'menu-articles'
        ]
    },
    {
        name: 'menu-home',
        tag: 'li',
        type: 'basic',
        events: {
        },
        props: {
        },
        children: [
            'menu-home-a'
        ]
    },
    {
        name: 'menu-home-a',
        tag: 'a',
        type: 'basic',
        events: {
        },
        props: {
            text: 'Home',
            href: '/',
            
            class: {
                value: 'block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-gray-700 {color}',
                type: 'interpolate',
                color: {
                    origin: 'condition', /// FINALIZAR ESSA CONDICAO
                    action: 'eq',
                    from: {
                        origin: 'url'
                    },
                    to: {
                        origin: 'fixed',
                        value: '/'
                    },
                    result: {
                        origin: 'fixed',
                        value: 'text-blue-700'
                    }
                }
            },
        },
        children: [
        ]
    },

    {
        name: 'menu-about',
        tag: 'li',
        type: 'basic',
        events: {
        },
        props: {
        },
        children: [
            'menu-about-a'
        ]
    },
    {
        name: 'menu-about-a',
        tag: 'a',
        type: 'basic',
        events: {
        },
        props: {
            text: 'About',
            href: '/about',
            class: {
                value: 'block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent {color}',
                type: 'interpolate',
                color: {
                    origin: 'condition',
                    action: 'eq',
                    from: {
                        origin: 'url'
                    },
                    to: {
                        origin: 'fixed',
                        value: '/about'
                    },
                    result: {
                        origin: 'fixed',
                        value: 'text-blue-700'
                    }
                }
            },
        },
        children: [
        ]
    },

    {
        name: 'menu-articles',
        tag: 'li',
        type: 'basic',
        events: {
        },
        props: {
        },
        children: [
            'menu-articles-a'
        ]
    },
    {
        name: 'menu-articles-a',
        tag: 'a',
        type: 'basic',
        events: {
        },
        props: {
            text: 'Articles',
            href: '/articles/pagina-1',
            
            class: {
                value: 'block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent {color}',
                type: 'interpolate',
                color: {
                    origin: 'condition', /// FINALIZAR ESSA CONDICAO
                    action: 'in',
                    from: {
                        origin: 'url'
                    },
                    to: {
                        origin: 'fixed',
                        value: '/articles/'
                    },
                    result: {
                        origin: 'fixed',
                        value: 'text-blue-700'
                    }
                }
            },
        },
        children: [
        ]
    },

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
    language: 'en-US',
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
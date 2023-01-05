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
            'carousel'
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
            click: {
                modifiers: [],
                actions: [
                  {
                    type: 'store',
                    target: 'menu',
                    method: 'invert',
                    value: true
                  }
                ]
            }
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
            class: {
                value: '{hidden} w-full md:block md:w-auto',
                type: 'interpolate',
                hidden: {
                    origin: 'store', 
                    store: 'menu',
                    
                    result: {
                        origin: 'fixed',
                        value: 'hidden'
                    }
                }
            },
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
                    origin: 'condition', 
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
                    origin: 'condition', 
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
                            action: 'sub',
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
                    action: 'sub',
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
        name: 'carousel',
        type: 'basic',
        tag: 'div',
        events: {
        },
        props: {
            class: 'relative',
        },
        children: [
            'carousel-container',
            'carousel-pagination',
            'carousel-prev',
            'carousel-next'
        ]
    },
    
    {
        name: 'carousel-container',
        type: 'basic',
        tag: 'div',
        events: {
        },
        props: {
            class: 'relative h-56 overflow-hidden rounded-lg md:h-96',
        },
        children: [
            'carousel-page-1',
            'carousel-page-2',
            'carousel-page-3'
        ]
    },
    
    {
        name: 'carousel-page-1',
        type: 'basic',
        tag: 'div',
        events: {
        },
        props: {
            class: {
                type: 'class',
                'carousel-page-1 duration-700 ease-in-out': true,
                'hidden': {
                    origin: 'store', 
                    store: 'carousel',
                    action: 'neq',
                    to: {
                        origin: 'fixed',
                        value: 1
                    }
                }
            },
        },
        children: [
            'carousel-page-1-text',
            'carousel-page-1-img'
        ]
    },
    
    {
        name: 'carousel-page-1-text',
        type: 'basic',
        tag: 'span',
        events: {
        },
        props: {
            class: 'absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800',
            text: 'First Slide'
        },
        children: [
        ]
    },
    
    {
        name: 'carousel-page-1-img',
        type: 'basic',
        tag: 'img',
        events: {
        },
        props: {
            class: 'absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2',
            src: 'https://flowbite.com/docs/images/carousel/carousel-1.svg',
            alt: '...'
        },
        children: [
        ]
    },
    
    {
        name: 'carousel-page-2',
        type: 'basic',
        tag: 'div',
        events: {
        },
        props: {
            class: {
                value: '{hidden} carousel-page-2 duration-700 ease-in-out',
                type: 'interpolate',
                hidden: {
                    origin: 'store', 
                    store: 'carousel',
                    to: {
                        origin: 'fixed',
                        value: 2
                    },
                    result: {
                        origin: 'fixed',
                        value: ''
                    },
                    else: {
                        origin: 'fixed',
                        value: 'hidden'
                    }
                }
            }
        },
        children: [
            'carousel-page-2-text',
            'carousel-page-2-img'
        ]
    },

    {
        name: 'carousel-page-2-text',
        type: 'basic',
        tag: 'span',
        events: {
        },
        props: {
            class: 'absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800',
            text: 'Second Slide'
        },
        children: [
        ]
    },
    
    {
        name: 'carousel-page-2-img',
        type: 'basic',
        tag: 'img',
        events: {
        },
        props: {
            class: 'absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2',
            src: 'https://flowbite.com/docs/images/carousel/carousel-2.svg',
            alt: '...'
        },
        children: [
        ]
    },

    {
        name: 'carousel-page-3',
        type: 'basic',
        tag: 'div',
        events: {
        },
        props: {
            class: {
                type: 'class',
                'carousel-page-3 duration-700 ease-in-out': true,
                'hidden': {
                    origin: 'store', 
                    store: 'carousel',
                    action: 'neq',
                    to: {
                        origin: 'fixed',
                        value: 3
                    }
                }
            },
        },
        children: [
            'carousel-page-3-text',
            'carousel-page-3-img'
        ]
    },
    
    {
        name: 'carousel-page-3-text',
        type: 'basic',
        tag: 'span',
        events: {
        },
        props: {
            class: 'absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800',
            text: 'Third Slide'
        },
        children: [
        ]
    },
    
    {
        name: 'carousel-page-3-img',
        type: 'basic',
        tag: 'img',
        events: {
        },
        props: {
            class: 'absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2',
            src: 'https://flowbite.com/docs/images/carousel/carousel-3.svg',
            alt: '...'
        },
        children: [
        ]
    },

    {
        name: 'carousel-pagination',
        type: 'basic',
        tag: 'div',
        events: {
        },
        props: {
            class: 'absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2',
        },
        children: [
            'carousel-pagination-1',
            'carousel-pagination-2',
            'carousel-pagination-3'
        ]
    },
    
    {
        name: 'carousel-pagination-1',
        type: 'basic',
        tag: 'button',
        events: {
        },
        props: {
            type: 'button',
            class: 'w-3 h-3 rounded-full',
        },
        children: [
        ]
    },
    
    {
        name: 'carousel-pagination-2',
        type: 'basic',
        tag: 'button',
        events: {
        },
        props: {
            type: 'button',
            class: 'w-3 h-3 rounded-full',
        },
        children: [
        ]
    },
    
    {
        name: 'carousel-pagination-3',
        type: 'basic',
        tag: 'button',
        events: {
        },
        props: {
            type: 'button',
            class: 'w-3 h-3 rounded-full',
        },
        children: [
        ]
    },
    
    {
        name: 'carousel-prev',
        type: 'basic',
        tag: 'button',
        events: {
            click: {
                modifiers: [],
                actions: [
                  {
                    type: 'store',
                    target: 'carousel',
                    method: 'sub',
                    value: 1,
                    min: 1,
                    max: 3
                  }
                ]
            }
        },
        props: {
            type: 'button',
            class: 'absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none',
        },
        children: [
            'carousel-control-prev'
        ]
    },
    
    {
        name: 'carousel-control-prev',
        type: 'basic',
        tag: 'span',
        events: {
        },
        props: {
            class: 'inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none',
        },
        children: [
            'carousel-svg-prev',
            'carousel-span-prev'
        ]
    },
    
    {
        name: 'carousel-span-prev',
        type: 'basic',
        tag: 'span',
        events: {
        },
        props: {
            class: 'sr-only',
            text: "Previous"
        },
        children: [
        ]
    },

    {
        name: 'carousel-svg-prev',
        type: 'basic',
        tag: 'svg',
        events: {
        },
        props: {
            class: 'w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800',
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg"
        },
        children: [
            'carousel-path-prev'
        ]
    },

    {
        name: 'carousel-path-prev',
        type: 'basic',
        tag: 'path',
        events: {
        },
        props: {
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "2",
            d: "M15 19l-7-7 7-7"
        },
        children: [
        ]
    },
    
    {
        name: 'carousel-next',
        type: 'basic',
        tag: 'button',
        events: {
            click: {
                modifiers: [],
                actions: [
                  {
                    type: 'store',
                    target: 'carousel',
                    method: 'sub',
                    value: 1,
                    min: 1,
                    max: 3
                  }
                ]
            }
        },
        props: {
            type: 'button',
            class: 'absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none',
        },
        children: [
            'carousel-control-next'
        ]
    },
    
    {
        name: 'carousel-control-next',
        type: 'basic',
        tag: 'span',
        events: {
        },
        props: {
            class: 'inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none',
        },
        children: [
            'carousel-svg-next',
            'carousel-span-next'
        ]
    },
       
    {
        name: 'carousel-svg-next',
        type: 'basic',
        tag: 'svg',
        events: {
        },
        props: {
            class: 'w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800',
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg"
        },
        children: [
            'carousel-path-next'
        ]
    },

    {
        name: 'carousel-path-next',
        type: 'basic',
        tag: 'path',
        events: {
        },
        props: {
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "2",
            d:"M9 5l7 7-7 7"
        },
        children: [
        ]
    },
    
    {
        name: 'carousel-span-next',
        type: 'basic',
        tag: 'span',
        events: {
        },
        props: {
            text: 'Next',
            class: 'sr-only',
        },
        children: [
        ]
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
    stores: {
        menu: {
            type: 'composable',
            value: true
        },
        carousel: {
            type: 'composable',
            value: 1
        }
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
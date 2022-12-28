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
            baseUrl: 'https://jsonplaceholder.typicode.com',
            single: {
                endpoint: {
                    route: '/posts/{id}',
                    dataPath: [
                        'id'
                    ]
                }
            },
            paginate: {
                endpoint: {
                    route: '/posts',
                },
                perPage: {
                    value: 10,
                    apiKey: '_limit'
                },
                page: {
                    routeKey: 'pagina',
                    apiKey: '_page'
                },
                total: false
            },
            path: [],
            routeSlug: 'id'
        },
        generated: [
            'article'
        ],
        route: {
            path: '/articles-page',
        },
        components: [
            'articleIntro'
        ],
        after: [
            'pagination'
        ]
    }

]

const components = [
    {
        name: 'pagination',
        tag: 'div',
        type: 'basic',
        text: null,
        events: {
        },
        props: {
        },
        children: [
            'pagePrev',
            'pageNext'
        ]
    },
    {
        name: 'pageNext',
        tag: 'a',
        type: 'basic',
        text: 'Prox',
        events: {
        },
        props: {
            href: {
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
        name: 'pagePrev',
        tag: 'a',
        type: 'basic',
        text: 'Prev',
        events: {
        },
        props: {
            href: {
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
            class: 'something'
        },
        text: 'NuxtLink1',
        children: []
    },

    {
        name: 'divText01',
        type: 'basic',
        tag: 'div',
        events: {
        },
        props: {
        },
        text: 'Div text 01',
        children: []
    },

    {
        name: 'article',
        type: 'dynamic',
        tag: 'div',
        renderText: null,
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
        renderText: null,
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
        renderText: [
            'title'
        ],
        events: {
        },
        props: {
            href: {
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
        renderText: [
            'body'
        ],
        events: {
        },
        props: {
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
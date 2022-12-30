import { load, structure } from './structure'
import generatorCss from './css'
import generatorMetatags from './metatags'
import axios from 'axios'

const headers =  { "Accept-Encoding": "gzip,deflate,compress" } 
const routes = []

async function useGenerator(page) {
    if (page.type !== 'generator') return []
    if (!page.data) return []
    if (!page.data.baseUrl) return []
    if (!page.data.path) return []

    console.log(`--- USING GENERATOR ---`)
    console.log(`Base url: ${page.data.baseUrl}`)

    const getPage = async function(currentPage) {
        let {data, pagination} = await grabPage(currentPage, page)
        if (!data || !data.length) return 
        const urlOriginal = `${page.route.path}/${page.data.paginate.page.routeKey}-${currentPage}`
        const props = await getData({urlOriginal, data, pagination})

        const css = await generatorCss(structure, page, true)

        const metatags = await generatorMetatags({
            ...props, structure, data
        }, true)

        const pageRoute = {
            url: urlOriginal,

            pageContext: {
                metatags,
                language: structure.language,
                css,
                pageProps: {
                    ...props,
                    structure: structure,
                    data: data
                }
            }
        }

        routes.push(pageRoute)
    
        let dataKey = page.data.routeSlug
        for (let index = 0; index < data.length; index++) {
            const item = data[index];

            if (!item[dataKey]) continue
            const url = `${page.route.path}/${item[dataKey]}`
            const css = await generatorCss(structure, page, true)
            const props = await getData({urlOriginal: url, data: item, pagination})

            const metatags = await generatorMetatags({
                ...props,
                structure,
                data,
                isGenerated: true,
                dataKey,
                dataValue:
                item[dataKey]
            }, true)

            const articleRoute = {
                url,
    
                pageContext: {
                    css,
                    language: structure.language,
                    metatags,
                    pageProps: {
                        ...props,
                        structure: structure,
                        data: item
                    }
                }
            }
            routes.push(articleRoute)
        }

        await getPage(currentPage + 1)
    }
    await getPage(1)
}

function generatePagination (data, currentPage, structurePaginate) {
    const result = {
        lastPage: data[structurePaginate.lastPage.apiKey] / structurePaginate.perPage.value,
        page: currentPage,
        perPage: structurePaginate.perPage.value
    }

    return result
}

async function grabPage (currentPage, page) {

    let { route } = page.data.paginate.endpoint
    
    let realPage = currentPage
    if (page.data.paginate.type === 'slice') {
        realPage = currentPage === 1 ? 0 : (currentPage - 1) * page.data.paginate.perPage.value
    }

    let params = { 
        [page.data.paginate.perPage.apiKey]: page.data.paginate.perPage.value,
        [page.data.paginate.page.apiKey]: realPage
    }

    let {data} = await axios.get(`${page.data.baseUrl}${route}`, {params, headers})
    
    if (!data && !data.length) return {
        data: null,
        pagination: null
    }
    
    const pagination = generatePagination(data, currentPage, page.data.paginate)

    for (let index = 0; index < page.data.path.length; index++) {
        const path = page.data.path[index];
        if (data[path]) {
            data = data[path]
            delete pagination[path]
        }
    }

    return {pagination, data}
}
async function grabSingle (urlOriginal, page) {
    const key = urlOriginal.replace(`${page.route.path}/`, '')
    let { dataPath, route } = page.data.single.endpoint

    for (let index = 0; index < dataPath.length; index++) {
        const path = dataPath[index];
        route = route.replace(`{${path}}`, key)
    }
    
    const url = `${page.data.baseUrl}${route}`
    console.log(`Grabbring single ${url}`)

    let {data} = await axios.get(url, {headers})
    if (!data) return
    
    for (let index = 0; index < page.data.path.length; index++) {
        const path = page.data.path[index];
        if (data[path]) data = data[path]
    }

    return data
}

export async function generateRoutes() {
    for (let index = 0; index < structure.pages.length; index++) {
        const page = structure.pages[index];

        if (page.type === 'generator') {
            await useGenerator(page)
        } else {
            const css = await generatorCss(structure, page, true)

            const urlOriginal = page.route.path
            const props = await getData({urlOriginal})
            const metatags = await generatorMetatags({
                structure, ...props
            }, true)
            let route = {
                url: page.route.path,
                pageContext: {
                    css,
                    metatags,
                    language: structure.language,
                    pageProps: {
                        ...props,
                        structure
                    }
                }
            }
            routes.push(route)
        }
    }
}

function getPage (urlOriginal) {
    if (urlOriginal === '/') return structure.pages.find(e => e.type === 'index')
    let result = structure.pages.find((e) => e?.route?.path === urlOriginal)
    
    if (!result) result = structure.pages.find((e) => {
        return e?.route?.path && e?.name !== 'index' && urlOriginal.includes(e.route.path)
    })

    return result
}

function isPage (urlOriginal) {
    const page = getPage(urlOriginal)
    
    if (
        page.type === 'generator' 
        && (
          page.data?.paginate?.page?.routeKey
          && urlOriginal.includes(page.data?.paginate?.page?.routeKey)
        )
    ) return true

    return false
}

function isGenarator(urlOriginal, page) {
    page = page || getPage(urlOriginal)
    if (
        page
        && page.type === 'generator' 
        && (
           urlOriginal === page.route.path
          || isPage(urlOriginal)
        )
    ) return true

    return false
}

function isGenerated (urlOriginal, page) {
    page = page || getPage(urlOriginal)
    if (
        page
        && page.type === 'generator' 
        && urlOriginal !== page.route.path
        && urlOriginal.includes(page.route.path)
        && !isPage(urlOriginal)
    ) return true

    return false
}

function getPageNumber (urlOriginal, page) {
    page = page || getPage(urlOriginal)
    const generator = isGenarator(urlOriginal, page)
    if (!generator) return null
    const parts = urlOriginal.split(`${page.data.paginate.page.routeKey}-`)
    let result = parts[parts.length - 1]
    return Number(result)
}

function getComponents (page, isGenerated) {
    if (isGenerated ) return structure.components.filter((e) => page.generated.components.includes(e.name))
    return structure.components.filter((e) => page.components.includes(e.name))
}

export async function getData({urlOriginal, data, pagination}) {
    if (!structure) await load()
    
    let result = null
    const page = getPage(urlOriginal)
    const pageNumber = getPageNumber(urlOriginal, page)
    const generated = isGenerated(urlOriginal)
    const components = getComponents(page, generated)
    let hasNextPage = false
    let lastPage = false

    if (pageNumber && !data) {
        const {data: resultData, pagination} = await grabPage(pageNumber, page)
        result = resultData
        lastPage = pagination?.lastPage
        if (!pagination) {
            const nextPageRequest = await grabPage(pageNumber+1, page)
            hasNextPage = (!!nextPageRequest.data && nextPageRequest.data.length > 0)
        } else {
            hasNextPage = lastPage > pageNumber
        }
    } else if (pageNumber && pagination) {
        // console.log('EXCEPTION: TO DO <<')
        lastPage = pagination?.lastPage
        hasNextPage = lastPage > pageNumber
    } else if (pageNumber && !pagination) {
        const nextPageRequest = await grabPage(pageNumber+1, page)
        hasNextPage = (!!nextPageRequest.data && nextPageRequest.data.length > 0)
        lastPage = pagination?.lastPage
        hasNextPage = lastPage > pageNumber
    }

    if (generated && !data) {
        result = await grabSingle(urlOriginal, page)
    }

    return {
        data: result,
        page,
        pageNumber,
        hasNextPage,
        lastPage,
        components,
        isGenerated: generated,
        isGenerator: !!pageNumber
    }
}

export default async function start() {
    if (!structure) await load()

    await generateRoutes()

    return {routes}
}
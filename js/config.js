import { load, structure } from './structure'
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
    console.log(`Paginate: ${!page.data.paginate}`)

    const getPage = async function(currentPage) {
        let data = await grabPage(currentPage, page)
        if (!data || !data.length) return
        
        const pageRoute = {
            url: `${page.route.path}/${page.data.paginate.page.routeKey}-${currentPage}`,

            pageContext: {
                pageProps: {
                    struture: structure,
                    data: data
                }
            }
        }

        routes.push(pageRoute)
    
        let dataKey = page.data.routeSlug
        for (let index = 0; index < data.length; index++) {
            const item = data[index];

            if (!item[dataKey]) continue

            const articleRoute = {
                url: `${page.route.path}/${item[dataKey]}`,
    
                pageContext: {
                    pageProps: {
                        struture: structure,
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

async function grabPage (currentPage, page) {
    console.log(`Grabbring page ${currentPage}`)

    let { route } = page.data.paginate.endpoint

    let params = { 
        [page.data.paginate.perPage.apiKey]: page.data.paginate.perPage.value,
        [page.data.paginate.page.apiKey]: currentPage
    }

    let {data} = await axios.get(`${page.data.baseUrl}${route}`, {params, headers})
    
    if (!data || !data.length) return
    
    for (let index = 0; index < page.data.path.length; index++) {
        const path = page.data.path[index];
        if (data[path]) data = data[path]
    }
    return data
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
            let route = {
                url: page.route.path,
                pageContext: {
                    pageProps: {
                        struture: structure
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
    return result
}

function getComponents (page, isGenerated) {
    if (isGenerated ) return structure.components.filter((e) => page.generated.includes(e.name))
    return structure.components.filter((e) => page.components.includes(e.name))
}

export async function getData({urlOriginal}) {
    if (!structure) await load()
    
    let result = null
    const page = getPage(urlOriginal)
    const pageNumber = getPageNumber(urlOriginal, page)
    const generated = isGenerated(urlOriginal)
    const components = getComponents(page, generated)

    if (pageNumber) {
        result = await grabPage(pageNumber, page)
    }

    if (generated) {
        result = await grabSingle(urlOriginal, page)
    }

    return {
        data: result,
        page: page,
        pageNumber: pageNumber,
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
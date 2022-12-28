import { load, structure } from '../js/structure'
import config, {getData} from '../js/config'

async function prerender() {
    if (!structure) await load()

    const { routes } = await config()

    return routes
}

async function onBeforeRender(pageContext) {
    if (!structure) await load()

    let result = await getData(pageContext)

    return {
        pageContext: {
            pageProps: {
                structure: structure,
                ...result 
            }
        }
    }
}

export { prerender, onBeforeRender }
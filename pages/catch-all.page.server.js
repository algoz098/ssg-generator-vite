import { load, structure } from '../js/structure'
import config, {getData} from '../js/config'
import generatorCss from '../js/css'
import generatorMetatags from '../js/metatags'

async function prerender() {
    if (!structure) await load()

    const { routes } = await config()
    return routes
}

async function onBeforeRender(pageContext) {
    if (!structure) await load()

    let result = await getData(pageContext)
    let css = await  generatorCss(structure, result.page);
    let metatags = await generatorMetatags({
        structure, ...result
    })
    return {
        pageContext: {
            css,
            language: structure.language,
            metatags,
            pageProps: {
                structure: structure,
                ...result 
            }
        }
    }
}

export { prerender, onBeforeRender }
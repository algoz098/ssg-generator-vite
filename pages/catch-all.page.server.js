import { load, structure } from '../js/structure'
import config, {getData} from '../js/config'
import generatorCss from '../js/css'
import generatorMetatags from '../js/metatags'
import axios from 'axios'
import fs from 'fs'

async function downloadImage (url, path) {  
    const writer = fs.createWriteStream(path)
  
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
  
    response.data.pipe(writer)
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  }
  
async function prerender() {
    if (!structure) await load()

    console.log('DOWNLOADING REMOTE ICON', structure.icon.value)
    await downloadImage(structure.icon.value,  `./dist/client/assets/favicon.${structure.icon.extension}`)
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
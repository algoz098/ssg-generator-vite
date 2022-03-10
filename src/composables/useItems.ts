import axios from 'axios';
import { ref } from "vue";
import useStructure from './useStructure';


const items: any = ref({})

export default () => {
  const { structure } = useStructure()

  const findByKey = function (sourceName: string, target: string, value: string) {
    const sources = structure.value.sources
    const index = sources.findIndex((e: any) => e.name === sourceName)
    const source = sources[index];
    const dataKeyName = source.paginationParameters.dataKeyName
    for (const key in items.value[sourceName].pages) {
      if (Object.prototype.hasOwnProperty.call(items.value[sourceName].pages, key)) {
        const page = items.value[sourceName].pages[key][dataKeyName];

        for (let index = 0; index < page.length; index++) {
          const item = page[index];

          if (item[target] === value) return item
        }
      }
    }
  }

  const getItems = function (sourceName: string) {
    const sources = structure.value.sources
    const index = sources.findIndex((e: any) => e.name === sourceName)
    const source = sources[index];
    const dataKeyName = source.paginationParameters.dataKeyName
    let result: any = []
    for (const key in items.value[sourceName].pages) {
      if (Object.prototype.hasOwnProperty.call(items.value[sourceName].pages, key)) {
        const page = items.value[sourceName].pages[key][dataKeyName];
        result = [
          ...result,
          ...page
        ]
      }
    }
    return result
  }


  const loadStartPages = async function () {
    for (let index = 0; index < structure.value.sources.length; index++) {
      const source = structure.value.sources[index];

      if (source.type !== 'items') continue
      items.value[source.name] = {
        total: null,
        loadedPages: [],
        preloadedPages: source.paginationParameters.valueFirst + 5,
        pages: {}
      }

      for (let index2 = source.paginationParameters.valueFirst; index2 <= items.value[source.name].preloadedPages; index2++) {
        console.log(`getting page ${index2} from ${source.name}`)

        await loadPage({
          page: index2,
          name: source.name,
          baseUrl: source.baseUrl,
          pageName: source.paginationParameters.name,
          fixedParameters: source.fixedParameters,
          totalKeyName: source.paginationParameters.totalKeyName,
          getTotal: index2 === source.paginationParameters.valueFirst
        })
      }
    }
  }

  const loadPage = async function ({
    page,
    name,
    baseUrl,
    pageName,
    fixedParameters,
    totalKeyName,
    getTotal = false
  }: any) {

    const params = {
      ...Object.assign({}, ...fixedParameters.map((e: any) => ({ [e.name]: e.value }))),
      [pageName]: page
    }

    const { data } = await axios.get(baseUrl, { params });

    if (getTotal) {
      items.value[name].total = data[totalKeyName]

      if (items.value[name].preloadedPages > items.value[name].total) {
        items.value[name].preloadedPages = data[totalKeyName]
      }
    }


    items.value[name].pages[page] = data
    items.value[name].loadedPages.push(String(page))
  }

  return { items, loadPage, loadStartPages, findByKey, getItems }
}
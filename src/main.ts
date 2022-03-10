
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import useItems from './composables/useItems'
import useStructure from './composables/useStructure'
import { getRoutesGenerated } from './js/getRoute'


const {
  load, structure
} = useStructure()

const { items, loadStartPages } = useItems()

const routes: any = []
if (import.meta.env?.VITE_SSG === 'true') {
  let arg: any = process.argv.find((e) => e.includes('--structures'))
  if (arg) {
    arg = arg.replace('--structures=', '')
    arg = Buffer.from(arg, 'base64').toString('utf-8')
    arg = JSON.parse(arg)
    structure.value = arg
  }

  if (structure.value.routes.length < 1) throw `Structure of routes not defined`

  await loadStartPages()
  const routesGenerated = getRoutesGenerated(structure)
  for (let index = 0; index < routesGenerated.length; index++) {
    const route = routesGenerated[index];
    routes.push(route)
  }
}

export const createApp = ViteSSG(
  App,
  // vue-router options
  {
    routes
  },
  async (ctx) => {
    const { initialState, router, onSSRAppRendered, isClient } = ctx

    if (import.meta.env.SSR) {
      await load()
      initialState.structure = structure.value

      await loadStartPages()
      initialState.items = items.value
    } else {
      if (initialState.structure) structure.value = initialState.structure
      else {
        await load()
      }

      if (initialState.items) {
        items.value = initialState.items
      } else {
        await loadStartPages()
      }
    }

    if (!structure.value?.routes?.length) throw `Structure of routes not defined`

    const routesGenerated = getRoutesGenerated(structure)
    for (let index = 0; index < routesGenerated.length; index++) {
      const route = routesGenerated[index];
      router.addRoute(route)
    }

    // console.log(1, router.getRoutes())
    // for (let index = 0; index < structure.value.routes.length; index++) {
    //   const route = structure.value.routes[index];
    //   const result = getRouteGenerated(structure, route)
    //   router.addRoute(result)
    // }

  })
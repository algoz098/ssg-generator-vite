import useItems from '../composables/useItems';
import { getLayoutComponent } from './getLayout';
import { getPageComponent, getPageComponents } from './getPage';

/*
* Receives a route object to create all the routes based on that route
* Returns a flat collection (array) with the routes
*/
export const getRouteGenerated = function (structure: any, route: any) {
  const result: any = []

  const routeCreated: any = {
    path: route.path,
    name: route.name,
    props: {
      components: getPageComponents(structure.value, route.page)
    },
    component: getLayoutComponent(structure.value, route.layout),
  }

  if (route.parameters?.length) {
    for (let index = 0; index < route.parameters.length; index++) {
      let routeName = route.name
      let routePath = `${route.path}`

      const param = route.parameters[index];
      if (param.type === 'mutable') {
        routePath += `/:${param.name}`
        routeName += `_${param.name}`
      } else if (param.type === 'generate') {
        const { getItems } = useItems()
        const {
          source, targetKey, name
        } = param

        const items = getItems(source)
        for (let index = 0; index < items.length; index++) {
          const item = items[index];
          let route1 = {
            path: `${routePath}/${item[targetKey]}`,
            name: `${routePath}_${item[targetKey]}`,
            meta: {
              [name]: item[targetKey]
            },
            props: {
              components: getPageComponents(structure.value, route.page)
            },
            component: getPageComponent(structure.value, route.page)
          }

          result.push(route1)
        }

        continue
      } else {
        routePath += `${param.name}`
      }


      result.push({
        path: routePath,
        name: routeName,
        props: {
          components: getPageComponents(structure.value, route.page)
        },
        component: getPageComponent(structure.value, route.page)
      })
      console.log(1, routePath, routeName, result)
    }
  } else {
    routeCreated.name = route.name
    routeCreated.component = getPageComponent(structure.value, route.page)
    routeCreated.props = {
      components: getPageComponents(structure.value, route.page)
    }
  }
  result.push(routeCreated)

  return result
}

/*
* Creates a array with all the routes based on the structure object
*/
export const getRoutesGenerated = function (structure: any) {
  const routes = structure.value.routes
  let result: any = []

  for (let index = 0; index < routes.length; index++) {
    const route = routes[index];
    result = [
      ...result,
      ...getRouteGenerated(structure, route)
    ]
  }

  return result
}
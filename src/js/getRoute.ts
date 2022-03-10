import useItems from '../composables/useItems';
import { getLayoutComponent, getLayoutName } from './getLayout';
import { getPageComponent, getPageComponents } from './getPage';

export const generateChildren = function (structure: any, route: any): any {
  const children = []

  if (route.parameters?.length) {
    for (let index = 0; index < route.parameters.length; index++) {
      let routeName = route.name
      let routePath = ''

      const param = route.parameters[index];
      if (param.type === 'mutable') {
        routePath += `:${param.name}`
      } else if (param.type === 'generate') {
        const { getItems } = useItems()
        const {
          source, targetKey, name
        } = param

        const items = getItems(source)
        for (let index = 0; index < items.length; index++) {
          const item = items[index];
          let route1 = {
            path: `${routePath}${item[targetKey]}`,
            name: `${routePath}_${item[targetKey]}`,
            meta: {
              [name]: item[targetKey]
            },
            props: {
              components: getPageComponents(structure.value, route.page)
            },
            component: getPageComponent(structure.value, route.page)
          }

          children.push(route1)
        }

        continue
      } else {
        routePath += `${param.name}`
      }

      children.push({
        path: routePath,
        name: routeName,
        props: {
          components: getPageComponents(structure.value, route.page)
        },
        component: getPageComponent(structure.value, route.page)
      })
    }
  } else {
    children.push({
      path: '',
      name: route.name,
      props: {
        components: getPageComponents(structure.value, route.page)
      },
      component: getPageComponent(structure.value, route.page)
    })
  }

  return children
}

export const getRouteGenerated = function (structure: any, route: any) {
  const children = generateChildren(structure, route)
  let routeName = route.name
  if (routeName !== 'index') {
    routeName = getLayoutName(structure.value, route.layout)
  }

  const result: any = {
    path: route.path,
    component: getLayoutComponent(structure.value, route.layout),
    children
  }

  return result
}
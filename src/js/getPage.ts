export const getPageObj = function (structure: any, pageName: any) {
  const { pages } = structure
  return pages.find((e: any) => e.name === pageName)
}

export const getPageComponent = function (structure: any, pageName: any) {
  const page = getPageObj(structure, pageName)
  return () => import(`../pages/${page.type}.vue`)
}

export const getPageComponents = function (structure: any, pageName: any) {
  const page = getPageObj(structure, pageName)
  return page.components
}

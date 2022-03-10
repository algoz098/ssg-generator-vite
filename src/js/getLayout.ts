export const getLayoutObj = function (structure: any, layoutName: any) {
  const { layouts } = structure
  return layouts.find((e: any) => e.name === layoutName)
}

export const getLayoutComponent = function (structure: any, layoutName: any) {
  const layout = getLayoutObj(structure, layoutName)
  return () => import(`../layouts/${layout.type}.vue`)
}

export const getLayoutName = function (structure: any, layoutName: any) {
  const layout = getLayoutObj(structure, layoutName)
  return layout.name
}
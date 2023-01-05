import { computed, ref } from 'vue'
import {
  interpolateInvalid,
  interpolateProp,
  interpolateDataProp,
  interpolateContext,
  interpolateClass
} from './interpolation'

export default function useComponent({
  name,
  data,
  structure,
  pageNumber,
  hasNextPage,
  context,
  url,
  contextData
}) {

  const component = computed(() => structure.components.find(e => e.name === name))

  const isInvalid = interpolateInvalid(component, pageNumber, hasNextPage)

  const classComputed = computed(() => {
    let result = null

    const props = JSON.parse(JSON.stringify(component.value?.props ?? {}))
    if (!props.class) return result
    const prop = props.class

    result = {}

    if (prop.type === 'context') {
      result = interpolateContext({
        component: component.value,
        context,
        contextData,
        name,
        url,
        key: 'class',
        data,
        prop,
        pageNumber
      })
    }

    if (prop.type === 'data') {
      console.error('ERROR, not implemented', prop.type, {prop})

      // props[key] = interpolateDataProp({
      //   name,
      //   key,
      //   data,
      //   prop,
      //   pageNumber
      // })
    }

    if (prop.type === 'interpolate') {
      result = interpolateProp({
        name,
        key: 'class',
        data,
        prop,
        pageNumber,
        url
      })
    }

    if (props.class.type === 'class') {
      result = interpolateClass({
        prop: props.class, name
      })
    }

    return result
  })

  const props = computed(() => {
    
    const props = JSON.parse(JSON.stringify(component.value?.props ?? {}))

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const prop = props[key];
        
        if (
          typeof prop === 'object' &&
          !Array.isArray(prop) &&
          prop !== null
        ) {
          if (prop.type === 'context') {
            props[key] = interpolateContext({
              component: component.value,
              context,
              contextData,
              name,
              url,
              key,
              data,
              prop,
              pageNumber
            })
          }

          if (prop.type === 'data') {
            props[key] = interpolateDataProp({
              name,
              key,
              data,
              prop,
              pageNumber
            })
          }

          if (prop.type === 'interpolate') {
            props[key] = interpolateProp({
              name,
              key,
              url,
              data,
              prop,
              pageNumber
            })
          }

          if (prop.type === 'class') {
            delete props[key]
          }
        }
      }
    }

    return props
  })

  return {
    classComputed,
    isInvalid,
    structure,
    component,
    props,
  }
}
  
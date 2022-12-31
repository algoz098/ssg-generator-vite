import { computed, ref } from 'vue'
import {
  interpolateInvalid,
  interpolateProp,
  interpolateDataProp,
  interpolateContext
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
        }
      }
    }

    return props
  })

  return {
    isInvalid,
    structure,
    component,
    props,
  }
}
  
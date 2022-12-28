import { computed, ref } from 'vue'
import {interpolateData, interpolateProp} from './interpolation'

export default function useComponent(name, data, structure, pageNumber) {
  const component = computed(() => structure.components.find(e => e.name === name))
  
  const isInvalid = ref(false)

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
          props[key] = interpolateProp({isInvalid, name, key, data, prop, pageNumber})
        }
      }
    }

    return props
  })

  return {
    structure,
    isInvalid,
    component,
    props,
  }
}
  
import { computed } from 'vue'
import useStructure from './useStructure'
// import { getPageComponents } fron

export default (props: any) => {
  const { structure } = useStructure()

  const component = computed(() => {
    if (!props?.name) return null
    return structure.value?.components.find((e: any) => e.name === props.name)
  })

  return {
    component
  }
}
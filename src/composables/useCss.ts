import { computed } from 'vue'
import useStructure from './useStructure'

export default () => {
  const { structure } = useStructure()
  const css = computed(() => {
    return structure.value?.css.value
  })

  const hasTailwind = computed(() => {
    return structure.value?.css.presets.includes('tailwind')
  })

  return {
    css,
    hasTailwind
  }
}
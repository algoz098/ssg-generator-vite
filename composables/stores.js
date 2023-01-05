import { ref } from "vue";

export const store = ref({})

export default () => {
  function set(name, value) {
    store.value[name] = value
  }

  return {
    set,
    store,
  }
}
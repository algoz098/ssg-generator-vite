import { ref } from "vue";

const store: any = ref({})

export default () => {
  function set(name: any, value: any) {
    store.value[name] = value
  }

  return {
    set,
    store,
  }
}
import axios from "axios";
import { ref } from "vue";

const loading = ref(false)
const loaded = ref(false)
const structure: any = ref({})

const url = import.meta.env.VITE_STRUCTURE_API || 'http://localhost:5000/'

export default () => {
  async function load() {
    loading.value = true
    console.log(import.meta.env.VITE_STRUCTURE_API)

    try {
      const { data } = await axios.get(url)
      structure.value = data
    } catch (error) {
      console.error(error)
    }
    loaded.value = true

    loading.value = false
  }

  return {
    structure,
    loading,
    loaded,
    load,
  }
}
<template>
  <render-component
    :name="data.name"
    v-for="(data, index) in components"
    :key="index"
  />
</template>

<script setup>
import RenderComponent from "../components/common/RenderComponent.vue";

const props = defineProps({
  components: null,
});
</script>
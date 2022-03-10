<template>
  <render-component
    :name="pageStructure.components.item"
    v-for="(item, index) in data"
    :key="index"
    :parent="item"
  />
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

import useItems from "../../composables/useItems";
import useStructure from "../../composables/useStructure";

import RenderComponent from "./RenderComponent.vue";

const { items } = useItems();
const { structure } = useStructure();

const props = defineProps({
  page: null,
  name: null,
});

const pageData: any = computed(() => {
  if (!props.name) return null;
  if (props.page === null) return null;
  if (!items.value[props.name]?.pages[props.page]) return null;
  return items.value[props.name].pages[props.page];
});

const pageStructure: any = computed(() => {
  return structure.value?.sources?.find((e: any) => e.name === props.name);
});

const data = computed(() => {
  if (!pageData.value) return null;
  if (!pageStructure?.value?.paginationParameters?.dataKeyName) return null;
  return pageData.value[pageStructure.value.paginationParameters.dataKeyName];
});
</script>

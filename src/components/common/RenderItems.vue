<template>
  <render-item :page="page" :name="source" v-if="hasPage" />
</template>

<script setup lang="ts">
import { computed, defineProps, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import RenderItem from "./RenderItem.vue";

import useItems from "../../composables/useItems";
import useStructure from "../../composables/useStructure";

const props = defineProps({
  source: null,
  page: null,
});

const router = useRouter();

const { items, loadPage } = useItems();
const hasPage = computed(() => {
  return items.value[props.source].loadedPages.includes(props.page);
});

onBeforeMount(() => {
  if (
    !Number(props.page) ||
    Number(props.page) > items.value[props.source].total
  ) {
    router.replace("/");
    return;
  }
  if (hasPage.value) return;
  const { structure } = useStructure();

  const source = structure.value.sources.find(
    (e: any) => e.name === props.source
  );

  loadPage({
    page: props.page,
    name: source.name,
    baseUrl: source.baseUrl,
    pageName: source.paginationParameters.name,
    fixedParameters: source.fixedParameters,
    totalKeyName: source.paginationParameters.totalKeyName,
    getTotal: false,
  });
});
</script>

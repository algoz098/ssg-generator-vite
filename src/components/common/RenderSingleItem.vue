<template>
  <pre>{{ item }}</pre>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useRoute } from "vue-router";
import useComponent from "../../composables/useComponent";
import useItems from "../../composables/useItems";
const props = defineProps({
  name: null,
  originPath: null,
  originKey: null,
  targetKey: null,
  source: null,
});

const { findByKey } = useItems();
const route = useRoute();

const item = computed(() => {
  let target: any = "";
  if (props.originPath === "route.meta") {
    target = route.meta[props.originKey];
  }
  return findByKey(props.source, props.targetKey, target);
});

const { component } = useComponent(props);
</script>

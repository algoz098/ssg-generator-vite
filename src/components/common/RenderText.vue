<template>
  <span v-if="type === 'text'">
    {{ value }}
  </span>

  <span v-else-if="type === 'parent'">
    {{ parent[value] }}
  </span>

  <span v-else-if="type === 'route.params'">
    {{ route.params[value] }}
  </span>

  <template v-else-if="type === 'multiple'">
    <render-text
      :parent="parent"
      v-for="(item, index) in value"
      :key="index"
      :value="item.value"
      :type="item.type"
    />
  </template>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
defineProps({
  parent: null,
  value: null,
  type: null,
});
</script>

<template>
  <router-view />
  <tailwind-css v-if="hasTailwind" />
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { defineAsyncComponent } from "vue";

import useCss from "./composables/useCss";
import useStructure from "./composables/useStructure";
import useStore from "./composables/useStore";

const { structure } = useStructure();
const { store, set } = useStore();

const TailwindCss = defineAsyncComponent(
  () => import("./components/css/Tailwind.vue")
);

const { css, hasTailwind } = useCss();

/*
 * TODO
 * Create logic to deal with page's meta tags and objects
 * Add favicons suport
 * solve some pages and index.html not rendering SSG useHead()
 */
useHead({
  title: structure.value.title,
  meta: [
    {
      name: "title",
      content: structure.value.title,
    },
    ...structure.value.meta,
  ],
  style: [
    {
      children: css.value,
    },
  ],
});

if (structure.value.stores) {
  for (const key in structure.value.stores) {
    if (Object.prototype.hasOwnProperty.call(structure.value.stores, key)) {
      const storeCreated = structure.value.stores[key];

      if (storeCreated.type === "composable") {
        set(key, storeCreated.value);
      }
    }
  }
}
</script>

<style>
</style>
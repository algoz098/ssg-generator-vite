<template>
  This is test<br />
  <router-view />
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRoute } from "vue-router";
const props = defineProps({
  page: null,
  components: null,
});

const route = useRoute();
</script>
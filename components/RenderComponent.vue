<template>
    <template v-if="component.type === 'paginationButtons'">
        <pagination-buttons
            :component="component"
            :page-number="pageNumber"
            :has-next-page="hasNextPage"
            :last-page="lastPage"
            :name="name"
            :url="url"
            :data="data"
            :structure="structure"
        />
    </template>

    <component
        v-bind:is="component.tag"
        v-bind="props"
        :class="classComputed?.value ? classComputed.value : ''"
        v-else-if="!isInvalid"
        v-on="eventsHandler"
    >
      <template v-if="props?.text">{{ props.text }}</template>
      
      <template v-if="component.children?.length">
          <render-component
              :name="child"
              v-for="(child, index) in component.children"
              :key="`child_${index}`"
              :last-page="lastPage"
              :url="url"
              :has-next-page="hasNextPage"
              :data="data"
              :page-number="pageNumber"
              :structure="structure"
          />
      </template>
    </component>

    <!-- <template v-if="component?.props?.class?.type === 'class'">
      {{ props.class }}
    </template> -->
</template>

<script setup>
import { computed } from 'vue'
import useComponent from '../composables/component'
import useStore from '../composables/stores'

import PaginationButtons from './PaginationButtons.vue';

const { set, store} = useStore()

const definedProps = defineProps({
    name: String,
    data: Object|undefined,
    structure: Object|undefined,
    pageNumber: String|Number|undefined,
    hasNextPage: Boolean,
    context: String|undefined,
    contextData: Number|String|undefined,
    lastPage: Number|undefined,
    url: String
})

const {
  props,
  classComputed,
  isInvalid,
  component,
} = useComponent({
    name: definedProps.name,
    data: definedProps.data,
    structure: definedProps.structure,
    pageNumber: definedProps.pageNumber,
    hasNextPage: definedProps.hasNextPage,
    context: definedProps.context,
    url: definedProps.url,
    contextData: definedProps.contextData
})

function createHandlers(events) {
  const result = {};
  
  if (!events) return result;

  for (const key in events) {
    if (Object.prototype.hasOwnProperty.call(events, key)) {
      const event = events[key];

      result[key] = function (e) {
        if (event.modifiers.length) {
          if (event.modifiers.includes("preventDefault")) {
            e.preventDefault();
          }
        }

        for (let index = 0; index < event.actions.length; index++) {
          const { type, target, value, method, min, max } = event.actions[index];
          
          if (type === 'store') {
            let result =  null

            if (method === 'set') result = value
            if (method === 'invert') result = !store.value[target]
            if (method === 'sub') {
              result = store.value[target] - value
              if (result < min) result = max
            }

            set(target, result)
          }
        }
      };
    }
  }
  return result;
}


const eventsHandler = computed(() => {
  if (!component?.value) return {}

  let eventsArray = Object.keys(component.value?.events)
  if (!eventsArray.length) return {};

  return createHandlers(component.value?.events);
});

</script>
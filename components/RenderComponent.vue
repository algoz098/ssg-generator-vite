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

    <component v-bind:is="component.tag" v-bind="props" v-else-if="!isInvalid">
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
</template>

<script setup>
import { computed } from 'vue'
import useComponent from '../composables/component'
import PaginationButtons from './PaginationButtons.vue';

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
</script>
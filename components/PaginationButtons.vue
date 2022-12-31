<template>
    <component v-bind:is="component.tag" v-bind="props">
        <render-component
            :page-number="pageNumber"
            :has-next-page="hasNextPage"
            :name="component.contextButton"
            :url="url"
            :data="data"
            :structure="structure"
            context="previousPage"
            v-if="pageNumber > 1"
        />
        <render-component
            :page-number="pageNumber"
            :has-next-page="hasNextPage"
            :url="url"
            :name="component.contextButton"
            :data="data"
            :structure="structure"
            context="pageButton"
            context-data="1"
            v-if="pageNumber > 3"
        />
        <render-component
            :page-number="pageNumber"
            :url="url"
            :has-next-page="hasNextPage"
            :name="component.contextButton"
            :data="data"
            :structure="structure"
            context="intermediate"
            v-if="pageNumber > 4"
        />

        <template v-if="pageNumber > 1">
            <render-component
                :page-number="pageNumber"
                :url="url"
                :has-next-page="hasNextPage"
                :name="component.contextButton"
                :data="data"
                :structure="structure"
                context="pageButton"
                :context-data="data"
                v-for="data in prevPages"
                :key="`prevPages_${data}`"
            />
        </template>

        <render-component
            :page-number="pageNumber"
            :url="url"
            :has-next-page="hasNextPage"
            :name="component.contextButton"
            :data="data"
            :structure="structure"
            context="pageButton"
            :context-data="pageNumber"
        />

        <template v-if="pageNumber < lastPage">
            <render-component
                :url="url"
                :page-number="pageNumber"
                :has-next-page="hasNextPage"
                :name="component.contextButton"
                :data="data"
                :structure="structure"
                context="pageButton"
                :context-data="pageNumber + index"
                v-for="index in (lastPage - pageNumber < 2 ? lastPage - pageNumber : 2)"
                :key="`nextPages_${index}`"
            />
        </template>

        <render-component
            :page-number="pageNumber"
            :url="url"
            :has-next-page="hasNextPage"
            :name="component.contextButton"
            :data="data"
            :structure="structure"
            context="intermediate"
            v-if="pageNumber < lastPage - 3"
        />

        <render-component
            :page-number="pageNumber"
            :has-next-page="hasNextPage"
            :url="url"
            :name="component.contextButton"
            :data="data"
            :structure="structure"
            context="pageButton"
            :context-data="lastPage"
            v-if="pageNumber < lastPage - 2"
        /> 

        <render-component
            :page-number="pageNumber"
            :url="url"
            :has-next-page="hasNextPage"
            :name="component.contextButton"
            :data="data"
            :structure="structure"
            context="nextPage"
            v-if="hasNextPage"
        />

    </component>
</template>

<script setup>
import RenderComponent from './RenderComponent.vue';
import useComponent from '../composables/component'

const {
  props,
} = useComponent({
    name: definedProps.name,
    data: definedProps.data,
    structure: definedProps.structure,
    pageNumber: definedProps.pageNumber,
    url: definedProps.url,
    hasNextPage: definedProps.hasNextPage,
    context: definedProps.context,
    contextData: definedProps.contextData
})

const definedProps = defineProps({
    component: Object,
    name: String,
    url: String,
    data: Object|undefined,
    structure: Object|undefined,
    pageNumber: String|Number|undefined,
    lastPage: Number|undefined,
    hasNextPage: Boolean
})

function generatePrevPages() {
    if (definedProps.pageNumber < 3) return [1]
    return [definedProps.pageNumber - 2, definedProps.pageNumber - 1]
}

const prevPages = generatePrevPages()

</script>
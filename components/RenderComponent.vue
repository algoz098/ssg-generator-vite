<template>
    <component v-bind:is="component.tag" v-bind="props" v-if="!isInvalid">
        <template v-if="data && component.type === 'dynamic'">{{ dataText }}</template>
        
        <template v-if="component.text">{{ component.text }}</template>
        
        <template v-if="component.children?.length">
            <render-component
                :name="child"
                v-for="(child, index) in component.children"
                :key="`child_${index}`"
                :data="data"
                :page-number="pageNumber"
                :structure="structure"
            />
        </template>
    </component>
    <!-- <pre>isInvalid: {{ isInvalid }}</pre> -->
    <!-- <pre><b>name: </b>{{ name }}</pre> -->
    <!-- <pre><b>component: </b>{{ component }}</pre>
    <pre><b>props: </b>{{ props }}</pre> -->
    <!-- 
    <pre><b>data: </b>{{ data }}</pre>
    <hr /> -->

    <!-- <div>pageNumber {{ pageNumber }}</div> -->
</template>

<script setup>
import { computed } from 'vue'
import useComponent from '../composables/component'

const definedProps = defineProps({
    name: String,
    data: Object|undefined,
    structure: Object|undefined,
    pageNumber: String|Number|undefined
})

const {
  props,
  component,
  isInvalid,
} = useComponent(definedProps.name, definedProps.data, definedProps.structure, definedProps.pageNumber)

const dataText = computed(() => {
    let text = '';

    if (!component.value.renderText) return text

    let activeObject = definedProps.data

    for (let index = 0; index < component.value.renderText.length; index++) {
        const path = component.value.renderText[index];
        if (!activeObject[path]) break;
        activeObject = activeObject[path]
    }

    if (activeObject) text = activeObject
    
    return text
})

</script>
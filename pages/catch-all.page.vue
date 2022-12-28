<template>
    <template v-if="loaded">
        <template v-if="isGenerator && pageNumber">
            <template v-for="(data, dataIndex) in data">
                <render-component
                    :page-number="pageNumber"
                    :name="component.name"
                    v-for="(component, index) in components"
                    :key="`component_${dataIndex}_${index}`"
                    :structure="structure"
                    :data="data"
                />
            </template>

            <template v-if="page.after">
                <render-component
                    :page-number="pageNumber"
                    :name="name"
                    v-for="(name, index) in page.after"
                    :key="`after_${dataIndex}_${index}`"
                    :structure="structure"
                    :data="data"
                />
            </template>
        </template>
        
        <render-component
            :page-number="pageNumber"
            :name="component.name"
            v-for="(component, index) in components"
            :key="`component_${index}`"
            :data="data"
            :structure="structure"
            v-else
        /> 
    </template>
    <pre ><b>loaded:</b> {{loaded}}</pre>
    <pre ><b>isGenerated:</b> {{isGenerated}}</pre>
    <pre ><b>isGenerator:</b> {{isGenerator}}</pre>
    <pre ><b>pageNumber:</b> {{pageNumber}}</pre>
    <pre v-if="components"><b>components:</b> {{components}}</pre>
    <pre v-if="page"><b>page:</b> {{page}}</pre>
    <pre v-if="structure"><b>structure:</b> {{structure}}</pre>
    <pre v-if="data"><b>data:</b> {{data}}</pre>
    <pre><b>props:</b> {{props}}</pre>
</template>

<script setup>
import { computed } from 'vue'
import RenderComponent from '../components/RenderComponent.vue'
const props = defineProps([
    'structure',
    'data',
    'pageNumber',
    'page',
    'isGenerated',
    'isGenerator',
    'components'
])
const loaded = computed(() => {
    if (
        props.structure
        && props.components
        && props.page
    ) return true
    return false
})

</script>
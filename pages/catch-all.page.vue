<template>
    <template v-if="loaded">
        <template v-if="isGenerator && pageNumber">
            <template v-if="page.before">
                <render-component
                    :page-number="pageNumber"
                    :has-next-page="hasNextPage"
                    :url="url"
                    :last-page="lastPage"
                    :name="name"
                    v-for="(name, index) in page.before"
                    :key="`before_${dataIndex}_${index}`"
                    :structure="structure"
                    :data="data"
                />
            </template>
            
            <template v-for="(data, dataIndex) in data">
                <render-component
                    :page-number="pageNumber"
                    :has-next-page="hasNextPage"
                    :last-page="lastPage"
                    :url="url"
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
                    :url="url"
                    :has-next-page="hasNextPage"
                    :last-page="lastPage"
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
            :has-next-page="hasNextPage"
            :url="url"
            :last-page="lastPage"
            :name="component.name"
            v-for="(component, index) in components"
            :key="`component_${index}`"
            :data="data"
            :structure="structure"
            v-else
        /> 
    </template>
</template>

<script setup>
import { computed } from 'vue'
import useStore from '../composables/stores'
import RenderComponent from '../components/RenderComponent.vue'

const props = defineProps([
    'structure',
    'data',
    'pageNumber',
    'lastPage',
    'page',
    'url',
    'hasNextPage',
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

const {set, store} = useStore()

if (props.structure.stores) {
    for (const key in props.structure.stores) {
        if (Object.prototype.hasOwnProperty.call(props.structure.stores, key)) {
            const storeCreated = props.structure.stores[key];
            if (storeCreated.type === "composable") {
                set(key, storeCreated.value);
            }
        }
    }
}

</script>
<template>
  <component
    :is="is"
    v-bind="attrsParsed"
    v-on="eventsHandler"
    v-if="component && checkIfParent"
  >
    <render-text
      :parent="parent"
      :value="component.content?.value"
      :type="component.content?.type"
    />

    <template v-if="component.children">
      <render-component
        v-for="(child, index) in component.children"
        :key="index"
        :name="child.name"
        :if="child.if"
        v-on="eventsHandlerChildren[child.name]"
        :parent="getChildAttrs(child.props)"
      />
    </template>
  </component>
</template>

<script setup lang="ts">
import { defineProps, ref, useAttrs, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import useComponent from "../../composables/useComponent";
import useStore from "../../composables/useStore";
import useItems from "../../composables/useItems";

import RenderText from "./RenderText.vue";
import RenderItems from "./RenderItems.vue";
import RenderItem from "./RenderItem.vue";
import RenderSingleItem from "./RenderSingleItem.vue";

const attrs: any = useAttrs();
const { store } = useStore();
const props = defineProps({
  name: null,
  events: null,
  if: null,
  parent: null,
});

const route = useRoute();
const router = useRouter();

const is = computed(() => {
  if (component.value.is === "RenderItems") return RenderItems;
  if (component.value.is === "RenderItem") return RenderItem;
  if (component.value.is === "RenderSingleItem") return RenderSingleItem;
  return component.value.is;
});

function getValue(data: any) {
  if (data.type === "fixed") {
    return data.value;
  }

  if (data.type === "route.params") {
    return route.params[data.value];
  }

  if (data.type === "item") {
    return "route.params[data.value]";
  }

  if (!props.parent || !props.parent[data.value]) {
    return null;
  }

  return props.parent[data.value];
}

const attrsParsed = computed(() => {
  const result: any = {};

  for (const key in component.value.props) {
    if (Object.prototype.hasOwnProperty.call(component.value.props, key)) {
      const prop = component.value.props[key];

      result[key] = getValue(prop);
    }
  }

  for (const key in attrs) {
    if (Object.prototype.hasOwnProperty.call(attrs, key)) {
      const attr = attrs[key];
      result[key] = attr;
    }
  }

  for (const key in eventsHandler.value) {
    if (Object.prototype.hasOwnProperty.call(eventsHandler.value, key)) {
      const event = eventsHandler.value[key];
      result[key] = event;
    }
  }

  return result;
});

function getChildAttrs(childProps: any) {
  const result: any = {};

  for (const key in childProps) {
    if (Object.prototype.hasOwnProperty.call(childProps, key)) {
      const childProp = childProps[key];
      result[key] = getValue(childProp);
    }
  }

  return result;
}

const { component } = useComponent(props);
const data: any = ref({});

function runIf({ from, operator, to }: any) {
  let result = true;

  if (from.type === "router.params") {
    from = route.params[from.value];
  }

  if (to.type === "source") {
    const { items } = useItems();
    to = items.value[to.source][to.value];
  }
  if (to.type === "fixed") {
    to = to.value;
  }

  if (operator.type === "fixed" && operator.value === "lt") {
    result = from < to;
  }

  if (operator.type === "fixed" && operator.value === "gt") {
    result = from > to;
  }

  return result;
}

const checkIfParent = computed(() => {
  if (!props.if?.check) return true;
  let result = false;

  for (let index = 0; index < props.if.value.length; index++) {
    const element = props.if.value[index];
    result = runIf(element);
  }
  return result;
});

if (component.value?.data) {
  for (const key in component.value.data) {
    if (Object.prototype.hasOwnProperty.call(component.value.data, key)) {
      const value = component.value.data[key];
      data.value[key] = value;
    }
  }
}

function getRouterParams(target: any, value: any, method: any): any {
  let parsedTarget = Number(route.params[target]);
  if (method === "add") parsedTarget += value;
  if (method === "sub") parsedTarget -= value;
  return {
    name: route.name,
    params: {
      [target]: parsedTarget,
    },
  };
}

function createHandlers(events: any) {
  const result: any = {};
  if (!events) return result;

  for (const key in events) {
    if (Object.prototype.hasOwnProperty.call(events, key)) {
      const event = events[key];

      result[key] = function (e: any) {
        if (event.modifiers.length) {
          if (event.modifiers.includes("preventDefault")) {
            e.preventDefault();
          }
        }

        for (let index = 0; index < event.actions.length; index++) {
          const { type, target, value, method } = event.actions[index];

          if (type === "data.set") {
            data.value[target] = value;
          }
          if (type === "store.set") {
            store.value[target] = value;
          }
          if (type === "router.params") {
            const newRoute = getRouterParams(target, value, method);
            router.push(newRoute);
          }
        }
      };
    }
  }

  return result;
}

const eventsHandlerChildren = computed(() => {
  const result: any = {};

  if (component.value?.children?.length) {
    for (let index = 0; index < component.value.children.length; index++) {
      const child = component.value.children[index];

      result[child.name] = createHandlers(child.events);
    }
  }

  return result;
});

const eventsHandler = computed(() => {
  if (!component.value?.methods) return {};
  return createHandlers(component.value?.methods);
});
</script>

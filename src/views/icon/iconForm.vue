<template>
  <a-form ref="formRef" :model="data">
       <a-form-item label="名称">
           <a-input v-model:value="data.name"/>
       </a-form-item>
        <a-form-item label="图标">
           <a-input v-model:value="data.icon"/>
       </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";

export default defineComponent({
  props: ["value"],
  setup(props, { emit }) {
    const reactiveData = reactive({
      data: {
          name:"",
          icon:""
      },
    });
    watch(
      () => props.value,
      () => {
        reactiveData.data = props.value;
      },
      { deep: true, immediate: true }
    );
    watch(
      () => reactiveData.data,
      () => {
        emit("value", reactiveData.data);
      },
      { deep: true }
    );
    return {
      ...toRefs(reactiveData),
    };
  },
});
</script>

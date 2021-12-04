<template>
  <div>
    <vueMarkdown v-model:value="content" v-model:content="contentmd"/>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import vueMarkdown from "@/components/vue-markdown/vue-markdown.vue";
export default defineComponent({
  components: {
    vueMarkdown,
  },
  setup() {
    const content = ref("");
    const contentmd=ref("")
    return {
      content,
      contentmd
    };
  },
});
</script>

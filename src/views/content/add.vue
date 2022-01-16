<template>
  <div class="add-content-box">
    <content-form v-model:value="formData"></content-form>
    <div class="action-btn-box">
      <a-button @click="submit" type="primary">提交</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch, ref } from "vue";
import contentForm from "./contentForm.vue";
import { addContentApi } from "@/api/modules/contentApi";
import { setBreadcrumb } from "@/utils/breadcrumb";
import {useRouter} from "vue-router"

export default defineComponent({
  components: {
    "content-form": contentForm,
  },
  setup() {
    const router=useRouter()
    setBreadcrumb({
      isShow: true,
      list: [
        {
          name: "home",
          path: "/admin",
        },
        {
          name: "内容列表",
          path: "/admin/content",
        },
        {
          name: "添加内容",
          path: "",
        },
      ],
    });
    const formData = ref({
      name: "121",
      content_md: "# 1212",
    });

    onMounted(() => {
      // setTimeout(()=>{
      //     formData.value.content_md="# wwwwwwwwwwwww"
      // },3000)
      // lookContentList(1).then((res)=>{
      //     console.log("res",res);
      // })
    });
    function submit() {
      addContentApi(formData.value).then((res: any) => {
        router.push({
          path:"/admin/content"
        })
      });
    }
    return {
      submit,
      formData,
    };
  },
});
</script>

<style lang="less">
.add-content-box {
  .action-btn-box {
    text-align: center;
  }
}
</style>

<template>
  <v-md-editor
    v-model="content"
    height="400px"
    mode="editable"
    :disabled-menus="[]"
    @upload-image="handleUploadImage"
    @change="change"
  ></v-md-editor>
</template>

<script lang="ts">
import { defineComponent, ref,watch } from "vue";
import { uploadMdImageApi } from "@/api/modules/contentApi";
export default defineComponent({
  props: ["value"],
  setup(props,{emit}) {
    const content = ref("");
    watch(()=>props.value,()=>{
        content.value=props.value
    },{deep:true,immediate:true})
    function handleUploadImage(event: any, insertImage: any, files: any) {
      console.log(event, insertImage, files);
      const body = new FormData();
      body.append("mdImage", files[0]);
      uploadMdImageApi(body).then((res: any) => {
        insertImage({
          url: res.url,
          // desc: "七龙珠",
          // width: 'auto',
          // height: 'auto',
        });
      });
    }
    // 内容发生变化时
    function change(text:string, html:String) {
        // console.log(text, html);
        emit("update:value",text)
        emit("update:content",html)
    }
    return {
      content,
      handleUploadImage,
      change
    };
  },
});
</script>


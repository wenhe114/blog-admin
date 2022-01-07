<template>
  <div style="margin-top: 30px">
    <a-form
      ref="form"
      :label-col="{
        xs: { span: 24 },
        sm: { span: 5 },
      }"
      :model="formData"
      :rules="rules"
    >
      <a-form-item label="头像" name="img">
        <template #label>图片：</template>
        <a-upload
          list-type="picture-card"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          action="/blogApi/upload/mdimg"
        >
          <img
            style="width: 100%; height: 100%"
            v-if="formData.photo"
            :src="formData.photo"
            alt="avatar"
          />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="微信" name="wechat">
        <template #label>图片：</template>
        <a-upload
          list-type="picture-card"
          :show-upload-list="false"
          :before-upload="wechatBeforeUpload"
        >
          <img
            style="width: 100%; height: 100%"
            v-if="formData.wechat"
            :src="formData.wechat"
            alt="avatar"
          />
          <div v-else>
            <loading-outlined v-if="wechatloading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="昵称" name="name">
        <a-input v-model:value="formData.name"></a-input>
      </a-form-item>
      <a-form-item label="年龄" name="age">
        <a-input v-model:value="formData.age"></a-input>
      </a-form-item>
      <a-form-item label="职业" name="job">
        <a-input v-model:value="formData.job"></a-input>
      </a-form-item>
      <a-form-item label="备案号" name="beian_num">
        <a-input v-model:value="formData.beian_num"></a-input>
      </a-form-item>
      <a-form-item label="邮箱" name="mail">
        <a-input v-model:value="formData.mail"></a-input>
      </a-form-item>
      <a-form-item label="GitHub" name="github">
        <a-input v-model:value="formData.github"></a-input>
      </a-form-item>
      <a-form-item label="qq" name="qq">
        <a-input v-model:value="formData.qq"></a-input>
      </a-form-item>
      
      <a-form-item label="技能" name="skill">
        <a-input v-model:value="formData.skill"></a-input>
      </a-form-item>
      <a-form-item label="简介" name="intro">
        <a-textarea
          v-model:value="formData.intro"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        ></a-textarea>
      </a-form-item>
      <a-form-item name="about_page">
        <template #label>内容:</template>
        <vue-markdown
          v-model:value="formData.about_page"
          v-model:content="formData.content"
        ></vue-markdown>
      </a-form-item>
    </a-form>
    <div style="text-align: center">
      <a-button type="primary" @click="updateInfo">更新</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { uploadCoverApi } from "@/api/modules/contentApi";
import { getAboutInfoApi, updateAboutApi } from "@/api/modules/aboutApi";
import { message } from "ant-design-vue";
import vueMarkdown from "@/components/vue-markdown/vue-markdown.vue"
export default defineComponent({
  components: {
    "loading-outlined": LoadingOutlined,
    "plus-outlined": PlusOutlined,
     "vue-markdown": vueMarkdown,
  },
  setup() {
    const rules = {};
    const form = ref(null);
    const reactiveData: any = reactive({
      formData: {},
      loading: false,
      wechatloading:false
    });
    onMounted(() => {
      getAboutInfo();
    });
    function beforeUpload(files: any) {
     reactiveData.loading=true
      const body = new FormData();
      body.append("photo", files);
      uploadCoverApi(body).then((res:any)=>{
        reactiveData.formData.photo=res.url
        reactiveData.loading=false
      })
      return false;
    }

    // 获取信息
    function getAboutInfo() {
      getAboutInfoApi().then((res: any) => {
        reactiveData.formData = res.data;
      });
    }
    function updateInfo() {
      reactiveData.formData.updated_at = new Date();
      updateAboutApi(reactiveData.formData).then((res: any) => {
        message.success("更新成功");
      });
    }
    function wechatBeforeUpload(files: any) {
     reactiveData.wechatloading=true
      const body = new FormData();
      body.append("wechat", files);
      uploadCoverApi(body).then((res:any)=>{
        reactiveData.formData.wechat=res.url
        reactiveData.wechatloading=false
      })
      return false;
    }
    return {
      wechatBeforeUpload,
      ...toRefs(reactiveData),
      form,
      rules,
      beforeUpload,
      updateInfo,
    };
  },
});
</script>

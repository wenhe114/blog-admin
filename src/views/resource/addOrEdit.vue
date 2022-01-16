<template>
  <div>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      v-bind="{
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }"
    >
      <a-form-item name="cover">
        <template #label>封面</template>
        <a-upload
          list-type="picture-card"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          action="/blogApi/upload/mdimg"
        >
          <img
            style="width: 100%; height: 100%"
            v-if="formState.cover"
            :src="formState.cover"
            alt="avatar"
          />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item name="name">
        <template #label>名称</template>
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item name="intro">
        <template #label>描述</template>
        <a-textarea
          v-model:value="formState.intro"
          placeholder="内容描述"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item name="url">
        <template #label>网址</template>
        <a-input v-model:value="formState.url" />
      </a-form-item>
      <a-form-item name="down_url">
        <template #label>下载网址</template>
        <a-input v-model:value="formState.down_url" />
      </a-form-item>
      <a-form-item name="down_no">
        <template #label>提取码</template>
        <a-input v-model:value="formState.down_no" />
      </a-form-item>
      <a-form-item name="type_ids">
        <template #label>分类</template>
        <a-checkbox-group v-model:value="formState.type_ids">
            <a-checkbox v-for="item in typeList" :value="item.id.toString()" :key="item.id">{{item.type}}</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, reactive, toRefs, ref } from "vue";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { uploadCoverApi } from "@/api/modules/contentApi";
type reactiveDataType = {
  formState: any;
};
export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  props: ["value","typeList"],
  setup(props, { emit }) {
    const formRef = ref();
    const loading = ref(false);
    const rules = {
      rules: [{ required: true, message: "不能为空", trigger: "change" }],
    };
    const reactiveData: reactiveDataType = reactive({
      formState: {
          type_ids:[]
      },
    });
    watch(
      () => props.value,
      () => {
        reactiveData.formState = props.value;
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => reactiveData.formState,
      () => {
        emit("update:value",reactiveData.formState)
      },
      {
        deep: true,
      }
    );
    watch(
      () => reactiveData.formState.type_ids,
      () => {
          reactiveData.formState.type_id=reactiveData.formState.type_ids.join(",")
      },
      {
        deep: true,
      }
    );
    const method = {
      validatorFun() {
        console.log(formRef.value);
      },
      beforeUpload(files: any) {
        const body = new FormData();
        body.append("cover", files);
        uploadCoverApi(body).then((res: any) => {
          reactiveData.formState.cover = res.url;
        });
        return false;
      },
    };
    return {
      ...toRefs(reactiveData),
      formRef,
      rules,
      ...method,
      loading,
    };
  },
});
</script>

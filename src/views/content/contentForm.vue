<template>
  <div>
    <a-form v-if="formData" ref="form" :model="formData" :rules="rules">
      <a-form-item name="img">
        <template #label>图片：</template>
        <a-upload
          list-type="picture-card"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          action="/blogApi/upload/mdimg"
        >
          <img
            style="width: 100%; height: 100%"
            v-if="formData.img"
            :src="formData.img"
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
        <template #label>标题：</template>
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-form-item name="tag">
        <template #label>标签：</template>
        <a-input v-model:value="formData.tag" />
      </a-form-item>
      <a-form-item name="intro">
        <template #label>描述：</template>
        <a-textarea
          v-model:value="formData.intro"
          placeholder="内容描述"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item name="type">
        <template #label>类型：</template>
        <a-checkbox-group v-model:value="formData.types">
          <template v-for="item in typeSelectData" :key="item.id">
            <template v-if="item.children && item.children.length > 0">
              <a-checkbox
                v-for="cit in item.children"
                :key="cit.id"
                :value="cit.id.toString()"
                >{{ cit.meun_title }}</a-checkbox
              >
            </template>
            <template v-else>
              <a-checkbox :key="item.id" :value="item.id.toString()">{{
                item.meun_title
              }}</a-checkbox>
            </template>
          </template>
        </a-checkbox-group>
        <!-- <a-select
          v-model:value="formData.type"
          style="width: 300px"
          @change="typeChange"
          placeholder="请选择文章类型"
        >
          <a-select-opt-group v-for="item in typeSelectData" :key="item.id">
            <template #label>
              <span> {{item.meun_title}} </span>
            </template>
            <template v-if="item.children&&item.children.length>0">
              <a-select-option v-for="cit in item.children" :key="cit.id" :value="cit.id.toString()">{{cit.meun_title}}</a-select-option>
            </template>
            <template v-else>
              <a-select-option :key="item.id" :value="item.id.toString()">{{item.meun_title}}</a-select-option>
            </template>
          </a-select-opt-group>
        </a-select> -->
      </a-form-item>

      <a-form-item name="author">
        <template #label>作者：</template>
        <a-select
          v-model:value="formData.author"
          style="width: 300px"
          @change="authorChange"
          placeholder="请选择作者"
        >
          <a-select-option
            v-for="item in userData"
            :value="item.name"
            :key="item.name"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="content_md">
        <template #label>内容:</template>
        <vue-markdown
          v-model:value="formData.content_md"
          v-model:content="formData.content"
        ></vue-markdown>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch, onMounted } from "vue";
// import vueEditormd from "@/components/editormd/editormd.vue";
import vueMarkdown from "@/components/vue-markdown/vue-markdown.vue";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons-vue";
// import {uploadCover} from "@/api/mudule/upload"
// import request from "@/api/index"
import { uploadCoverApi } from "@/api/modules/contentApi";
import { getMenuListApi } from "@/api/modules/menuApi";
import { getUserListApi } from "@/api/modules/userApi";
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  type?: string;
  size: number;
  originFileObj: any;
}
export default defineComponent({
  components: {
    "vue-markdown": vueMarkdown,
    "loading-outlined": LoadingOutlined,
    "plus-outlined": PlusOutlined,
  },
  props: ["value", "rules"],
  setup(props, { emit }) {
    const reactiveData = reactive({
      typeSelectData: [],
      userData: [],
      formData: {
        types: [],
      },
    });
    watch(
      () => props.value,
      () => {
        reactiveData.formData = props.value;
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => reactiveData.formData,
      () => {
        emit("update:value",reactiveData.formData)
      },
      {
        deep: true,
      }
    );
    watch(
      () => (reactiveData.formData as any).types,
      () => {
          (reactiveData.formData as any).type=(reactiveData.formData as any).types.join(",")
      },
      {
        deep: true,
      }
    );
    // const formData:{types:string} = props.modelValue;
    const rules = props.rules;
    const loading = ref(false);

    onMounted(() => {
      getMenuList();
      getUserList();
    });
    // 上传封面
    const beforeUpload = (files: any) => {
      const body = new FormData();
      body.append("img", files);
      uploadCoverApi(body).then((res: any) => {
        (reactiveData.formData as any).img = res.url;
      });
      return false;
    };

    function typeChange(val: any) {
      console.log(val);
    }
    function authorChange(val: any) {
      console.log(val);
    }
    // 获取菜单
    function getMenuList() {
      getMenuListApi().then((res) => {
        reactiveData.typeSelectData = res.data;
      });
    }
    // 获取用户
    function getUserList() {
      getUserListApi().then((res) => {
        reactiveData.userData = res.data;
      });
    }
    return {
      rules,
      loading,
      beforeUpload,
      typeChange,
      authorChange,
      ...toRefs(reactiveData),
    };
  },
});
</script>

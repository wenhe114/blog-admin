<template>
  <a-form :model="formData" :rules="rules" ref="formRef">
    <a-form-item label="菜单">
      <a-input v-model:value="formData.meun_title" />
    </a-form-item>
    <a-form-item label="级别">
      <a-input v-model:value="formData.level" />
    </a-form-item>
    <a-form-item label="序号">
      <a-input v-model:value="formData.sort" />
    </a-form-item>
    <a-form-item label="图标">
      <a-input
        v-model:value="formData.icon"
        style="display: inline-block;width: 300px;}"
        :disabled="true"
      />
      <a-button @click="openIconModal">选择</a-button>
    </a-form-item>
    <a-form-item label="路径">
      <a-input
        v-model:value="formData.url"
      />
    </a-form-item>
    <a-form-item label="父级">
      <a-select v-model:value="formData.parent_id"  placeholder="请选择父级菜单">
          <a-select-option :value="0">一级菜单</a-select-option>
          <a-select-option v-for="item in menuList" :key="item.id" :value="item.id">{{item.meun_title}}</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
  <!--选择图标modal-->
  <a-modal v-model:visible="iconVisible" title="选择图标" @ok="closeIconModal">
    <div class="icon-list-box">
      <span
        v-for="item in iconData"
        :key="item.icon"
        @click="selectBtn(item.icon)"
        :title="item.name"
      >
        <span
          class="iconfont"
          :class="[item.icon, formData.icon === item.icon ? 'icon-acitve' : '']"
        ></span>
        <span>{{item.name}}</span>
      </span>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted,watch } from "vue";
import {getMenuListApi} from "@/api/modules/menuApi"
import iconData from "@/data/icon.json";
export default defineComponent({
  props:["modelValue"],
  setup(props,{emit}) {
    const formRef = ref(null);
    const formData=props.modelValue
    const reactiveData = reactive({
      // formData: {
      //   parent_id:undefined
      // },
      rules: {},
      iconVisible: false,
      menuList:[]
    });
    onMounted(()=>{
        getMenuList()
    })
    watch(()=>formData,()=>{
      emit("update:modelValue",formData)
    },{deep:true})
    // 获取菜单
    function getMenuList() {
        getMenuListApi().then((res:any)=>{
            reactiveData.menuList=res.data
        })
    }
    function openIconModal() {
      reactiveData.iconVisible = true;
    }
    function selectBtn(type: string) {
      (formData as any).icon = type;
    }
    function closeIconModal() {
        reactiveData.iconVisible = false;
    }
    return {
      ...toRefs(reactiveData),
      formRef,
      openIconModal,
      iconData,
      selectBtn,
      closeIconModal,
      formData
    };
  },
});
</script>
<style lang="less">
.icon-list-box {
  display: flex;
  flex-wrap: wrap;
  > span {
    margin: 15px;
  }
  .iconfont {
    border: 1px solid transparent;
    &.icon-acitve {
      border: 1px solid #3e90ff;
    }
  }
}
</style>

<template>
  <div class="admin-main-box">
    <div class="main-left" :style="collapsed ? 'width:80px' : 'width: 256px;'">
      <div style="height: 60px"></div>
      <left></left>
    </div>
    <div class="main-right">
      <top class="main-top"> </top>
      <div class="main-content">
        <a-breadcrumb separator=">" v-if="breadcrumb.isShow">
          <a-breadcrumb-item v-for="(item,index) in breadcrumb.list" :key="index"><router-link :to="item.path">{{item.name}}</router-link></a-breadcrumb-item>
        </a-breadcrumb>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref,reactive,toRefs,watch } from "vue";
import left from "./left.vue";
import top from "./top.vue";
import {onBeforeRouteUpdate} from "vue-router"

export default defineComponent({
  components: {
    left,
    top,
  },
  setup() {
    onBeforeRouteUpdate(()=>{
      breadcrumb.value={
        isShow:false,
        list:[]
      }
    })
    const collapsed = ref(true);
    provide("collapsed", collapsed);
    const reactiveData=reactive({})
    
    const breadcrumb=ref({
        isShow:false,
        list:[]
      })
    provide("breadcrumb",breadcrumb)
    return {
      provide,
      collapsed,
      ...toRefs(reactiveData),
      breadcrumb
    };
  },
});
</script>

<style lang="less">
.admin-main-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .main-left {
    flex-shrink: 0;
    background: #d2ddff;
  }
  .main-right {
    flex: 1;
    height: 100%;
    .main-top {
      height: 60px;
      width: 100%;
      background: #001529;
      color: white;
    }
    .main-content{
      padding: 15px;
      height: calc(100% - 60px);
      overflow-y: auto;
    }
  }
}
</style>

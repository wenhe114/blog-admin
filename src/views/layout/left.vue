<template>
  <div style="width: 100%">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <template #icon>
          <span>
            <span class="iconfont icon-shouye"></span>
          </span>
        </template>
        <span><router-link to="/admin">首页</router-link></span>
      </a-menu-item>
      <a-sub-menu key="2">
        <template #icon>
          <span>
            <span class="iconfont icon-cedaohang-gongdan"></span>
          </span>
        </template>
        <template #title>内容管理</template>
        <a-menu-item key="2-1"
          ><router-link to="/admin/content">内容列表</router-link></a-menu-item
        >
        <a-menu-item key="2-2"
          ><router-link to="/admin/content/add"
            >添加内容</router-link
          ></a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="3">
        <template #icon>
          <span>
            <span class="iconfont icon-menu"></span>
          </span>
        </template>
        <template #title>菜单管理</template>
        <a-menu-item key="3-1"
          ><router-link to="/admin/menu/list"
            >菜单列表</router-link
          ></a-menu-item
        >
        <a-menu-item key="3-2"
          ><router-link to="/admin/menu/add">添加菜单</router-link></a-menu-item
        >
      </a-sub-menu>
      <a-menu-item key="4">
        <template #icon>
          <span>
            <span class="iconfont icon-guanyuwomen"></span>
          </span>
        </template>
        <span><router-link to="/admin/about">关于我</router-link></span></a-menu-item
      >
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, inject } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
  setup() {
    const state = reactive({
      selectedKeys: ["1"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"],
    });
    const collapsed = inject("collapsed");
    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    return {
      ...toRefs(state),
      collapsed,
    };
  },
});
</script>

<style lang="less">
.ant-menu {
  .ant-menu-item {
    a {
      color: rgba(255, 255, 255, 0.65);
    }
  }
}
</style>


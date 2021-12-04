<template>
  <div class="add-menu-box">
    <menuForm v-model="menuData"></menuForm>
    <div class="action-box">
      <a-button type="primary" @click="submit">提交</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import menuForm from "./menuForm.vue";
import { setBreadcrumb } from "@/utils/breadcrumb";
import { addMenuApi } from "@/api/modules/menuApi";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { menuForm },
  setup() {
    const router = useRouter();
    setBreadcrumb({
      isShow: true,
      list: [
        {
          name: "home",
          path: "/admin",
        },
        {
          name: "菜单列表",
          path: "/admin/menu/list",
        },
        {
          name: "添加菜单",
          path: "",
        },
      ],
    });
    const reactiveData = reactive({
      menuData: {},
    });
  
    function submit() {
      addMenuApi(reactiveData.menuData).then((res: any) => {
        router.push({
          path: "/admin/menu/list",
        });
      });
    }
    return {
      ...toRefs(reactiveData),
      submit,
    };
  },
});
</script>

<style lang="less">
.add-menu-box {
  .action-box {
    text-align: center;
    margin-top: 30px;
  }
}
</style>

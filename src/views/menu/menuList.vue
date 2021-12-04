<template>
  <div class="menu-list-box">
    <a-table :dataSource="menuList" :columns="columns">
      <template #icon="{ text }">
        <span :class="['iconfont', text]"></span>
      </template>
      <template #action="{ text }">
        <div class="action-box">
          <span
            class="iconfont icon-bianji"
            @click="openEditModal(text)"
          ></span>
          <span
            class="iconfont icon-shanchu"
            @click="deleteBtn(text.id)"
          ></span>
        </div>
      </template>
    </a-table>
  </div>
  <a-modal
    :visible="editModalVisible"
    @ok="submitEdit"
    @cancel="cancelModal"
    :width="800"
  >
    <menuForm v-if="editModalVisible" v-model="menuData"></menuForm>
  </a-modal>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  toRefs,
  watch,
} from "vue";
import { setBreadcrumb } from "@/utils/breadcrumb";
import menuForm from "./menuForm.vue";
import { cloneDeep } from "lodash";
import {
  getMenuListApi,
  updateMenuApi,
  deleteMenuApi,
} from "@/api/modules/menuApi";
import { Modal } from "ant-design-vue";

export default defineComponent({
  components: {
    menuForm,
  },
  setup() {
    setBreadcrumb({
      isShow: true,
      list: [
        {
          name: "home",
          path: "/admin",
        },
        {
          name: "菜单列表",
          path: "",
        },
      ],
    });
    const columns = [
      {
        title: "序号",
        filterMultiple: false,
        customRender: (t: any, r: any, index: number) => {
          return parseInt(t.index + 1);
        },
      },
      {
        title: "菜单",
        dataIndex: "meun_title",
      },
      {
        title: "图标",
        dataIndex: "icon",
        slots: { customRender: "icon" },
      },
      {
        title: "url地址",
        dataIndex: "url",
      },
      ,
      {
        title: "父级菜单",
        customRender: ({ record, index }: any) => {
          const i = reactiveData.menuList.findIndex((item: any) => {
            return item.id === record.parent_id;
          });

          return i === -1
            ? "无父级菜单"
            : (reactiveData.menuList[i] as any).meun_title;
        },
      },
      {
        title: "排序",
        dataIndex: "sort",
      },
      {
        title: "操作",
        // dataIndex: "id",
        slots: { customRender: "action" },
      },
    ];
    const reactiveData = reactive({
      menuList: [],
      editModalVisible: false,
      menuData: {},
    });

    onMounted(() => {
      getMenuList();
    });
    // 获取菜单列表
    function getMenuList() {
      getMenuListApi().then((res: any) => {
        reactiveData.menuList = res.data;
      });
    }
    // 打开编辑modal
    function openEditModal(val: any) {
      reactiveData.menuData = cloneDeep(val);
      reactiveData.editModalVisible = true;
    }
    // 取消编辑modal
    function cancelModal() {
      reactiveData.editModalVisible = false;
    }
    // 提交编辑信息
    function submitEdit() {
      updateMenuApi(reactiveData.menuData).then((res: any) => {
        getMenuList();
        reactiveData.editModalVisible = false;
      });
    }
    // 删除
    function deleteBtn(id: any) {
      Modal.confirm({
        title: "提示",
        content: "确认删除吗",
        onOk: () => {
          deleteMenuApi({ urlParams: { id: id } }).then((res) => {
            getMenuList();
          });
        },
        onCancel: () => {},
      });
    }

    // 设置当前修改的数据
    // function settingRowData() {
    //   const i = reactiveData.menuList.findIndex((item: any) => {
    //     return item.id === (reactiveData.menuData as any).id;
    //   });
    //   (reactiveData.menuList as any)[i] = reactiveData.menuData;
    // }
    return {
      columns,
      ...toRefs(reactiveData),
      openEditModal,
      cancelModal,
      submitEdit,
      deleteBtn,
    };
  },
});
</script>

<style lang="less">
.menu-list-box {
  .action-box {
    // text-align: center;
    > span {
      margin-left: 20px;
      &:hover {
        color: #0078d7;
        cursor: pointer;
      }
    }
  }
}
</style>

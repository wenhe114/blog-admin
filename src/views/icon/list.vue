<template>
  <div class="icon-list-wrap">
    <div class="icon-action-top-box">
      <a-button type="primary" @click="openModal">添加</a-button>
      <a-button type="primary" @click="deleteMore">批量删除</a-button>
    </div>
    <a-table
      :dataSource="data"
      :columns="columns"
      rowKey="id"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
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
    :visible="visible"
    @ok="submitEdit"
    @cancel="cancelModal"
    :width="800"
    :title="currentData.id ? '编辑' : '添加'"
  >
    <icon-form v-model:value="currentData"></icon-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import {
  getIconListApi,
  addIconApi,
  updateIconApi,
  deleteIconApi,
} from "@/api/modules/iconApi";
import iconForm from "./iconForm.vue";
import { cloneDeep } from "lodash";
import { Modal } from "ant-design-vue";

const columns = [
  {
    title: "序号",
    filterMultiple: false,
    customRender: (t: any, r: any, index: number) => {
      return parseInt(t.index + 1);
    },
  },
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "图标",
    dataIndex: "icon",
    slots: { customRender: "icon" },
  },
  {
    title: "操作",
    // dataIndex: "id",
    slots: { customRender: "action" },
  },
];
type TreactiveData = {
  data: any[];
  visible: boolean;
  currentData: any;
  selectedRowKeys: any[];
};
export default defineComponent({
  components: {
    "icon-form": iconForm,
  },
  setup() {
    const reactiveData: TreactiveData = reactive({
      data: [],
      visible: false,
      currentData: {},
      selectedRowKeys: [],
    });
    const method = {
      getDataList() {
        getIconListApi().then((res: any) => {
          reactiveData.data = res.data;
        });
      },
      openEditModal: (val: any) => {
        reactiveData.currentData = cloneDeep(val);
        reactiveData.visible = true;
      },
      deleteMore() {
        const ids=reactiveData.selectedRowKeys.join(",")
        Modal.confirm({
          title: "提示",
          content: "确认删除吗",
          onOk: () => {
            method.deleteData(ids);
          },
          onCancel: () => {},
        });
      },
      deleteBtn(val: any) {
        console.log(val);
        Modal.confirm({
          title: "提示",
          content: "确认删除吗",
          onOk: () => {
            method.deleteData(val.id);
          },
          onCancel: () => {},
        });
      },
      deleteData(ids: string) {
        deleteIconApi({ urlParams: { id: ids } }).then((res) => {
          reactiveData.selectedRowKeys=[]
          method.getDataList();
        });
      },
      openModal() {
        reactiveData.visible = true;
      },
      submitEdit() {
        console.log(reactiveData.currentData);
        if (!reactiveData.currentData.id) {
          addIconApi(reactiveData.currentData).then((res: any) => {
            console.log(res);
            reactiveData.visible = false;
            reactiveData.currentData = {};
            method.getDataList();
          });
        } else {
          updateIconApi(reactiveData.currentData).then((res: any) => {
            console.log(res);
            reactiveData.visible = false;
            reactiveData.currentData = {};
            method.getDataList();
          });
        }
      },
      cancelModal() {
        reactiveData.visible = false;
        reactiveData.currentData = {};
      },
      onSelectChange(selectedRowKeys: any[]) {
        reactiveData.selectedRowKeys = selectedRowKeys;
        console.log(reactiveData.selectedRowKeys);
      },
    };
    onMounted(() => {
      method.getDataList();
    });
    return {
      columns,
      ...toRefs(reactiveData),
      ...method,
    };
  },
});
</script>

<style lang="less">
.icon-list-wrap {
  .icon-action-top-box {
    margin-bottom: 10px;
    button {
      margin-right: 30px;
    }
  }
  .action-box {
    > span {
      cursor: pointer;
      margin-right: 20px;
    }
  }
}
</style>

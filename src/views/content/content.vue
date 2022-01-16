<template>
  <div>
    <div>
      关键字：<a-input-search
        placeholder="请输入文章名称或者内容搜索关键字"
        style="width: 300px"
        v-model:value="params.name"
        @search="onSearch"
      />
      类型：<a-select
        v-model:value="params.id"
        style="width: 300px"
        @change="typeChange"
        placeholder="请选择文章类型"
      >
        <a-select-opt-group v-for="item in typeSelectData" :key="item.id">
          <template #label>
            <span> {{ item.meun_title }} </span>
          </template>
          <a-select-option
            v-for="cit in item.children"
            :key="cit.id"
            :value="cit.id"
            >{{ cit.meun_title }}</a-select-option
          >
        </a-select-opt-group>
      </a-select>
    </div>
    <a-table
      :columns="columns"
      :data-source="contentList"
      :row-key="(row) => row.id"
      :pagination="false"
    >
      <!-- <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex ==='name'">{{text}}{{record}}</template>
      </template> -->
      <template #action="{ text }">
        <div class="action-box">
          <span @click="editContent(text)" class="iconfont icon-bianji"></span>
          <span
            @click="deleteContent(text.id)"
            class="iconfont icon-shanchu"
          ></span>
        </div>
      </template>
    </a-table>
    <div style="margin-top: 15px; text-align: center">
      <a-pagination
        v-model:current="params.currentPage"
        v-model:pageSize="params.pageSize"
        :total="total"
        @change="pageChange"
      />
    </div>
    <a-modal
      title="Title"
      :visible="editVisible"
      @ok="submit"
      @cancel="cancelModal"
      :width="800"
    >
      <content-form v-if="editVisible" v-model:value="formData"></content-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, onMounted, reactive } from "vue";
import { setBreadcrumb } from "@/utils/breadcrumb";
import {
  getContentListApi,
  updateContentApi,
  deleteContentApi,
} from "@/api/modules/contentApi";
import { getMenuListApi } from "@/api/modules/menuApi";
import contentForm from "./contentForm.vue";
import { cloneDeep } from "lodash";
import { Modal } from "ant-design-vue";

export default defineComponent({
  components: {
    "content-form": contentForm,
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
          name: "内容列表",
          path: "",
        },
      ],
    });
    const columns = [
      {
        title: "序号",
        filterMultiple:false,
        customRender: (t:any, r:any, index:number) => {
          return parseInt(
            `${(reactiveData.params.currentPage - 1) * reactiveData.params.pageSize + (t.index + 1)}`
          );
        },
      },
      {
        title: "标题",
        dataIndex: "name",
        width: "20%",
         ellipsis: true,
      },
      {
        title: "描述",
        dataIndex: "intro",
        width: "20%",
         ellipsis: true,
      },
      {
        title: "类型",
        dataIndex: "menu_info[meun_title]",
        width: "20%",
      },
      {
        title: "标签",
        dataIndex: "tag",
        width: "20%",
      },
      {
        title: "操作",
        // dataIndex: "id",
        slots: { customRender: "action" },
      },
    ];
    const reactiveData = reactive({
      formData: {},
      contentList: [],
      params: {
        id: undefined,
        name: "",
        currentPage: 1,
        pageSize: 15,
      },
      total: 0,
      typeSelectData: [],
      editVisible: false,
    });
    onMounted(() => {
      getContentList();
      getMenuList();
    });
    // 获取菜单
    function getMenuList() {
      getMenuListApi().then((res) => {
        reactiveData.typeSelectData = res.data;
      });
    }
    // 获取内容列表
    function getContentList() {
      let param: any = { ...reactiveData.params };
      param.id = param.id ? param.id : "";
      getContentListApi(param).then((res: any) => {
        reactiveData.contentList = res.data.list;
        reactiveData.params.currentPage = res.data.page.currentPage;
        reactiveData.total = res.data.page.total;
      });
    }

    // 类型发生变化时
    function typeChange() {
      reactiveData.params.currentPage = 1;
      getContentList();
    }
    // 搜索
    function onSearch() {
      reactiveData.params.currentPage = 1;
      getContentList();
    }
    function editContent(val: any) {
      
      reactiveData.editVisible = true;
        if (val) {
          val.types=val.type.split(",")
          reactiveData.formData = cloneDeep(val);
        }
    }
    function deleteContent(id: number) {
      Modal.confirm({
        title: "提示",
        content: "确认删除吗",
        onOk: () => {
          deleteContentApi({ urlParams: { id: id } }).then((res) => {
            reactiveData.params.currentPage = 1;
            getContentList();
          });
        },
        onCancel: () => {},
      });
    }

    // 提交
    function submit() {
      reactiveData.editVisible = false;
      updateContentApi(reactiveData.formData).then((res) => {
        settingRowData();
      });
    }
    // 关闭
    function cancelModal() {
      reactiveData.editVisible = false;
    }
    // 获取当行数据
    function settingRowData() {
      const i = reactiveData.contentList.findIndex((item: any) => {
        return item.id === (reactiveData.formData as any).id;
      });
      (reactiveData.contentList as any)[i] = reactiveData.formData;
    }
    function pageChange(page:number, pageSize:number) {
      reactiveData.params.currentPage=page
      reactiveData.params.pageSize=pageSize
      getContentList();
    }
    return {
      ...toRefs(reactiveData),
      typeChange,
      onSearch,
      columns,
      editContent,
      deleteContent,
      submit,
      cancelModal,
      pageChange
    };
  },
});
</script>

<style lang="less">
.action-box {
  > span {
    margin-right: 15px;
    cursor: pointer;
    &:hover {
      color: cornflowerblue;
    }
  }
}
</style>

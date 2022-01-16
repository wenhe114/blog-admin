<template>
  <div class="resource-wrap">
    <div class="action-top-box">
      <a-select
        placeholder="请选择分类"
        @change="typeChange"
        v-model:value="currentTypeId"
      >
        <a-select-option
          v-for="item in typeList"
          :key="item.id"
          :value="item.id"
          >{{ item.type }}</a-select-option
        >
      </a-select>
      <a-button type="primary" @click="openTypeModal">分类列表</a-button>
      <a-button type="primary" @click="openAddModal('')">添加资源</a-button>
      <a-button type="primary" @click="deleteData('')">批量删除</a-button>
    </div>
    <a-table
      :dataSource="dataList"
      :columns="columns"
      rowKey="id"
      :row-selection="{
        selectedRowKeys: selectedDataRowKeys,
        onChange: onSelectDataChange,
      }"
      :pagination="false"
    >
      <template #type="{ text }">
        <div>{{ settingType(text.type_id) }}</div>
      </template>
      <template #action="{ text }">
        <div class="action-box">
          <span
            class="iconfont icon-bianji"
            @click="openAddModal(text)"
          ></span>
          <span
            class="iconfont icon-shanchu"
            @click="deleteData(text.id)"
          ></span>
        </div>
      </template>
    </a-table>
  </div>
  <a-modal
    class=""
    title="分类列表"
    v-model:visible="typeListVisible"
    @ok="closeTypeModal"
  >
    <div>
      <div class="action-top-box">
        <a-button type="primary" @click="openAddTypeModal('')"
          >添加资源</a-button
        >
        <a-button type="primary" @click="deleteTypeBtn('')">批量删除</a-button>
      </div>
      <a-table
        :dataSource="typeList"
        :columns="typeColums"
        rowKey="id"
        :pagination="false"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
      >
        <template #type="{ text }">
          <div>{{ settingType(text.type_id) }}</div>
        </template>
        <template #action="{ text }">
          <div class="action-box">
            <span
              class="iconfont icon-bianji"
              @click="openAddTypeModal(text)"
            ></span>
            <span
              class="iconfont icon-shanchu"
              @click="deleteTypeBtn(text.id)"
            ></span>
          </div>
        </template>
      </a-table>
    </div>
  </a-modal>
  <a-modal
    :title="typeId ? '编辑分类' : '添加分类'"
    v-model:visible="addTypeVisible"
    @ok="addType"
  >
    <label>分类名称：</label>
    <a-input v-model:value="typeName"></a-input>
  </a-modal>
  <a-modal
    :title="id ? '编辑分类' : '添加分类'"
    v-model:visible="addVisible"
    @ok="submit"
    class="add-resource-modal"
    :width="800"
  >
    <addOrEdit :typeList="typeList" v-model:value="resourceData"/>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import {
  getResourceListApi,
  getResourceTypeListApi,
  addResourceTypeApi,
  updateResourceTypeApi,
  deleteResourceTypeApi,
  addResourceApi,
  deleteResourceApi,
  updateResourcApi
} from "@/api/modules/resourceApi";
import {message, Modal} from "ant-design-vue"
import addOrEdit from "./addOrEdit.vue"
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
    title: "分类",
    slots: { customRender: "type" },
  },
  {
    title: "操作",
    // dataIndex: "id",
    slots: { customRender: "action" },
  },
];
const typeColums = [
  {
    title: "序号",
    filterMultiple: false,
    customRender: (t: any, r: any, index: number) => {
      return parseInt(t.index + 1);
    },
  },
  {
    title: "名称",
    dataIndex: "type",
  },
  {
    title: "操作",
    // dataIndex: "id",
    slots: { customRender: "action" },
  },
];
type reactiveDataType = {
  selectedRowKeys: any[];
  selectedDataRowKeys:any[]
  dataList: any[];
  typeList: any[];
  currentTypeId: string | undefined;
  typeListVisible: boolean;
  addResourceVisible: boolean;
  addTypeVisible: boolean;
  typeName: string;
  typeId: number | string;
  addVisible:boolean,
  id:number | string;
  resourceData:any
};
export default defineComponent({
  components:{
    addOrEdit
  },
  setup() {
    const reactiveData: reactiveDataType = reactive({
      selectedRowKeys: [],
      selectedDataRowKeys:[],
      dataList: [],
      typeList: [],
      currentTypeId: undefined,
      typeListVisible: false,
      addResourceVisible: false,
      addTypeVisible: false,
      typeName: "",
      typeId: "",
      addVisible:false,
      id:"",
      resourceData:{}
    });
    const method = {
      openEditModal() {},
      deleteBtn() {},
      onSelectChange(selectedRowKeys: any[]) {
        reactiveData.selectedRowKeys = selectedRowKeys;
      },
      onSelectDataChange(selectedRowKeys: any[]) {
        reactiveData.selectedDataRowKeys = selectedRowKeys;
      },
      getResourceList() {
        let type_id: string = reactiveData.currentTypeId
          ? reactiveData.currentTypeId
          : "";
        getResourceListApi({ type_id: type_id }).then((res: any) => {
          reactiveData.dataList = res.data;
        });
      },
      getResourceTypeList() {
        getResourceTypeListApi().then((res: any) => {
          reactiveData.typeList = res.data;
        });
      },
      typeChange() {
        method.getResourceList();
      },
      openTypeModal() {
        reactiveData.typeListVisible = true;
      },
      closeTypeModal() {
        reactiveData.typeListVisible = false;
      },
      openAddTypeModal(val: any) {
        reactiveData.typeName = "";
        reactiveData.typeId = "";
        if (val) {
          reactiveData.typeId = val.id;
          reactiveData.typeName = val.type;
        }
        reactiveData.addTypeVisible = true;
      },
      addType() {
        if (reactiveData.typeId) {
          updateResourceTypeApi({
            type: reactiveData.typeName,
            id: reactiveData.typeId,
          }).then((res: any) => {
            reactiveData.addTypeVisible = false;
            method.getResourceTypeList();
            reactiveData.typeName = "";
            reactiveData.typeId = "";
          });
        } else {
          addResourceTypeApi({ type: reactiveData.typeName }).then(
            (res: any) => {
              reactiveData.addTypeVisible = false;
              method.getResourceTypeList();
              reactiveData.typeName = "";
            }
          );
        }
      },
      deleteTypeBtn(val:any){
        if (val) {
          method.deleteResourceType(val)
        }else{
          // 批量删除
          if (reactiveData.selectedRowKeys.length==0) {
            message.warn("未选择数据")
          }
          const ids=reactiveData.selectedRowKeys.join(",")
          method.deleteResourceType(ids)
        }
      },
      deleteResourceType(ids:string){
        Modal.confirm({
          title:"删除提示",
          content:"确认删除吗",
          onOk:()=>{
            deleteResourceTypeApi({ urlParams: { id: ids } }).then(()=>{
              reactiveData.selectedRowKeys=[]
              method.getResourceTypeList();
              message.success("删除成功")
            })
          }
        })
      },
      openAddModal(val:any){
        reactiveData.id=""
        reactiveData.resourceData={}
        reactiveData.addVisible=true
        if (val) {
          val.type_ids=val.type_id.split(",")
          reactiveData.id=val.id
          reactiveData.resourceData=val
        }
      },
      submit(){
        if (reactiveData.id) {
          updateResourcApi({...reactiveData.resourceData}).then((res:any)=>{
           
            method.getResourceList()
            reactiveData.addVisible=false
          })
        }else{
          addResourceApi({...reactiveData.resourceData}).then((res:any)=>{
            
            method.getResourceList()
            reactiveData.addVisible=false
          })
        }
      },
      deleteData(val:any){
         if (val) {
          
          method.deleteResource(val)
        }else{
          // 批量删除
          if (reactiveData.selectedDataRowKeys.length==0) {
            message.warn("未选择数据")
          }
          const ids=reactiveData.selectedDataRowKeys.join(",")
          method.deleteResource(ids)
        }
      },
       deleteResource(ids:string){
        
        Modal.confirm({
          title:"删除提示",
          content:"确认删除吗",
          onOk:()=>{
            deleteResourceApi({ urlParams: { id: ids } }).then(()=>{
              reactiveData.selectedRowKeys=[]
              method.getResourceList();
              message.success("删除成功")
            })
          }
        })
      },
      settingType(ids: string) {
        let idsArry = ids.split(",");
        let typeStr = "";
        reactiveData.typeList.filter((item: any) => {
          if (idsArry.includes(item.id.toString())) {
            typeStr += item.type + "，";
          }
          // return idsArry.includes(item.id.toString());
        });
        return typeStr.substring(1, typeStr.length - 1);
      },
    };
    onMounted(() => {
      method.getResourceList();
      method.getResourceTypeList();
    });
    return {
      ...toRefs(reactiveData),
      ...method,
      columns,
      typeColums,
    };
  },
});
</script>


<style lang="less">
.resource-wrap {
}
.action-top-box {
  margin-bottom: 15px;
  .ant-select {
    width: 150px;
  }
  button {
    margin-left: 20px;
  }
}

</style>
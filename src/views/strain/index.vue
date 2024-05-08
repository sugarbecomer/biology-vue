<script setup lang="ts">
import Add from './add.vue'
import {onMounted, ref} from "vue";
import {IAddInfo} from "@/views/strain/add.vue";
import {ApiStrainList} from "@/api/strain.ts";

const tableData = ref([])
const pageInfo = ref({
  page_no: 1,
  page_size: 20
})
const queryForm = ref({
  field: '',
  order: '',
  key: ''
})
const handleQuery = ()=>{
  const params = {...queryForm.value,...pageInfo.value}
  ApiStrainList(params).then(res=>{
    tableData.value = res.data.data.strain_list
  })
}
onMounted(()=>{
  handleQuery()
})
interface AddInfoType {
  title: string,
  open: boolean,
  data?: IAddInfo,
  onCloe: (flag:boolean) => void
}

const AddInfo = ref<AddInfoType>({
  data: undefined,
  title: '',
  open: false,
  onCloe: (flag:boolean) => {
    AddInfo.value.open = false
    if(flag){
      handleQuery()
    }
  }
})
const onAdd = () => {
  AddInfo.value.title = "新增品系"
  AddInfo.value.data = {
    number: '',
    short_name: [],
    strain_name: '',
    strain_annotate: [],
    strain_extra: [],
    allele: [{name:"",genome:""}],
  },
      AddInfo.value.open = true
}
const modalInfo = ref({
  open: false,
  msg: '',
  close: (flag:boolean) => {
    modalInfo.value.open = false
    if(flag){
      console.log(flag);
    }
  },
  row:{}
})

const onDel = (scope: any) => {
  modalInfo.value.row = scope
  modalInfo.value.msg = `确定删除 ${scope.row.strain_name} 吗？`
  modalInfo.value.open = true
}

</script>

<template>
  <d-row type="flex" class="table-operation">
    <d-col flex="auto">
      <d-form class="query-form" :data="queryForm" label-size="sm">
        <d-row :gutter="10" class="query-padding">
          <d-col :span="8">
            <d-form-item field="name" label="查询数据">
              <d-input v-model="queryForm.field" placeholder="可搜索任意字段的数据"/>
            </d-form-item>
          </d-col>
          <d-col :span="4">
            <d-button @click="handleQuery">搜索</d-button>
          </d-col>
        </d-row>
      </d-form>
    </d-col>
    <d-col flex="100px">
      <d-button variant="solid" size="md" color="primary" icon="add" @click="onAdd">新增</d-button>
      <!--      <d-button variant="solid" size="md" color="secondary">修改</d-button> <d-button variant="solid" size="md" color="danger">删除</d-button>-->
    </d-col>
  </d-row>
  <d-table table-layout="auto" :data="tableData" style="width: 100%" header-bg>
    <d-column field="number" header="序列号"></d-column>
    <d-column field="short_name" header="简称"></d-column>
    <d-column field="strain_name" header="品系名"></d-column>
    <d-column field="allele" header="基因名">
      <template #default="scope">
        <template v-for="item in scope.row.allele">
          <d-tag size="sm" color="blue-w98">{{ item.name }}</d-tag>
        </template>
      </template>
    </d-column>
    <d-column field="allele" header="基因修饰情况">
      <template #default="scope">
        <template v-for="item in scope.row.allele">
          <d-tag size="sm" color="green-w98">{{ item.genome }}</d-tag>
        </template>
      </template>
    </d-column>
    <d-column field="strain_annotate" header="品系注解">

      <template #default="scope">
        <template v-for="item in scope.row.strain_annotate">
          <d-tag size="sm" color="#007d65">{{ item }}</d-tag>
        </template>
      </template>
    </d-column>
    <d-column field="operation" header="操作">
      <template #default="scope">
        <d-button variant="solid" size="sm" color="primary" @click="onEdit(scope)">编辑</d-button>

        <d-button variant="solid" size="sm" color="danger" @click="onDel(scope)">删除</d-button>
      </template>
    </d-column>
  </d-table>
  <Add v-if="AddInfo.open" v-model:open="AddInfo.open" v-model:data="AddInfo.data!" :title="AddInfo.title" @close="AddInfo.onCloe"/>
  <d-modal v-model="modalInfo.open" title="温馨提示" type="warning">
    <div>{{modalInfo.msg}}</div>
    <template #footer>
      <d-modal-footer style="text-align: right; padding-right: 20px;">
        <d-button @click="modalInfo.close(true)" type="primary">确认</d-button>
        <d-button @click="modalInfo.close(false)">取消</d-button>
      </d-modal-footer>
    </template>
  </d-modal>
</template>

<style lang="scss" scoped>

</style>
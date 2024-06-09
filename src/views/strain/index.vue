<script setup lang="ts">
import Add from './add.vue'
import {onMounted, ref} from "vue";
import {IAddInfo, IAllele} from "@/views/strain/add.vue";
import {ApiStrainDel, ApiStrainList} from "@/api/strain.ts";
import {ExtraInfo} from "@/views/strain/components/extraEdit.vue";
import {Message} from "vue-devui";


export interface IStrainList {
  strain_id: number,
  number: string,
  short_name: string[],
  strain_name: string,
  strain_annotate: string[],
  strain_extra: ExtraInfo[],
  allele: IAllele[],
}
const tableData = ref<IStrainList[]>([])
const pageInfo = ref({
  page_no: 1,
  page_size: 20,
  total: 0,
})
const queryForm = ref({
  field: '',
  order: '',
  key: ''
})
const loading = ref(false)
const handleQuery = ()=>{
  pageInfo.value.page_no = 1
  queryList()
}
const queryList = ()=>{
  loading.value = true
  const params = {...queryForm.value,...pageInfo.value}
  ApiStrainList(params).then(res=>{
    pageInfo.value.total = res.data.data.total
    tableData.value = res.data.data.strain_list
  }).finally(()=>{
    loading.value = false
  })
}
const queryMore = ()=>{
  if (pageInfo.value.total < tableData.value.length || loading.value){
    console.log(pageInfo.value.total, loading.value)
    return
  }
  loading.value = true
  pageInfo.value.page_no++
  const params = {...queryForm.value,...pageInfo.value}

  ApiStrainList(params).then(res=>{
    tableData.value.push(...res.data.data.strain_list)
  }).finally(()=>{
    loading.value = false
  })
}
onMounted(()=>{
  queryList()
})
interface AddInfoType {
  title: string,
  open: boolean,
  data?: IAddInfo,
  onCloe: (flag:boolean) => void,
  openType: number
}

const AddInfo = ref<AddInfoType>({
  data: undefined,
  title: '',
  open: false,
  onCloe: (flag:boolean) => {
    AddInfo.value.open = false
    if(flag){
      queryList()
    }
  },
  openType:0
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

  }
  AddInfo.value.openType = 1
  AddInfo.value.open = true
}
const onEdit = (scope: any) => {
  AddInfo.value.title = "修改品系"
  AddInfo.value.data = JSON.parse(JSON.stringify(scope.row))
  AddInfo.value.data?.allele?.map((item:IAllele)=>{
    item.options = [item.name]
  })
  AddInfo.value.openType = 2
  AddInfo.value.open = true
  if(!AddInfo.value.data?.strain_extra){
    AddInfo.value.data!.strain_extra = []
  }
}
const modalInfo = ref({
  open: false,
  msg: '',
  close: (flag:boolean) => {
    modalInfo.value.open = false
    if(flag){
      loading.value = true
      ApiStrainDel((modalInfo.value.row as any).id).then(res=>{
        Message.success(res.data.message || "删除成功")
      }).finally(()=>{
        handleQuery()
      })
    }
  },
  row:{}
})

const onDel = (scope: any) => {
  modalInfo.value.row = scope.row
  modalInfo.value.msg = `确定删除 ${scope.row.strain_name} 吗？`
  modalInfo.value.open = true
}



const handleSortChange = ({ field, direction }) => {
  queryForm.value.field = field;
  queryForm.value.order = direction.toLowerCase();
  pageInfo.value.total = 0
  pageInfo.value.page_no = 1
  queryList()
};
</script>

<template>
  <d-row type="flex" class="table-operation">
    <d-col flex="auto">
      <d-form class="query-form" :data="queryForm" label-size="sm">
        <d-row :gutter="10" class="query-padding">
          <d-col :span="8">
            <d-form-item field="name" label="查询数据">
              <d-input v-model="queryForm.key" placeholder="可搜索任意字段的数据"/>
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
  <d-table empty="暂无数据" table-layout="auto" :show-loading="loading" :data="tableData" style="width: 100%;height: calc(100% - 50px)" header-bg fix-header :lazy="true" @load-more="queryMore" @sort-change="handleSortChange">
    <d-column field="number" header="序列号" sortable></d-column>
    <d-column field="short_name" header="简称" sortable></d-column>
    <d-column field="strain_name" header="品系名" sortable></d-column>
    <d-column field="allele" header="基因名" sortable>
      <template #default="scope">
        <template v-for="item in scope.row.allele">
          <d-tag size="sm" color="blue-w98">{{ item.name }}</d-tag>
        </template>
      </template>
    </d-column>
    <d-column field="allele" header="基因修饰情况" sort-method="sortMethod">
      <template #default="scope">
        <template v-for="item in scope.row.allele">
          <d-tag size="sm" color="green-w98">{{ item.genome }}</d-tag>
        </template>
      </template>
    </d-column>
    <d-column field="strain_annotate" header="品系注解" sortable>

      <template #default="scope">
        <template v-for="item in scope.row.strain_annotate">
          <d-tag size="sm" color="#007d65">{{ item }}</d-tag>
        </template>
      </template>
    </d-column>
    <d-column field="operation" header="操作">
      <template #default="scope">
        <d-button variant="solid" size="sm" color="primary" @click="onEdit(scope)" icon="edit"></d-button>
        &ensp;
        <d-button variant="solid" size="sm" color="danger" @click="onDel(scope)" icon="delete"></d-button>
      </template>
    </d-column>
  </d-table>
  <Add v-if="AddInfo.open" v-model:open="AddInfo.open" :open-type="AddInfo.openType" v-model:data="AddInfo.data!" :title="AddInfo.title" @close="AddInfo.onCloe"/>
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
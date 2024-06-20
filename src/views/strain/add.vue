<script setup lang="ts">
import Extra from "@/views/strain/components/extra.vue";
import {computed, onMounted, ref} from "vue";
import {ExtraInfo} from "@/views/strain/components/extraEdit.vue";
import {getSign, getTimestamp} from "@/util/enc.ts";
import {ApiGetNumber, ApiStrainAdd, ApiStrainUpdate} from "@/api/strain.ts";
import {Message} from "vue-devui";
import {ApiAlleleSearch} from "@/api/allele.ts";

export interface IAllele {
  id?: number,
  name: string,
  genome: string,
  loading?: boolean
  options?: any
}

export interface IAddInfo {
  id?: number
  number: string,
  strain_name: string,
  short_name: string[],
  strain_annotate: string[],
  strain_extra: ExtraInfo[],
  allele: IAllele[]
}

interface IProp {
  title: string,
  open: boolean,
  data: IAddInfo,
  openType: number,
}

const emit = defineEmits(['onClose', "update:open", "update:data"])
const props = defineProps<IProp>()
const tempOpen = computed({
  get() {
    return props.open
  },
  set(val) {
    emit("update:open", val)
  }
})
const tempForm = computed({
  get() {
    return props.data
  },
  set(val) {
    emit("update:data", val)
  }
})
const cancel = () => {
  tempOpen.value = false
}
const onAddAllele = () => {
  tempForm.value.allele.push({
    name: "",
    genome: ""
  })
}
const onDelAllele = () => {
  tempForm.value.allele.pop()
}
const loading = ref(false)
const onSave = () => {
  const data = JSON.parse(JSON.stringify(tempForm.value))
  data.allele = data.allele.map(subData => {
    return {
      "id": subData.id,
      "name": subData.name,
      "genome": subData.genome
    }
  })
  data.strain_extra = data.strain_extra.filter(item => item.extra_key && item.extra_value)
  loading.value = true
  const func = props.openType === 1 ? ApiStrainAdd : ApiStrainUpdate
  func(data).then(res => {
    Message.success(res.data.message || "保存成功")
    emit('onClose', true)
  }).finally(() => {
    loading.value = false
  })
}
const handleGetNumber = () => {
  const time = getTimestamp()
  const sign = getSign(String(time))
  const data = {
    time, sign
  }
  ApiGetNumber(data).then(res => {
    tempForm.value.number = res.data.data.mumber
  })
}
// 查询基因列表
const handleQueryAllele = (value: string, row: IAllele) => {
  row.loading = true
  if (!value) {
    return
  }
  const params = {
    name: value
  }
  ApiAlleleSearch(params).then(res => {
    // 如果没查询到任何基因信息则默认新增一个value值的基因名的基因信息
    row.options = res.data.data.allele || [{name: value, genome: ""}];
  }).finally(() => {
    row.loading = false
  })
}
const handleAlleleChange = (data: any, row: IAllele) => {
  row.name = data.name
  if (data.id) {
    row.id = data.id
    row.genome = data.genome
  }else{
    row.id = undefined
    row.genome = ""
  }
}
onMounted(() => {
  if (props.openType === 1) {
    handleGetNumber()
  }
})
</script>

<template>
  <d-modal v-model="tempOpen" :title="props.title" :keep-last="true" style="width: 700px" :escapable="false"
           :close-on-click-overlay="false">
    <d-form v-model="tempForm" layout="vertical">
      <d-row :gutter="20">
        <d-col :span="12">
          <d-form-item label="序列号" prop="number">
            <d-input v-model="tempForm.number" placeholder="请输入序列号"/>
          </d-form-item>
        </d-col>
        <d-col :span="12">
          <d-form-item label="品系名" prop="strain_name">
            <d-input v-model="tempForm.strain_name" placeholder="请输入品系名"/>
          </d-form-item>
        </d-col>
      </d-row>
      <d-form-item label="简称(可以是多个)" prop="short_name">
        <d-select v-model="tempForm.short_name" :options="[]" :allow-clear="true" multiple filter allow-create
                  placeholder="请选择或输入简称"></d-select>
        <!--        <d-input v-model="tempForm.stain_name" placeholder="请输入简称" />-->
      </d-form-item>


      <d-form-item label="注释(品系名注解，可以是多个)" prop="stain_name" label-size="sm">
        <!--        <d-input v-model="tempForm.strain_annotate" placeholder="请输入注释"/>-->
        <d-select v-model="tempForm.strain_annotate" :options="[]" :allow-clear="true" multiple filter allow-create
                  placeholder="请选择或输入注释"></d-select>
      </d-form-item>
      <d-form-item label="额外信息" prop="strain_extra" label-size="sm">
        <extra v-model="tempForm.strain_extra"/>
      </d-form-item>
      <d-card shadow="never">
        <template #default>
          <d-row :gutter="20">
            <d-col :span="8">
              <span class="custom-form-item">
                基因名
              </span>
            </d-col>
            <d-col :span="16">
              <span class="custom-form-item">
                基因修饰情况
              </span>
            </d-col>
          </d-row>
          <template v-for="item in tempForm.allele">
            <d-row :gutter="20" class="custom-form-item-row">
              <d-col :span="8">
                  <!--                  <d-input v-model="item.name" placeholder="请输入基因名"/>-->
                  <d-select v-model="item.name" :filter="(val)=>handleQueryAllele(val,item)" :allow-clear="true" remote
                            :loading="item.loading" allow-create
                            placeholder="请输入基因名" @value-change="(val)=>handleAlleleChange(val.value, item)">
                    <d-option v-for="option in item.options || []" :key="'allele_name_' + option.id" :value="option"
                              :name="option.name"></d-option>
                  </d-select>
              </d-col>
              <d-col :span="16">
                  <d-input :disabled="item.id" v-model="item.genome" placeholder="请输入基因修饰情况"/>
              </d-col>
            </d-row>
          </template>
          <div class="block flex custom-form-item-row">
            <d-button variant="solid" icon="add" shape="circle" @click="onAddAllele"></d-button>
            <d-button variant="solid" color="danger" icon="delete" shape="circle" @click="onDelAllele"></d-button>
          </div>
        </template>
      </d-card>


      <d-form-operation class="form-operation">
        <d-button variant="solid" @click="onSave">保存</d-button>
        <d-button @click="cancel">取消</d-button>
      </d-form-operation>

    </d-form>

  </d-modal>
</template>


<style lang="scss" scoped>
.custom-form-item{
  color:var(--devui-aide-text, #71757f)
}
.custom-form-item-row{
  margin-top: 8px;
}
:deep(.devui-card__actions),:deep(.devui-card__header){
  margin:0;
  height: 0;
}
</style>
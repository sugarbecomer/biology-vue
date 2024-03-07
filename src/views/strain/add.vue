<script setup lang="ts">
import Extra from "@/views/strain/components/extra.vue";
import {computed} from "vue";
import {ExtraInfo} from "@/views/strain/components/extraEdit.vue";
export interface IAddInfo{
  number: string,
  strain_name :string,
  short_name: string[],
  strain_annotate: string[],
  strain_extra: ExtraInfo[],
  allele: object
}
interface IProp  {
  title: string,
  open: boolean,
  data: IAddInfo,
}
const emit = defineEmits(['onClose',"update:open", "update:data"])
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
</script>

<template>
  <d-modal v-model="tempOpen" :title="props.title" :keep-last="true" style="width: 700px" :escapable="false" :close-on-click-overlay="false">
    <d-form v-model="tempForm" layout="vertical">
      <d-row :gutter="20">
        <d-col :span="12">
          <d-form-item label="序列号" prop="number">
            <d-input v-model="tempForm.number" placeholder="请输入序列号" />
          </d-form-item>
        </d-col>
        <d-col :span="12">
          <d-form-item label="品系名" prop="strain_name"  >
            <d-input v-model="tempForm.strain_name" placeholder="请输入品系名" />
          </d-form-item>
        </d-col>
      </d-row>
      <d-form-item label="简称(可以是多个)" prop="short_name"  >
        <d-select v-model="tempForm.short_name" :options="[]" :allow-clear="true" multiple filter allow-create placeholder="请选择或输入简称"> </d-select>
<!--        <d-input v-model="tempForm.stain_name" placeholder="请输入简称" />-->
      </d-form-item>



      <d-form-item label="注释(品系名注解，可以是多个)" prop="stain_name" label-size="sm">
        <d-input v-model="tempForm.strain_annotate" placeholder="请输入注释" />
      </d-form-item>
      <d-form-item label="额外信息" prop="strain_extra" label-size="sm">
        <extra v-model="tempForm.strain_extra" />
      </d-form-item>
      <d-card shadow="never">
        <template #default>
          <d-row :gutter="20">
            <d-col :span="8">
              <d-form-item label="基因名" prop="allele_name"  >
                <d-input v-model="tempForm.allele_name" placeholder="请输入基因名" />
              </d-form-item>
            </d-col>
            <d-col :span="16">
              <d-form-item label="基因修饰情况" prop="allele_name"  >
                <d-input v-model="tempForm.allele_name" placeholder="请输入基因修饰情况" />
              </d-form-item>
            </d-col>

          </d-row>
          <div class="block"><d-button variant="solid" icon="add" shape="circle"></d-button></div>
        </template>
      </d-card>



      <d-form-operation class="form-operation">
        <d-button variant="solid">保存</d-button>
        <d-button @click="cancel">取消</d-button>
      </d-form-operation>

    </d-form>

  </d-modal>
</template>


<style lang="scss" scoped>


</style>
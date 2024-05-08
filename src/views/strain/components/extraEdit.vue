<script setup lang="ts">
import {computed, watch} from "vue";

export interface ExtraInfo {
  extra_key: string;
  extra_value: string;
}

interface IProp {
  modelValue: ExtraInfo[];
  open: boolean;
}

const emit = defineEmits(['update:modelValue', 'update:open']);
const props = defineProps<IProp>();

const tempOpen = computed({
  get() {
    return props.open;
  },
  set(val) {
    emit('update:open', val);
  }
})
const tempValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
})
const onAdd = () => {
  tempValue.value.push({
    extra_key: '',
    extra_value: ''
  })
}
watch(()=>props.open, (val)=>{
  if (!val || tempValue.value.length > 0){
    return
  }
  tempValue.value.push({
    extra_key: '作者',
    extra_value: ''
  })
  tempValue.value.push({
    extra_key: '时间',
    extra_value: ''
  })
})

</script>
<template>
  <d-modal z-index="999999999" v-model="tempOpen" title="编辑额外信息" :keep-last="true" style="width: 450px"
           :escapable="false" :close-on-click-overlay="false">
    <d-form :model="tempValue" :label-width="100" ref="formRef">
      <template v-for="(item, index) in tempValue" :key="index">
        <d-row :gutter="10" class="extra-row">
          <d-col :span="23">
            <d-input v-model="item.extra_value" placeholder="value">
              <template #prepend>
                <d-input v-model="item.extra_key" placeholder="key"></d-input>
              </template>
            </d-input>
          </d-col>
          <d-col :span="1">
            <d-button variant="text" icon="delete" shape="circle" @click="tempValue.splice(index, 1)"></d-button>
          </d-col>
        </d-row>
      </template>
      <div class="block mt-2">
        <d-button variant="solid" icon="add" shape="circle" @click="onAdd"></d-button>
      </div>
    </d-form>
  </d-modal>
</template>

<style lang="scss" scoped>
.extra-row {
  box-sizing: border-box;
  width: 100%;
  padding: 0px 20px;
  &:not(:last-child){
    margin-bottom: 10px;
  }
}
</style>
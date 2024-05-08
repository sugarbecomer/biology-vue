<script setup lang="ts">
import {computed, ref} from "vue";
import ExtraEdit, {ExtraInfo} from "@/views/strain/components/extraEdit.vue";
interface IProp {
  modelValue: ExtraInfo[];
}
const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<IProp>(), {
  modelValue: undefined,
});
const tempValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
})
const EditInfo = ref({
  open: false,
})
const onEdit = () => {
  EditInfo.value.open = true;
}
// 检测额外信息是否为空
const extraInfoIsNotEmpty = computed(()=>{

  return tempValue.value && tempValue.value.length>0 && tempValue.value.find(item=> item.extra_key && item.extra_value)
})
</script>
<template>
  <d-card shadow="never">
    <template #default>
      <div class="clear-card emptyTip pointer" v-if="!extraInfoIsNotEmpty" @click="onEdit">
        <span>暂无额外信息，点击新增</span>
      </div>
      <d-row class="clear-card pointer" @click="onEdit" wrap v-else>
        <template v-for="item in tempValue" :key="item.key">
          <d-col :span="12" v-if="item.extra_key && item.extra_value">
            <h4>{{item.extra_key}}：</h4> <span>{{item.extra_value}}</span>
          </d-col>
        </template>

      </d-row>
    </template>
  </d-card>
  <extra-edit v-model="tempValue" v-model:open="EditInfo.open"/>
</template>
<style lang="scss" scoped>
.clear-card{
  h4{
    display: inline-block;
    margin: 0.2rem;
    padding: 0px;
  }
}
</style>
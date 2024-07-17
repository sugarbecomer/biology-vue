<template>
  <el-tag
      v-for="tag in props.modelValue"
      :key="tag"
      closable
      :disible-transitions="false"
      @close="handleCloseTag(tag)"
  >
    {{ tag }}
  </el-tag>
  <el-input
      v-if="inputVisible"
      ref="inputRef"
      v-model="inputVal"
      class="w-20"
      size="small"
      @keyup.enter="handleConfirm"
      @blur="handleConfirm"
  />
  <el-button v-else class="button-new-tag" size="small" @click="showInputVal">
    + {{t('components.inputTag.add')}}
  </el-button>
</template>

<script setup lang="ts">
import {nextTick, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
defineOptions({
  name: 'InputTag'
})
const props = withDefaults(defineProps<{modelValue: string[]}>(), {
  modelValue: () => []
});
const tempModel = ref([...props.modelValue])
const emit = defineEmits(['update:modelValue']);
watch(()=>props.modelValue, (val)=>{
  tempModel.value = val
})

const inputVisible = ref(false);
const inputVal = ref('');
const inputRef = ref<HTMLInputElement>();
const handleCloseTag = (tag: string) => {
  const index = tempModel.value.indexOf(tag);
  if (index !== -1) {
    tempModel.value.splice(index, 1);
  }
  emit('update:modelValue', tempModel);
};
const showInputVal = () => {
  inputVisible.value = true;
  nextTick(() => {
    inputRef.value!.focus();
  });
};
const handleConfirm = () => {
  if (inputVal.value) {
    tempModel.value.push(inputVal.value);
    emit('update:modelValue', tempModel);
  }
  inputVisible.value = false;
  inputVal.value = '';
};
</script>

<style lang="scss">
.w-20{
  width: 5rem !important;
}
</style>
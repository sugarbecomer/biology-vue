<script setup lang="ts">
import InputTag from '@/components/input-tag/input-tag.vue';
import StrainExtra from '@/views/strain/extra.vue';
import { ApiAlleleAdd, ApiAlleleUpdate } from '@/api/allele.ts';
import { Ref, computed } from 'vue';
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
interface IAlleleAddProp {
  title?: string;
  open?: boolean;
  id?: number;
  data?: IStrainAddProp;
  close?: (refresh: boolean) => {};
}
defineOptions({
  name: 'AlleleAdd',
});
const props = defineProps<IAlleleAddProp>();
const emit = defineEmits(['close', 'update:open', 'update:data']);
const { t } = useI18n();
const modalOpen = computed({
  get() {
    return props.open;
  },
  set(newVal) {
    emit('update:open', newVal);
  },
});
const modalData: Ref<IAlleleAddDto> = computed({
  get() {
    return props.data || reactive({});
  },
  set(newVal) {
    emit('update:data', newVal);
  },
}) as Ref<IStrainAddDto>;
const handleClose = () => {
  emit('close', false);
};
const loading = ref(false);
const handleSave = () => {
  const data = JSON.parse(JSON.stringify(modalData.value));
  loading.value = true;
  const func = !!props.id ? ApiAlleleUpdate : ApiAlleleAdd;
  func(data)
    .then((res) => {
      ElMessage.success(t(`message.${res.data.key}`) || t('message.success'));
    })
    .finally(() => {
      loading.value = false;
    });
  handleClose();
};
</script>
<template>
  <el-dialog
    append-to-body
    align-center
    v-model="modalOpen"
    :title="props.title"
    width="600"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form v-model="modalData" layout="vertical" label-position="top">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="t('allele.dialog.name.label')" prop="name">
            <el-input v-model="modalData.name" :placeholder="t('allele.dialog.name.placeholder')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="t('allele.dialog.genome.label')" prop="genome">
            <el-input
              v-model="modalData.genome"
              :placeholder="t('allele.dialog.genome.placeholder')"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="t('allele.dialog.serial.label')" prop="serial">
            <el-input
              v-model="modalData.serial"
              :placeholder="t('allele.dialog.serial.placeholder')"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="t('allele.dialog.annotate')" prop="annotate">
            <input-tag v-model="modalData.annotate" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="t('allele.dialog.extra')" prop="extra">
            <strain-extra v-model="modalData.extra" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="w-full flex-center p-1 pb-0">
      <el-button @click="handleSave" type="primary">{{ t('common.button.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

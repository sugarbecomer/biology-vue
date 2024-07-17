<script setup lang="ts">
import InputTag from "@/components/input-tag/input-tag.vue";
import StrainAllele from "@/views/strain/allele.vue";
import StrainExtra from "@/views/strain/extra.vue";
import { getSign, getTimestamp } from "@/util/enc.ts";
import { ApiGetNumber, ApiStrainAdd, ApiStrainUpdate } from "@/api/strain.ts";
import { Ref, watch, computed } from "vue";
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
interface IStrainAddProp {
  title?: string;
  open?: boolean;
  id?: number;
  data?: IStrainAddDto;
  close?: (refresh: boolean) => {};
}
defineOptions({
  name: "StrainAdd",
});
const props = defineProps<IStrainAddProp>();
const emit = defineEmits(["close", "update:open", "update:data"]);
const { t } = useI18n();
const modalOpen = computed({
  get() {
    return props.open;
  },
  set(newVal) {
    emit("update:open", newVal);
  },
});
const modalData: Ref<IStrainAddDto> = computed({
  get() {
    return props.data || reactive({});
  },
  set(newVal) {
    emit("update:data", newVal);
  },
}) as Ref<IStrainAddDto>;
const handleClose = () => {
  emit("close", false);
};
const loading = ref(false);
const handleSave = () => {
  const data = JSON.parse(JSON.stringify(modalData.value));
  data.allele = data.allele
    .filter((subData) => subData.name && subData.genome)
    .map((subData) => {
      return {
        id: subData.id,
        name: subData.name,
        genome: subData.genome,
      };
    });
  loading.value = true;
  const func = !!props.id ? ApiStrainUpdate : ApiStrainAdd;
  func(data)
    .then((res) => {
      ElMessage.success(
        t(`message.${res.data.message}`) || t("message.success")
      );
    })
    .finally(() => {
      loading.value = false;
    });
  handleClose();
};
const handleGetNumber = () => {
  const time = getTimestamp();
  const sign = getSign(String(time));
  const data = {
    time,
    sign,
  };
  ApiGetNumber(data).then((res) => {
    modalData.value.number = res.data.data.mumber;
  });
};
watch(
  () => props.open,
  (val) => {
    if (!val) {
      return;
    }
    if (!props.id) {
      handleGetNumber();
    }
  },
  {
    immediate: true,
  }
);
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
        <el-col :span="8">
          <el-form-item :label="t('strain.dialog.number.label')" prop="number">
            <el-input
              v-model="modalData.number"
              :placeholder="t('strain.dialog.number.placeholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            :label="t('strain.dialog.strain_name.label')"
            prop="strain_name"
          >
            <el-input
              v-model="modalData.strain_name"
              :placeholder="t('strain.dialog.strain_name.placeholder')"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            :label="t('strain.dialog.short_name')"
            prop="short_name"
          >
            <input-tag v-model="modalData.short_name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            :label="t('strain.dialog.strain_annotate')"
            prop="strain_annotate"
          >
            <input-tag v-model="modalData.strain_annotate" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            :label="t('strain.dialog.strain_extra')"
            prop="strain_extra"
          >
            <strain-extra v-model="modalData.strain_extra" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="t('strain.dialog.allele')" prop="allele">
            <strain-allele v-model="modalData.allele" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="w-full flex-center p-1 pb-0">
      <el-button @click="handleSave" type="primary">{{
        t("common.button.confirm")
      }}</el-button>
    </div>
  </el-dialog>
</template>

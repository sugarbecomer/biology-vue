<template>
  <div
    class="min-h-20 shadow w-full hover:shadow-md cursor-pointer bordered rounded hover:-translate-y-[1px]"
  >
    <div
      @click="onAdd"
      v-if="tempModel.length"
      class="w-full grid grid-cols-2 gap-x-4"
    >
      <template v-for="item in tempModel" :key="item.extra_key">
        <div class="col-span-1 p-2 text-sm p-x-4">
          <span class="font-800">{{ item.extra_key }}</span>
          :
          <span class="text-sm pl-2">{{ item.extra_value }}</span>
        </div>
      </template>
    </div>
    <div v-else class="w-full h-full min-h-20 flex-center">
      <el-button @click="onAdd" circle link
        ><i
          class="w-10 h-10 text-[#009688] hover:text-[#1aa194] active:text-[#066f65] i-ri:add-circle-fill"
        />
      </el-button>
    </div>
  </div>
  <el-dialog
    align-center
    v-model="addInfo.open"
    :title="addInfo.title"
    width="400"
    append-to-body
  >
    <el-form inline v-model="addInfo.value">
      <template
        v-for="(item, index) in addInfo.value"
        :key="'add-info-' + index"
      >
        <el-row :gutter="2" class="mb-2" :id="'add-info-' + index">
          <el-col :span="6">
            <el-input
              v-model="item.extra_key"
              :placeholder="t('strain.dialog.strain_extra_key')"
            />
          </el-col>
          <el-col :span="18">
            <el-input
              v-model="item.extra_value"
              :placeholder="t('strain.dialog.strain_extra_value')"
            />
          </el-col>
        </el-row>
      </template>
    </el-form>
    <div class="w-full flex-center p-2 pb-0">
      <el-button @click="handleAddExtra" type="primary" link
        ><i
          class="w-10 h-10 text-[#009688] hover:text-[#1aa194] active:text-[#066f65] i-ri:add-circle-fill"
      /></el-button>
    </div>
    <div class="w-full flex-center p-1 pb-0">
      <el-button @click="handleSave" type="primary">{{
        t("common.button.confirm")
      }}</el-button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
defineOptions({
  name: "StrainExtra",
});
interface IExtraInfo {
  extra_key: string;
  extra_value: string;
}
const { t } = useI18n();
const tempModel = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    val = val.filter((item) => item.extra_key && item.extra_value);
    emit("update:modelValue", val);
  },
});
const props = withDefaults(
  defineProps<{
    modelValue: IExtraInfo[];
  }>(),
  {
    modelValue: () => [],
  }
);
const emit = defineEmits(["update:modelValue"]);
const addInfo = ref({
  open: false,
  title: t("strain.dialog.strain_extra_title"),
  value: tempModel.value,
});
const onAdd = () => {
  addInfo.value.value = JSON.parse(JSON.stringify(tempModel.value));
  if (addInfo.value.value.length === 0) {
    addInfo.value.value.push({
      extra_key: t("strain.dialog.strain_extra_default1"),
      extra_value: "",
    });
    addInfo.value.value.push({
      extra_key: t("strain.dialog.strain_extra_default2"),
      extra_value: "",
    });
    addInfo.value.title = t("strain.dialog.strain_extra_title");
  }
  addInfo.value.open = true;
};
const handleAddExtra = () => {
  addInfo.value.value.push({
    extra_key: "",
    extra_value: "",
  });
};
const handleSave = () => {
  tempModel.value = JSON.parse(JSON.stringify(addInfo.value.value));
  addInfo.value.open = false;
};
</script>

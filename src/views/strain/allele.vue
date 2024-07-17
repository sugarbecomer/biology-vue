<template>
  <div
    class="min-h-20 shadow w-full hover:shadow-md cursor-pointer bordered rounded"
  >
    <el-form v-model="tempModel" label-position="top">
      <template
        v-for="(item, index) in tempModel as IAllele[]"
        :key="'addAllele-' + index"
      >
        <el-row :id="'addAllele-' + index" class="p-x-4 p-t-2" :gutter="2">
          <el-col :span="6">
            <el-form-item :label="t('strain.dialog.allele_name.label')">
              <!-- <el-input v-model="item.name" placeholder=""></el-input> -->
              <el-select
                v-model="item.name"
                remote
                filterable
                allow-create
                default-first-option
                :reserve-keyword="false"
                :remote-method="
                  (val) => {
                    handleQueryAllele(val, item);
                  }
                "
                @change="
                  (val) => {
                    handleChangeAllele(val, item);
                  }
                "
                :loading="item.loading"
                :placeholder="t('strain.dialog.allele_name.placeholder')"
              >
                <el-option
                  v-for="(option, subIndex) in item.options"
                  :key="'allele-option-' + index + '-' + subIndex"
                  :label="option.name"
                  :value="option"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item :label="t('strain.dialog.allele_genome.label')">
              <el-input
                :disabled="!!item.id"
                v-model="item.genome"
                :placeholder="t('strain.dialog.allele_genome.placeholder')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button
              v-if="index > 0"
              class="mt-6"
              @click="handleRemoveAllele(index)"
              type="primary"
              link
              ><i
                class="w-6 h-6 text-[#009688] hover:text-[#1aa194] active:text-[#066f65] i-ri:delete-bin-6-line"
            /></el-button>
          </el-col>
        </el-row>
      </template>
      <div class="w-full flex-center p-2 pb-0">
        <el-button @click="handleAddAllele" type="primary" link
          ><i
            class="w-10 h-10 text-[#009688] hover:text-[#1aa194] active:text-[#066f65] i-ri:add-circle-fill"
        /></el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { computed } from "vue";
import { ApiAlleleSearch } from "@/api/allele.ts";
import { useI18n } from "vue-i18n";
defineOptions({
  name: "StrainAllele",
});
const props = withDefaults(
  defineProps<{
    modelValue: IAllele[];
  }>(),
  {
    modelValue: () => [],
  }
);
const { t } = useI18n();
const emit = defineEmits(["update:modelValue"]);
const tempModel = computed({
  get() {
    return props.modelValue.length > 0 ? props.modelValue : reactive([{}]);
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
const handleAddAllele = () => {
  emit("update:modelValue", [...tempModel.value, {}]);
};
const handleRemoveAllele = (index: number) => {
  const temp = [...tempModel.value];
  temp.splice(index, 1);
  emit("update:modelValue", temp);
};

// 查询基因列表
const handleQueryAllele = (value: string, row: IAllele) => {
  if (!value) {
    return;
  }
  row.loading = true;
  const params = {
    name: value,
  };
  ApiAlleleSearch(params)
    .then((res) => {
      // 如果没查询到任何基因信息则默认新增一个value值的基因名的基因信息
      row.options = res.data.data.allele;
    })
    .finally(() => {
      row.loading = false;
    });
};
const handleChangeAllele = (value: any, row: IAllele) => {
  // 新增基因
  if (typeof value === "string") {
    row.name = value;
  } else {
    // 选择基因
    row.id = value.id;
    row.name = value.name;
    row.genome = value.genome;
  }
};
</script>

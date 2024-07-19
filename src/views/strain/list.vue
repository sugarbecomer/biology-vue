<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { ApiStrainList, ApiStrainDel } from "@/api/strain.ts";
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";
import StrainAdd from "./add.vue";
defineOptions({
  name: "StrainList",
});
const { t } = useI18n();
const queryFormRef = ref<FormInstance>();
const queryParams = ref<IStrainListQueryDto>({
  key: "",
  field: "",
  order: "",
});
const pageInfo = ref({
  page_no: 1,
  page_size: 20,
  total: 0,
});
const tableInfo = ref<TableType<IStrainList>>({
  loading: false,
  data: [],
  update(data: IStrainList) {
    const _data = JSON.parse(JSON.stringify(data));
    addInfo.value.id = data.id;
    // 拼接options用于回显
    _data.allele.map((_subData) => {
      _subData.options = [
        {
          id: _subData.id,
          name: _subData.name,
          genome: _subData.genome,
        },
      ];
    });
    addInfo.value.data = _data;
    addInfo.value.title = t("strain.list.update.title");
    addInfo.value.open = true;
    console.log(data);
  },
  delete(id: number) {
    let msg = t("common.delConfirm");
    msg.replace("{ids}", "" + id);
    ElMessageBox.confirm(msg).then(() => {
      tableInfo.value.loading = true;
      ApiStrainDel(id)
        .then((res) => {
          ElMessage.success(
            t(`message.${res.data.message}`) || t("message.success")
          );
        })
        .finally(() => {
          handleQuery();
        });
    });
  },
});
const queryList = () => {
  tableInfo.value.loading = true;
  const params = { ...queryParams.value, ...pageInfo.value };
  ApiStrainList(params)
    .then((res) => {
      pageInfo.value.total = res.data.data.total;
      tableInfo.value.data = res.data.data.strain_list;
    })
    .finally(() => {
      tableInfo.value.loading = false;
    });
};
const handleQuery = () => {
  pageInfo.value.page_no = 1;
  queryList();
};
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  pageInfo.value.total = 0;
  pageInfo.value.page_no = 1;
  queryList();
};
const handleSortChange = ({ column, order }) => {
  console.log(column, order);
  queryParams.value.field = column.property;
  queryParams.value.order = order.toLowerCase().replaceAll("ending", "");
  pageInfo.value.total = 0;
  pageInfo.value.page_no = 1;
  queryList();
};
const loadMore = () => {
  if (
    pageInfo.value.total <= tableInfo.value.data.length ||
    tableInfo.value.loading
  ) {
    return;
  }
  tableInfo.value.loading = true;
  pageInfo.value.page_no++;
  const params = { ...queryParams.value, ...pageInfo.value };

  ApiStrainList(params)
    .then((res) => {
      tableInfo.value.data.push(...res.data.data.strain_list);
    })
    .finally(() => {
      tableInfo.value.loading = false;
    });
};
onMounted(() => {
  handleQuery();
});
const addInfo = ref<IStrainAddProp>({
  close: (refresh: boolean) => {
    if (refresh) {
      handleQuery();
    }
    addInfo.value.open = false;
  },
});
const onAdd = () => {
  addInfo.value.title = t("strain.list.add.title");
  addInfo.value.data = {};
  addInfo.value.open = true;
};
</script>
<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="78px"
    >
      <el-form-item :label="t('strain.list.search.label')" prop="key">
        <el-input
          v-model="queryParams.key"
          maxlength="30"
          :placeholder="t('strain.list.search.placeholder')"
          clearable
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          plain
          v-loading="tableInfo.loading"
          type="primary"
          @click="handleQuery"
        >
          <template #icon>
            <i class="i-ri:search-line"></i>
          </template>
          {{ t("common.button.query") }}
        </el-button>
        <el-button
          v-loading="tableInfo.loading"
          @click="resetQuery"
          type="danger"
          plain
        >
          <template #icon>
            <i class="i-ri:delete-bin-6-line"></i>
          </template>
          {{ t("common.button.reset") }}
        </el-button>
      </el-form-item>
    </el-form>
    <div class="flex justify-end mb-3">
      <el-button type="primary" @click="onAdd">
        <template #icon><i class="i-ri:add-large-line"></i></template>
        {{ t("common.button.add") }}
      </el-button>
    </div>
    <div class="table-container">
      <el-table
        :element-loading-text="t('common.loadingText')"
        class="custom-table"
        v-loading="tableInfo.loading"
        :data="tableInfo.data"
        border
        @sort-change="handleSortChange"
        v-el-table-infinite-scroll="loadMore"
        :infinite-scroll-immediate="false"
      >
        <template #empty>
          <div class="empty-text flex-center gap-3 p-5 select-none">
            <i
              class="i-ri:emotion-normal-fill w-10 h-10 inline-block text-red-200"
            ></i>
            <span>{{ t("common.table.emptyText") }}</span>
          </div>
        </template>
        <el-table-column
          :label="t('strain.list.table.number')"
          align="center"
          prop="number"
          sortable="custom"
        />
        <el-table-column
          :label="t('strain.list.table.short_name')"
          align="center"
          prop="short_name"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :label="t('strain.list.table.strain_name')"
          align="center"
          prop="strain_name"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :label="t('strain.list.table.allele_name')"
          align="center"
          prop="allele_name"
          sortable="custom"
        >
          <template #default="scope">
            <template v-for="item in scope.row.allele">
              <el-tag v-if="item.name" size="small" type="success">{{ item.name }}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="t('strain.list.table.allele_genome')"
          align="center"
          prop="allele"
        >
          <template #default="scope">
            <template v-for="item in scope.row.allele">
              <el-tag size="small" type="warning">{{ item.genome }}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="t('strain.list.table.strain_annotate')"
          align="center"
          prop="strain_annotate"
        >
          <template #default="scope">
            <template v-for="item in scope.row.strain_annotate">
              <el-tag size="small" type="info">{{ item }}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="t('common.table.operation')"
          align="center"
          width="300"
        >
          <template #default="scope">
            <el-button type="primary" link @click="tableInfo?.update(scope.row)"
              >{{ t("common.button.update") }}
            </el-button>
            <el-button type="danger" link @click="tableInfo?.delete(scope.row)"
              >{{ t("common.button.delete") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <StrainAdd
    :open="addInfo.open"
    :title="addInfo.title"
    :id="addInfo.id"
    v-model:data="addInfo.data"
    @close="addInfo.close"
  />
</template>

<style lang="scss">
.app-container {
  height: 100%;
}
.table-container {
  height: calc(100% - 90px);
  max-height: calc(100% - 90px);
}
.custom-table {
  @apply w-full h-full;
  .el-scrollbar__wrap {
    height: 100% !important;
  }
}
</style>

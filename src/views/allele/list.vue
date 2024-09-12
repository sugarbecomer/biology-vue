<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus';
import { default as vElTableInfiniteScroll } from 'el-table-infinite-scroll';
import AlleleAdd from './add.vue';
import { useUserStore } from '@/store/userStore.ts';
import { ApiAlleleList, ApiAlleleDelete } from '@/api/allele.ts';
defineOptions({
  name: 'AlleleList',
});
const { t } = useI18n();
const queryFormRef = ref<FormInstance>();
const queryParams = ref<IStrainListQueryDto>({
  key: '',
  field: '',
  order: '',
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
    addInfo.value.data = _data;
    addInfo.value.title = t('allele.list.update.title');
    addInfo.value.open = true;
    console.log(data);
  },
  delete(row: any) {
    let msg = t('common.delConfirm');
    console.log(msg);
    msg = msg.replace('name', row.name as string);
    console.log(msg);
    ElMessageBox.confirm(msg, {
      type: 'warning',
    }).then(() => {
      tableInfo.value.loading = true;
      ApiAlleleDelete(row.id)
        .then((res) => {
          ElMessage.success(t(`message.${res.data.key}`) || t('message.success'));
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
  ApiAlleleList(params)
    .then((res) => {
      pageInfo.value.total = res.data.data.total;
      tableInfo.value.data = res.data.data.allele;
    })
    .finally(() => {
      tableInfo.value.loading = false;
    });
};
const handleQuery = () => {
  pageInfo.value.page_no = 1;
  queryList();
};
const userStore = useUserStore();
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  pageInfo.value.total = 0;
  pageInfo.value.page_no = 1;
  queryList();
};
const handleSortChange = ({ column, order }) => {
  console.log(column, order);
  queryParams.value.field = column.property;
  queryParams.value.order = order.toLowerCase().replaceAll('ending', '');
  pageInfo.value.total = 0;
  pageInfo.value.page_no = 1;
  queryList();
};
const loadMore = () => {
  if (pageInfo.value.total <= tableInfo.value.data.length || tableInfo.value.loading) {
    return;
  }
  tableInfo.value.loading = true;
  pageInfo.value.page_no++;
  const params = { ...queryParams.value, ...pageInfo.value };

  ApiAlleleList(params)
    .then((res) => {
      tableInfo.value.data.push(...res.data.data.allele);
    })
    .finally(() => {
      tableInfo.value.loading = false;
    });
};
onMounted(() => {
  handleQuery();
});
const addInfo = ref<IAlleleAddProp>({
  close: (refresh: boolean) => {
    if (refresh) {
      handleQuery();
    }
    addInfo.value.open = false;
  },
});
const onAdd = () => {
  addInfo.value.title = t('allele.list.add.title');
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
      @submit.native.prevent="handleQuery"
    >
      <el-form-item :label="t('allele.list.search.label')" prop="key">
        <el-input
          v-model="queryParams.key"
          maxlength="30"
          :placeholder="t('allele.list.search.placeholder')"
          clearable
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item>
        <el-button plain v-loading="tableInfo.loading" type="primary" @click="handleQuery">
          <template #icon>
            <i class="i-ri:search-line"></i>
          </template>
          {{ t('common.button.query') }}
        </el-button>
        <el-button v-loading="tableInfo.loading" @click="resetQuery" type="danger" plain>
          <template #icon>
            <i class="i-ri:delete-bin-6-line"></i>
          </template>
          {{ t('common.button.reset') }}
        </el-button>
      </el-form-item>
    </el-form>
    <div class="flex justify-end mb-3">
      <el-button :disabled="!userStore.username" type="primary" @click="onAdd">
        <template #icon><i class="i-ri:add-large-line"></i></template>
        {{ t('common.button.add') }}
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
            <i class="i-ri:emotion-normal-fill w-10 h-10 inline-block text-red-200"></i>
            <span>{{ t('common.table.emptyText') }}</span>
          </div>
        </template>
        <el-table-column
          :label="t('allele.list.table.name')"
          align="center"
          prop="name"
          sortable="custom"
        />
        <el-table-column
          :label="t('allele.list.table.genome')"
          align="center"
          prop="genome"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :label="t('allele.list.table.serial')"
          align="center"
          prop="serial"
          sortable="custom"
          width="100"
        >
        </el-table-column>
        <el-table-column
          :label="t('allele.list.table.annotate')"
          align="center"
          prop="annotate"
          sortable="custom"
        >
          <template #default="scope">
            <template v-for="item in scope.row.annotate">
              <el-tag v-if="item" size="small" type="success">{{ item }}</el-tag>
            </template>
          </template>
        </el-table-column>

        <el-table-column
          :label="t('allele.list.table.extra')"
          align="center"
          prop="extra"
          sortable="custom"
        >
          <template #default="scope">
            <template v-for="item in scope.row.extra">
              <el-tag v-if="item.name" size="small" type="success"
                >{{ item.extra_key }} : {{ item.extra_value }}</el-tag
              >
            </template>
          </template>
        </el-table-column>
        <el-table-column :label="t('common.table.operation')" align="center" width="120">
          <template #default="scope">
            <el-button
              :disabled="!userStore.username"
              type="primary"
              link
              @click="tableInfo?.update(scope.row)"
              >{{ t('common.button.update') }}
            </el-button>
            <el-button
              :disabled="!userStore.username"
              type="danger"
              link
              @click="tableInfo?.delete(scope.row)"
              >{{ t('common.button.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <AlleleAdd
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

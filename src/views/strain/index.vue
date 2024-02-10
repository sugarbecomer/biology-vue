<script setup lang="ts">
import {ref} from "vue";
const data = {
  number: '#123',
  short_name: '张品',
  stain_name: '张三品系',
  allele:[{
    allele_name: '基因1',
    genome_name: '基因1修饰情况',
  },{
    allele_name: '基因2',
    genome_name: '基因2修饰情况',
  }],
  strain_annotate: ['张三品系注解1','张三品系注解2']
}
const tableData = ref([data])
</script>

<template>
  <d-row type="flex" class="table-operation">
    <d-col flex="auto" >auto</d-col>
    <d-col flex="300px"><d-button variant="solid" size="md" color="primary">新增</d-button> <d-button variant="solid" size="md" color="secondary">修改</d-button> <d-button variant="solid" size="md" color="danger">删除</d-button></d-col>
  </d-row>
  <d-table table-layout="auto" :data="tableData" style="width: 100%" header-bg>
    <d-column field="number" header="序列号"></d-column>
    <d-column field="short_name" header="简称"></d-column>
    <d-column field="stain_name" header="品系名"></d-column>
    <d-column field="allele" header="基因名">
      <template #default="scope">
        <template v-for="item in scope.row.allele">
          <d-tag size="sm" color="blue-w98">{{item.allele_name}}</d-tag>
        </template>
      </template>
    </d-column>
    <d-column field="allele" header="基因修饰情况">
      <template #default="scope">
        <template v-for="item in scope.row.allele">
          <d-tag size="sm" color="green-w98">{{item.genome_name}}</d-tag>
        </template>
      </template>
    </d-column>
    <d-column field="strain_annotate" header="品系注解">

      <template #default="scope">
        <template v-for="item in scope.row.strain_annotate">
          <d-tag size="sm" color="#007d65">{{item}}</d-tag>
        </template>
      </template>
    </d-column>
  </d-table>
</template>

<style lang="scss" scoped>

</style>
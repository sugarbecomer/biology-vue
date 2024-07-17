declare interface IPageInfo {
  page_no?: number; // 页码
  page_size?: number; // 每页数量
  total?: number; // 总数
}

declare interface IStrainListQueryDto {
  key: string; // 查询关键字
  order?: string; // 排序规则
  field?: string; // 排序字段
}
declare interface IStrainAddProp {
  title?: string;
  open?: boolean;
  id?: number;
  data?: IStrainAddDto;
  close?: (refresh: boolean) => void;
}
declare interface IStrainAddDto {
  id?: number;
  number?: string;
  strain_name?: string;
  short_name?: string[];
  strain_annotate?: string[];
  strain_extra?: IExtraInfo[];
  allele?: IAllele[];
}

declare interface IStrainList {
  id: number;
  number: string;
  short_name: string[];
  strain_name: string;
  strain_annotate: string[];
  strain_extra: IExtraInfo[];
  allele: IAllele[];
}

declare interface IExtraInfo {
  extra_key: string;
  extra_value: string;
}

declare interface IAllele {
  id?: number;
  name: string;
  genome: string;
  loading?: boolean;
  options?: IAllele[];
}

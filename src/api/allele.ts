import { request } from '@/util/request';

export const ApiAlleleSearch = (params: any) => {
  return request.post('/biology/allele_search', params);
};

export const ApiAlleleList = (params: any) => {
  return request.post('/allele_list', params);
};

export const ApiAlleleAdd = (params: any) => {
  return request.post('/biology/allele_add', params);
};

export const ApiAlleleUpdate = (params: any) => {
  return request.post('/biology/allele_update', params);
};

export const ApiAlleleDelete = (id: number) => {
  const data = { id };
  return request.post('/biology/allele_delete', data);
};

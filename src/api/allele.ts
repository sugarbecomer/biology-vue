import {request} from '@/util/request'


export const ApiAlleleSearch = (params:any)=> {
    return request.post('/biology/allele_search', params);
}


export const ApiAlleleList = (params:any)=>{
    return request.post('/biology/allele_list', params);
}
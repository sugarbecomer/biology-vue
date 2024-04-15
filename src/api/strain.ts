import {request} from '@/util/request'

export const ApiStrainList = (params:any)=>{
    return request.post('/biology/strain_list', params);
}
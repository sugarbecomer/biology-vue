import {request} from '@/util/request'

export const ApiStrainList = (params:any)=>{
    return request.post('/biology/strain_list', params);
}

export const ApiGetNumber = (data:any)=>{
    return request.post('/biology/get_number', data)
}

export const ApiStrainAdd = (data:any)=>{
    return request.post('/biology/strain_add', data)
}
export const ApiStrainUpdate = (data:any)=>{
    return request.post('/biology/strain_update', data)
}
export const ApiStrainDel = (id:number)=>{
    const data = {strain_id: id}
    return request.post('/biology/strain_delete', data)
}
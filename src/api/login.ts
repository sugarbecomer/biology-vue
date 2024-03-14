import {request} from '@/util/request'

export const ApiLogin = (data: any) => {
    return request.post('/login', data);
}
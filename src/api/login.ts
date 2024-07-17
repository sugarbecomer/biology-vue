import {request} from '@/util/request'

export interface ApiLoginDto {
    username: string,
    password: string
    time: number,
    sign: string
}

export const ApiLogin = (data: ApiLoginDto) => {
    return request.post('/login', data);
}

export const ApiRegister = (data: ApiLoginDto) =>{
    return request.post('/register', data);
}

export const ApiHeartBeat = ()=>{
    return request.post("/valid")
}
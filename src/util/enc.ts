import { md5 } from 'js-md5';
// 获取sign参数
export const getSign = (username:string, password:string, timestamp:number):string  => {
    const str = username + timestamp + password;
    // md5加密
    return md5(str).toUpperCase();
}

// 获取当前时间戳 10位数
export const getTimestamp = ():number=>{
    return Math.floor(new Date().getTime() / 1000);
}
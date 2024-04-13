import { md5 } from 'js-md5';

// 获取sign参数
export const getSign = (username:string, password:string, timestamp:number):string  => {
    const str = username + timestamp + password;
    // md5加密
    return md5(str).toUpperCase();
}
// 密码两次md5加密
export const getPassword = (password:string):string=>{
    return md5(md5(password)).toUpperCase();
}


// 获取当前时间戳 10位数
export const getTimestamp = ():number=>{
    return Math.floor(new Date().getTime() / 1000);
}

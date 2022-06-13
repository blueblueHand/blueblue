import Service from './request';
//登录
export function getLogin(loginData: object){
    return Service.post('./api/auth/oauth/token', loginData).then((res) => {
        return res && res.data;
    });
}
/****   request.js   ****/
import axios from 'axios'
import CookieUtil from '../utils/cookie.js'
import { Toast } from 'antd-mobile'
// 公共错误码
const codeMessage : any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

//配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
const contentType = "application/json;charset=UTF-8"
 
//1. 创建新的axios实例
const Service = axios.create({
    baseURL: window.location.origin + '/', // 公共接口-本地
    timeout: 30 * 1000, // 超时时间单位是ms
    headers: {
        "Content-Type": contentType,
    },
})
 
// 2.请求拦截器
Service.interceptors.request.use((config: any) => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
    //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    const token = CookieUtil.get('token'); //这里取token之前，需要先拿到token,存一下
    if (token) {
        // config.params = { 'token': token } //如果要求携带在参数中
        // config.headers.Authorization = '5fb94a47-0904-4368-819f-0d0c7f534a6a'; //如果要求携带在请求头中
        config.headers.Authorization = token; //如果要求携带在请求头中
    }
    // config.headers.username = getUsername(); //如果要求携带在请求头中
    return config;
}, error => {
    return Promise.reject(error);
})
 
// 3.响应拦截器
Service.interceptors.response.use((response: any) => {
    const {
        data,
        config
    } = response;
    if (data.code !== 200) {
				switch (data.code) {
					case 'ASG0004':
					case 'ASU0004':
					case 'ASU0005':
					case 'ASU0011': // 从系统获取不到登录用户
					case 'ASU0010': // 用户重新登录
						// 清楚当前已过期token，比哦那个跳转至登陆页面
						// CookieUtil.unset('token');
						// window.location.href = '/#/login';
						return null;
					case 'ASU0000':
						// 用户{0}未登陆该模块{1}
						// mesObj.description = '请登录';
						// window.location.href = '/#/login';
						break;
					case 'ASU0001':
						// 用户{0}没有权限操作该模块{1}
						// mesObj.description = response.message || '权限不足';
						// 跳转至暂无权限页面
						break;
					case 'AS00004':
						// mesObj.description = '发生未知错误';
						// mesObj.message = `错误码${response.code}`;
						break;
					case 'AS00000':
					case 'MR00002':
						return response.data;
					default:
						// mesObj.description = response.message || '发生未知错误';
						// mesObj.message = `错误码${response.code || 'unknown error code'}`;
						// Toast.show({
						// 	content: `错误码${data.code || 'unknown error code'}`
						// })
						break;
				}
        return Promise.reject(new Error(data.msg));
    } else {
        return data;
    }
}, error => {
    console.log(error)
    if (error && error.response) {
        // 1.公共错误处理
        // 2.根据响应码具体处理
				error.message =	codeMessage[error.response.status];
    } else {
        // 超时处理
        // Message.error('连接服务器失败')
				Toast.show({
					content: '连接服务器失败',
				});
    }
    return Promise.reject(error);
})
 
//4.导出文件
export default Service;

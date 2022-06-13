// 导入路由组件
import Home from '../views/home/home'
import Login from '../views/demo/login/login'
// import About from '../views/About'
// import Contact from '../views/Contact'
// 导入路由管理工具
import {RouteConfig} from 'react-router-config'
 
const routes:RouteConfig = [
  {
    path:'/home',
    exact:true,
    component:Home
  },
  {
    path: '/login',
    exact: true,
    component: Login
  }
]
 
export default routes;

import React, { Component } from "react";
import './home.less';
//导入要使用的接口
import { getCarList } from "../../api/index";

import logo from "@/assets/logo.svg"
export default class Home extends Component {
  // 定义方法
  getList() {
    getCarList({ page: "1" }).then((res) => console.log(res));
  }

  render() {
    return (
      <div className="home">
        <div className="container">
          <h3 className="center"> Home页面</h3>
          <p>欢迎来到首页</p>
          {/* 点击事件调用 */}
          <button onClick={this.getList}>获取数据</button>
        </div>
      </div>
    );
  }
}

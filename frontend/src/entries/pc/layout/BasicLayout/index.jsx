import React from 'react';
import './index.scss';
import { Input } from 'antd';
import { UserOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';

export default function BasicLayout(params = { children: {} }) {
  return (
    <section className='basic-layout'>
      <div className='header'>
        <div className='caption' style={{ cursor: "pointer" }} onClick={() => {
          console.log("this====", params);
          // this.props.history.push("/");
          window.location.href = ("#/")
        }}>
          <div className='text1'>Home</div>
        </div>
        <div className='right'>
          <UserOutlined style={{ color: "#fff", marginLeft: "20px" }} /><span style={{ marginLeft: "10px", cursor: "pointer" }} onClick={() => {
            console.log("this====", params);
            // this.props.history.push("/login");
            window.location.href = ("#/login")
          }}>Sign In</span>
        </div>
      </div>
      <div className='basic-layout-content'>
        {params.children}
      </div>

      <div className='footer'>
        <span className='caption'>
          ©2022 All Rights Reserved.
        </span>
      </div>
    </section>
  );
}

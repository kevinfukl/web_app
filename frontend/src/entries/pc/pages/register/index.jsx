/**
 * 士兵页面
 *
 *
 */
import React, { memo, useState, useEffect } from 'react';
import { Form, Upload, Row, Col, Radio, Table, Input, Button, Select, Modal, DatePicker } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormOutlined, UploadOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { List, message, Avatar, Spin } from 'antd';
import './index.scss';
import { register} from '../../../../api/pet'

class ListData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname:"",
      lastname:"",
      phone:"",
      email:"",
      password:"",
    };
  }

  async submit(){
    const {firstname,lastname,email,password,phone} = this.state;
    if(!firstname){
      message.error("please input firstname");
      return;
    }
    if(!lastname){
      message.error("please input lastname");
      return;
    }
    if(!phone){
      message.error("please input phone");
      return;
    }
    if(!email){
      message.error("please input email");
      return;
    }
    if(!password){
      message.error("please input password");
      return;
    }
    let res = await register({
      firstname,lastname,email,password,phone
    });
    console.log("res=",res);
    if(res.code!==0){
      message.error(res.error);
    }else{
      message.success("register success");
      this.props.history.push("/login")
    }
  }
  render() {
    const {firstname,lastname,email,password,phone} = this.state;
    return (
      <div class="reg-container">
        <div class="container-wrapper">
          <div class="caption">
            Sign up an account
          </div>
          <div class="row">
            <div class="row-label">First Name</div>
            <input  class="row-input"  value={firstname} onChange={(event)=>{
              this.setState({
                firstname:event.target.value
              })
            }}  />
          </div>
          <div class="row">
            <div class="row-label">Last Name</div>
            <input class="row-input"  value={lastname} onChange={(event)=>{
              this.setState({
                lastname:event.target.value
              })
            }}  />
          </div>
          <div class="row">
            <div class="row-label">Phone</div>
            <input class="row-input"  value={phone} onChange={(event)=>{
              this.setState({
                phone:event.target.value
              })
            }}  />
          </div>
          <div class="row">
            <div class="row-label">Email</div>
            <input class="row-input"  value={email} onChange={(event)=>{
              this.setState({
                email:event.target.value
              })
            }}  />
          </div>
          <div class="row">
            <div class="row-label">Password</div>
            <input  class="row-input" type={password}  value={password} onChange={(event)=>{
              this.setState({
                password:event.target.value
              })
            }}  />
          </div>
          <div class="confirm-button" click="confirm" onClick={()=>{
            this.submit();
          }}>Confirm</div>
          <div class="tail"><div class="right" onClick={() => {
            this.props.history.push("/login")
          }}>Login</div></div>
        </div >
      </div >);
  }
};

export default ListData;

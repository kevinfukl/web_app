import React from 'react';
import { Form, Upload, Row, Col, Table, Input, Button, Select, Modal, DatePicker, message } from 'antd';
import { FormOutlined, UploadOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import env from '../../../../config/config';
import { getList, saveObj, updateObj, publish,addCart } from '../../../../api/pet'
import "./index.scss";

const moment = require("moment");
const { Search } = Input;
const { prefix } = env

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const formRef = React.createRef();
const $ = require("jquery");

var rows = [];
const goodList = [
  {
    id:"nihoo",
    name:"Apple iPhone 11, 128G",
    image:"https://img1.baidu.com/it/u=3809066891,839766530&fm=253&fmt=auto&app=120&f=JPEG?w=650&h=447",
    price:200.00,
  },
  {
    id:"nihoo22",
    name:"Apple iPhone 11, 128G",
    image:"https://img1.baidu.com/it/u=3809066891,839766530&fm=253&fmt=auto&app=120&f=JPEG?w=650&h=447",
    price:200.00,
  }
];
class NoteList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      objItem: {},
      searchValue: '',
      list: []
    }

  }

  // detect whether the user has logged in
  componentWillMount() {
    if(!localStorage.getItem("user")){
      this.props.history.push("/login");
    }
  }

  
  handleChange(){

  }



  render() {
    let user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
      <div style={{  height: "100%", boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', height: "100%" ,fontSize:"20px"}}>
         welcome {user.firstname} {user.lastname}
        </div>

      </div>


    )
    // } else {
    //   return (
    //     <div>
    //       <h1>Note List</h1>
    //     </div>
    //   )
    // }

  }
}
export default NoteList;
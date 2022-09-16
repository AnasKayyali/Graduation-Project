import { Table, Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { Expand, notExpand } from '../store/sideBar.jsx';
import { Col, Input } from 'reactstrap';
import { BellTwoTone } from '@ant-design/icons';
import  { BsGlobe }  from 'react-icons/bs';
import { MenuOutlined } from '@ant-design/icons';
import Logo2 from '../images/d5ee0e9c87bb54cf867d7fb89c4570b8-online-education-logo.png';

const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const UserList = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  
const fetchData = () => {
  setLoading(true);
  fetch(`https://wl-users-service.herokuapp.com/api/v1/users?${qs.stringify(getRandomuserParams(tableParams))}`)
    .then((res) => res.json())
    .then(( results ) => {
      console.log(results);
      setData(results.data.original.data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 200, // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    });
};

useEffect(() => {
  fetchData();
}, [JSON.stringify(tableParams)]);

const handleTableChange = (pagination, filters, sorter) => {
  setTableParams({
    pagination,
    filters,
    ...sorter,
  });
};

  const columns = [
    {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      width: '20%',
      },
      {
        title: 'Profile Picture',
        dataIndex: 'profile_picture',
        render: () => <img src={Logo2} alt="" width="50"/>,
        sorter: true,
        width: '20%',
        },
    {
    title: 'Email',
    dataIndex: 'email',
    },
  ];


      const [open, setOpen] = useState(false);
      const [confirmLoading, setConfirmLoading] = useState(false);
      const [name, setName] = useState("");
      const [gender, setGender] = useState("");
      const [email, setEmail] = useState("");
      
      const showModal = () => {
        setOpen(true);
      };
    
      const handleOk = () => {
        const newData = {
          name: name,
          gender: gender,
          email: email,
        };
        const sendInfo = async () => {
          const axios = require('axios')
          await axios.post(
          'https://wl-users-service.herokuapp.com/api/v1/users', 
          {name:name , gender:gender , email: email}
          )
          .then(function (response) {localStorage['token']=response.data.data.token; console.log(response.data.data.token)})
          .catch(function (error) {console.log(error)})
          setData([...data, newData]);
          setName("");
          setGender("");
          setEmail("");
          setConfirmLoading(true);
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
          }, 2000);
        }
      };
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
      };

  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const hideBar = globalState.sideBar.isExpand;

  const sideBarHandler = (status) => {
    if (status) {
      dispatch(notExpand());
    } else {
      dispatch(Expand());
    }
  };

  return (
    <Col lg-auto className='pt-3'>
      <div className='d-flex align-items-center justify-content-between mb-5'>
        <MenuOutlined className='d-flex align-items-center' style={{fontSize:30,color:'gray'}} onClick={() => {sideBarHandler(hideBar)}}  />
        <div style={{fontSize:30,marginTop:-5}} className='d-flex align-items-center justify-content-between gap-3'>
          <BellTwoTone style={{fontSize:28}}/>
          <BsGlobe style={{color:'gray',fontSize:25}} />
          <img src={ Logo2 } alt="Logo" width='42'/>
        </div>
      </div>
      <Button type="primary" onClick={showModal} className="mb-1" size={'large'}>
        Add User
      </Button>
      <Modal
      title="Add User"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      >
      <Input
      value={name}
      onChange={(e) => setName(e.target.value)}
      id="examplName"
      name="name"
      placeholder="name"
      type="text"
      size='md'
      required
      className='mb-4'
      />
    
      <Input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      id="exampleEmail"
      name="email"
      placeholder="email"
      type="email"
      size='md'
      required
      />
      </Modal>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </Col>
  );
};

export default UserList;
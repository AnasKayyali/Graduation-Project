import { Table, Button, Modal, InputNumber, Form, Input, Popconfirm, Typography } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { Expand, notExpand } from '../store/sideBar.jsx';
import { Col } from 'reactstrap';
import { BellTwoTone } from '@ant-design/icons';
import  { BsGlobe }  from 'react-icons/bs';
import { MenuOutlined } from '@ant-design/icons';
import Logo2 from '../images/d5ee0e9c87bb54cf867d7fb89c4570b8-online-education-logo.png';

// Edit Handler //

const EditableCell2 = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

// Edit Handler //


// Delete Handler //

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

//Delete Handler//



const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const UserList = () => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  
  // Edit Handler //
   
  

  // Edit Handler //

  //Delete Handler//

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  
  const defaultColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      width: '10%',
    },
    {
      title: 'Profile Picture',
      dataIndex: 'profile_picture',
      render: () => <img src={Logo2} alt="" width="50"/>,
      width: '8%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            Delete
          </Popconfirm>
      ) : null,
    }
  ];

  const handleSave = (row) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setData(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  //Delete Handler//

  
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

      const [open, setOpen] = useState(false);
      const [confirmLoading, setConfirmLoading] = useState(false);
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      
      const showModal = () => {
        setOpen(true);
      };
    
      const handleOk = () => {
        const newData = {
          name: name,
          email: email
        };
        const sendInfo = async () => {
          const axios = require('axios')
          await axios.post(
          'https://wl-users-service.herokuapp.com/api/v1/users', 
          {name:name , email: email}
          )
          .then((res) => res.json())
          .then(
            function (results) 
              { if (results.success) 
                {
                  setData([...data, newData]);
                  setName("");
                  setEmail("");
                  setConfirmLoading(true);
                  setTimeout(() => {
                  setOpen(false);
                  setConfirmLoading(false);
                  }, 2000);  
                }
                else {
                  console.log(results.success) 
                }
              }
            )
          .catch(function (error) {console.log(error)})
        };
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
      placeholder="name"
      className='mb-4'
      />
      <Input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="email"
      />
      </Modal>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
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
import { Form, InputNumber, Popconfirm, Table, Typography, Button, Modal } from 'antd';
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

const EditableCell = ({
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

const MaterialList = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  
const fetchData = () => {
  setLoading(true);
  fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
    .then((res) => res.json())
    .then(({ results }) => {
      setData(results);
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


  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const columns = [
     {
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: (name) => `${name.first} ${name.last}`,
  width: '20%',
},
{
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    {
      text: 'Male',
      value: 'male',
    },
    {
      text: 'Female',
      value: 'female',
    },
  ],
  width: '20%',
},
{
  title: 'Email',
  dataIndex: 'email',
},
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '1%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              Cancel
            </Popconfirm>
            </Typography.Link>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Typography.Link
            style={{marginLeft: 20}} >
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                Delete
              </Popconfirm>
            </Typography.Link>
          </>
          
        );
      },
    },
  ];


      const [open, setOpen] = useState(false);
      const [confirmLoading, setConfirmLoading] = useState(false);
      const [name, setName] = useState("");
      const [age, setAge] = useState("");
      const [address, setAddress] = useState("");
      
      const showModal = () => {
        setOpen(true);
      };
    
      const handleOk = () => {
        const newData = {
          key: 1,
          name: name,
          age: age,
          address: address,
        };
        setData([...data, newData]);
        setName("");
        setAge("");
        setAddress("");
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
      };
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
      };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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
      value={age}
      onChange={(e) => setAge(e.target.value)}
      id="exampleAge"
      name="age"
      placeholder="age"
      type="text"
      size='md'
      required
      className='mb-4'
      />
      <Input
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      id="exampleAddress"
      name="address"
      placeholder="address"
      type="address"
      size='md'
      required
      />
      </Modal>
      <Form form={form} component={false}>
        <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowKey={(record) => record.login.uuid}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        />
      </Form>
    </Col>
  );
};

export default MaterialList;
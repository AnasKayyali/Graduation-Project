  import { Form, InputNumber, Popconfirm, Table, Typography, Button, Modal } from 'antd';
  import React, { useState } from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import { Expand, notExpand } from '../store/sideBar.jsx';
  import { Col, Input } from 'reactstrap';

  const originData = [];
  
    originData.push({
      key: 1,
      name: 'Edrward',
      age: 32,
      address: 'London Park no.',
    },
    {
      key: 2,
      name: 'Edrward',
      age: 33,
      address: 'London Park no.',
    },
    {
      key: 3,
      name: 'Edrward',
      age: 34,
      address: 'London Park no.',
    },
    {
      key: 4,
      name: 'Edrward',
      age: 34,
      address: 'London Park no.',
    },
    {
      key: 5,
      name: 'Edrward',
      age: 34,
      address: 'London Park no.',
    },
    {
      key: 6,
      name: 'Edrward',
      age: 34,
      address: 'London Park no.',
    },
    {
      key: 7,
      name: 'Edrward',
      age: 34,
      address: 'London Park no.',
    },
    {
      key: 8,
      name: 'Edrward',
      age: 34,
      address: 'London Park no.',
    },
    {
      key: 9,
      name: 'Edrward',
      age: 34,
      address: 'London Park no.',
    },
    {
      key: 10,
      name: 'Edrward',
      age: 34,
      address: 'London Park no.',
    },
    {
      key: 11,
      name: 'Edrward',
      age: 34,
      address: 'London Park no.',
    },
    {
      key: 12,
      name: 'Edrward',
      age: 34,
      address: 'London Park no.',
    },);
  
  
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
  
  const UserList = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
  
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
        title: 'name',
        dataIndex: 'name',
        width: '15%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '20%',
        editable: true,
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
      <Col lg-auto className='bg-black pt-3 bg-opacity-10'>
        <div>
          <Button type="primary" className="mb-5" onClick={() => sideBarHandler(hideBar)}>
            {hideBar ? 'not Expand' : 'Expand'}
          </Button>
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
          pagination={{
            pageSize: 10,
          }}
          />
        </Form>
      </Col>
    );
  };
  
  export default UserList;
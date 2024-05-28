import { useRef, useState, useEffect } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined, LoadingOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, message, Popconfirm, Modal, Form } from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Navbar from './Components/Navbar.tsx';
import { useNavigate } from 'react-router-dom';
import { User } from './interfaces/Users';

type DataIndex = keyof User;

function AdminSeeAccounts() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isViewModalVisible, setIsViewModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    console.log(searchText);
    console.log(searchedColumn);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/User');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } else {
        setError('Gefaald om data te fetchen');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Gefaald om data te fetchen');
    }
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<User> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Zoek naar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Zoek
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => (
      <SearchOutlined />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsEditModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/User/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        message.success('Account succesvol verwijderd!');
      } else {
        message.error('Gefaald om de Account te verwijderen.');
      }
    } catch (error) {
      console.error('Een error is plaatsgevonden tijdens het verwijderen:', error);
      message.error('Een error is plaatsgevonden tijdens het verwijderen');
    }
  };

  const handleShowInfo = (user: User) => {
    setSelectedUser(user);
    setIsViewModalVisible(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalVisible(false);
    setSelectedUser(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    setSelectedUser(null);
    form.resetFields();
  };

  const handleCreateModalClose = () => {
    setIsCreateModalVisible(false);
  };

  const saveEditChanges = async () => {
    try {
      const values = form.getFieldsValue();

      const response = await fetch(`/api/User`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...selectedUser, ...values }), // Merge selectedUser and form values
      });

      if (response.ok) {
        setUsers(users.map(user => user.id === selectedUser?.id ? { ...selectedUser, ...values } : user));
        message.success('Veranderingen succesvol opgeslagen');
        handleEditModalClose();
        form.resetFields();
      } else {
        message.error('Gefaald om veranderingen op te slagen');
      }
    } catch (error) {
      console.error('Een error is plaatsgevonden tijdens het opslaan van veranderingen:', error);
      message.error('Een error is plaatsgevonden tijdens het opslaan van veranderingen');
    }
  };

  const saveCreateChanges = async () => {
    try {
      const values = form.getFieldsValue();

      const response = await fetch('api/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log(response);
      if (response.ok) {

        message.success('Account succesvol aangemaakt');
        fetchData();
        form.resetFields();
        handleCreateModalClose();
      } else {
        message.error('Gefaald om account te maken');
      }
    } catch (error) {
      console.error('Een error is plaatsgevonden tijdens het maken van een account:', error);
      message.error('Een error is plaatsgevonden tijdens het maken van een account');
    }
  };

  const columns: TableColumnsType<User> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '30%',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Gebruikersnaam',
      dataIndex: 'username',
      key: 'userName',
      width: '30%',
      ...getColumnSearchProps('userName'),
    },
    {
      title: 'Wachtwoord',
      dataIndex: 'password',
      key: 'password',
      width: '30%',
      ...getColumnSearchProps('userName'),
    },
    {
      title: 'Telefoon Nummer',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '30%',
      ...getColumnSearchProps('phoneNumber'),
    },
    {
      title: 'Acties',
      key: 'actions',
      render: (record) => (
        <Space size="middle">
          
          <Button type="link"  onClick={() => handleShowInfo(record)}> <InfoCircleOutlined /></Button>
          <Button type="link" onClick={() => handleEdit(record)}> <EditOutlined /></Button>
          <Popconfirm 
          title="Wil je het zeker verwijderen?" 
          onConfirm={() => handleDelete(record.id)} 
          okText="Ja"
          cancelText="Nee">
             <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mt-3">

      

        {loading && <h1>Loading... <LoadingOutlined /></h1>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <>
            <Table columns={columns} dataSource={users} pagination={{ pageSize: 7 }} />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalVisible(true)}>
              Maak aan
            </Button>
          </>

        )}
        <Button type="primary" style={{ marginLeft: 55 }} onClick={() => navigate(-1)}>
          Ga terug
        </Button>
      </div>

      <Modal
        title="Account Info"
        visible={isViewModalVisible}
        onCancel={handleViewModalClose}
        width={600}
        footer={[
          <Button key="close" onClick={handleViewModalClose}>
            Terug
          </Button>,
        ]}
      >
        {selectedUser && (
          <div>
            <p><strong>Id:</strong> {selectedUser.id}</p>
            <p><strong>Gebruikersnaam:</strong> {selectedUser.userName}</p>
            <p><strong>Wachtwoord:</strong> {selectedUser.password}</p>
            <p><strong>Telefoon Nummer:</strong> {selectedUser.phoneNumber}</p>
          </div>
        )}
      </Modal>

      <Modal
        title="Edit Account"
        visible={isEditModalVisible}
        onCancel={handleEditModalClose}
        width={800}
        footer={[
          <Button key="cancel" onClick={handleEditModalClose}>
            Terug
          </Button>,
          <Button key="save" type="primary" onClick={saveEditChanges}>
            Opslaan
          </Button>,
        ]}
      >
        {selectedUser && (
          <Form form={form} layout="vertical">
            <Form.Item name="id" label="Id">
              <Input disabled />
            </Form.Item>
            <Form.Item name="username" label="Gebruikersnaam" rules={[{ required: true, message: 'Voer de Gebruiker!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Wachtwoord" rules={[{ required: true, message: 'Voer het wachtwoord in!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Telefoon Nummer" rules={[{ required: true, message: 'Voer de telefoonsnummer in!' }]}>
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Modal
        title="Create Account"
        visible={isCreateModalVisible}
        onCancel={handleCreateModalClose}
        width={800}
        footer={[
          
        ]}
      >
        <Form form={form} layout="vertical" onFinish={saveCreateChanges}>
          <Form.Item name="username" label="Gebruikersnaam" rules={[{ required: true, message: 'Voer de Gebruiker!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Wachtwoord" rules={[{ required: true, message: 'Voer het wachtwoord in!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Telefoon Nummer" rules={[{ required: true, message: 'Voer de telefoonsnummer in!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Voeg toe
            </Button>
          </Form.Item>
          <Form.Item>
            <Button key="cancel" onClick={handleCreateModalClose}>
              Annuleer
            </Button>,
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AdminSeeAccounts;

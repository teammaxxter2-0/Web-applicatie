import { useRef, useState, useEffect } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined, LoadingOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, message, Popconfirm, InputNumber, Modal, Form, Checkbox } from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Navbar from '../Components/Navbar.tsx';
import { useNavigate } from 'react-router-dom';
import { Option } from '../interfaces/Options.ts';
import useToken from "../hooks/Token.ts";

type DataIndex = keyof Option;

function AdminSeeMaterials() {
  const token = useToken();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isViewModalVisible, setIsViewModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    console.log(searchText);
    console.log(searchedColumn);
    fetchData().then();
  }, [searchText, searchedColumn]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/Options');
      if (response.ok) {
        const data = await response.json();
        setOptions(data);
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

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Option> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
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
            Search
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

  const handleEdit = (option: Option) => {
    setSelectedOption(option);
    form.setFieldsValue(option);
    setIsEditModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/Options/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setOptions(options.filter((option) => option.id !== id));
        message.success('Materiaal succesvol verwijderd');
      } else {
        message.error('Gefaald om materiaal succesvol te verwijderen');
      }
    } catch (error) {
      console.error('Een error is plaatsgevonden tijdens het verwijderen:', error);
      message.error('Een error is plaatsgevonden tijdens het verwijderen');
    }
  };

  const handleShowInfo = (option: Option) => {
    setSelectedOption(option);
    setIsViewModalVisible(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalVisible(false);
    setSelectedOption(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    setSelectedOption(null);
    form.resetFields();
  };

  const handleCreateModalClose = () => {
    setIsCreateModalVisible(false);
  };

  const saveEditChanges = async () => {
    try {
      const values = form.getFieldsValue();

      const response = await fetch(`/api/Options`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...selectedOption, ...values }),
      });

      if (response.ok) {
        setOptions(options.map(option => option.id === selectedOption?.id ? { ...selectedOption, ...values } : option));
        message.success('Veranderingen succesvol opgeslagen');
        form.resetFields();
        handleEditModalClose();
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
      console.log(values);
      const response = await fetch('/api/Options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Materiaal succesvol aangemaakt');
        fetchData();
        form.resetFields();
        handleCreateModalClose();
      } else {
        message.error('Gefaald om materiaal te maken');
      }
    } catch (error) {
      console.error('Een error is plaatsgevonden tijdens het maken van een materiaal:', error);
      message.error('Een error is plaatsgevonden tijdens het maken van een materiaal');
    }
  };

  const columns: TableColumnsType<Option> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '30%',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Material',
      dataIndex: 'name',
      key: 'material',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Price per m2',
      dataIndex: 'prijsPerM2',
      key: 'price',
      width: '20%',
      sorter: (a, b) => a.prijsPerM2 - b.prijsPerM2,
      render: (price: number) => `€ ${price}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleShowInfo(record)}> <InfoCircleOutlined /></Button>
          <Button type="link" onClick={() => handleEdit(record)}> <EditOutlined /></Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a> <DeleteOutlined /></a>
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
            <Table columns={columns} dataSource={options} pagination={{ pageSize: 7 }} />
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
        title="Material Info"
        visible={isViewModalVisible}
        onCancel={handleViewModalClose}
        width={600}
        footer={[
          <Button key="close" onClick={handleViewModalClose}>
            Terug
          </Button>,
        ]}
      >
        {selectedOption && (
          <div>
            <p><strong>Id:</strong> {selectedOption.id}</p>
            <p><strong>Material:</strong> {selectedOption.name}</p>
            <p><strong>Spatrand:</strong> {selectedOption.spatrand}</p>
            <p><strong>Vensterbank:</strong> {selectedOption.vensterbank}</p>
            <p><strong>Boorgaten Per Stuk:</strong> {selectedOption.boorgatenPerStuk ? 'Ja' : 'Nee'}</p>
            <p><strong>WCD:</strong> {selectedOption.wcd ? 'Ja' : 'Nee'}</p>
            <p><strong>Randafwerking:</strong> {selectedOption.randafwerking ? 'Ja' : 'Nee'}</p>
            <p><strong>Price per m2:</strong> €{selectedOption.prijsPerM2}</p>
            <p><strong>Randafwerking Per M:</strong> {selectedOption.randafwerkingPerM}</p>
            <p><strong>Spatrand Per M:</strong> {selectedOption.spatrandPerM}</p>
            <p><strong>Vensterbank Per M:</strong> {selectedOption.vensterbankPerM}</p>
            <p><strong>Uitsparing Onderbouw:</strong> {selectedOption.uitsparingOnderbouw}</p>
            <p><strong>Uitsparing Inleg:</strong> {selectedOption.uitsparingInleg}</p>
            <p><strong>Uitsparing Ruw:</strong> {selectedOption.uitsparingRuw}</p>
            <p><strong>Kraangat:</strong> {selectedOption.kraangat}</p>
            <p><strong>Zeepdispenser:</strong> {selectedOption.zeepdispenser}</p>
            <p><strong>Boorgaten Per Stuk Prijs:</strong> {selectedOption.boorgatenPerStukPrijs}</p>
            <p><strong>WCD Prijs:</strong> {selectedOption.wcdPrijs}</p>
            <p><strong>Achterwand Per M:</strong> {selectedOption.achterwandPerM}</p>
            <p><strong>Randafwerking Per M Price:</strong> {selectedOption.randafwerkingPerMPrice}</p>
          </div>
        )}
      </Modal>

      <Modal
        title="Edit Material"
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
        {selectedOption && (
          <Form form={form} layout="vertical">
            <Form.Item name="id" label="Id">
              <Input disabled />
            </Form.Item>
            <Form.Item name="name" label="Materiaal" rules={[{ required: true, message: 'Vul de materiaalnaam in!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="spatrand" label="Spatrand" rules={[{ required: true, message: 'Vul de spatrand in!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="vensterbank" label="Vensterbank" rules={[{ required: true, message: 'Vul de vensterbank in!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="boorgatenPerStuk" label="Boorgaten Per Stuk" valuePropName="checked">
              <Checkbox />
            </Form.Item>
            <Form.Item name="wcd" label="WCD" valuePropName="checked">
              <Checkbox />
            </Form.Item>
            <Form.Item name="randafwerking" label="Randafwerking" valuePropName="checked">
              <Checkbox />
            </Form.Item>
            <Form.Item name="prijsPerM2" label="Prijs per m2" rules={[{ required: true, message: 'Vul de prijs per m2 in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="randafwerkingPerM" label="Randafwerking Per M" rules={[{ required: true, message: 'Vul de randafwerking per m in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="spatrandPerM" label="Spatrand Per M" rules={[{ required: true, message: 'Vul de spatrand per m in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="vensterbankPerM" label="Vensterbank Per M" rules={[{ required: true, message: 'Vul de vensterbank per m in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="uitsparingOnderbouw" label="Uitsparing Onderbouw" rules={[{ required: true, message: 'Vul de uitsparing onderbouw in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="uitsparingInleg" label="Uitsparing Inleg" rules={[{ required: true, message: 'Vul de uitsparing inleg in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="uitsparingRuw" label="Uitsparing Ruw" rules={[{ required: true, message: 'Vul de uitsparing ruw in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="kraangat" label="Kraangat" rules={[{ required: true, message: 'Vul het kraangat in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="zeepdispenser" label="Zeepdispenser" rules={[{ required: true, message: 'Vul de zeepdispenser in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="boorgatenPerStukPrijs" label="Boorgaten Per Stuk Prijs" rules={[{ required: true, message: 'Vul de prijs voor boorgaten per stuk in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="wcdPrijs" label="WCD Prijs" rules={[{ required: true, message: 'Vul de WCD prijs in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="achterwandPerM" label="Achterwand Per M" rules={[{ required: true, message: 'Vul de achterwand per m in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="randafwerkingPerMPrice" label="Randafwerking Per M Prijs" rules={[{ required: true, message: 'Vul de prijs voor randafwerking per m in!' }]}>
              <Input type="number" min={0} />
            </Form.Item>
          </Form>

        )}
      </Modal>


      <Modal
        title="Create Material"
        visible={isCreateModalVisible}
        onCancel={handleCreateModalClose}

        width={800}
        footer={[
        ]}
      >
        <Form
          name="add-material"
          onFinish={saveCreateChanges}
          form={form}
          layout="vertical"

        >
          <Form.Item
            name="name"
            label="Naam"
            rules={[{ required: true, message: 'Vul de naam in' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="spatrand"
            label="Spatrand"
            rules={[{ required: true, message: 'Vul de spatrand in' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vensterbank"
            label="Vensterbank"
            rules={[{ required: true, message: 'Vul de vensterbank in' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="boorgatenPerStuk" valuePropName="checked">
            <Checkbox>Boorgaten per stuk</Checkbox>
          </Form.Item>
          <Form.Item name="wcd" valuePropName="checked">
            <Checkbox>WCD</Checkbox>
          </Form.Item>
          <Form.Item name="randafwerking" valuePropName="checked">
            <Checkbox>Randafwerking</Checkbox>
          </Form.Item>
          <Form.Item
            name="prijsPerM2"
            label="Prijs per m²"
            rules={[{ required: true, message: 'Vul de prijs per m² in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="randafwerkingPerM"
            label="Randafwerking per meter"
            rules={[{ required: true, message: 'Vul de randafwerking per meter in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="spatrandPerM"
            label="Spatrand per meter"
            rules={[{ required: true, message: 'Vul de spatrand per meter in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="vensterbankPerM"
            label="Vensterbank per meter"
            rules={[{ required: true, message: 'Vul de vensterbank per meter in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="uitsparingOnderbouw"
            label="Uitsparing onderbouw"
            rules={[{ required: true, message: 'Vul de uitsparing onderbouw in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="uitsparingInleg"
            label="Uitsparing inleg"
            rules={[{ required: true, message: 'Vul de uitsparing inleg in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="uitsparingRuw"
            label="Uitsparing ruw"
            rules={[{ required: true, message: 'Vul de uitsparing ruw in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="kraangat"
            label="Kraangat"
            rules={[{ required: true, message: 'Vul het kraangat in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="zeepdispenser"
            label="Zeepdispenser"
            rules={[{ required: true, message: 'Vul de zeepdispenser in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="boorgatenPerStukPrijs"
            label="Prijs per boorgat per stuk"
            rules={[{ required: true, message: 'Vul de prijs per boorgat per stuk in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="wcdPrijs"
            label="WCD prijs"
            rules={[{ required: true, message: 'Vul de WCD prijs in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="achterwandPerM"
            label="Achterwand per meter"
            rules={[{ required: true, message: 'Vul de achterwand per meter in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="randafwerkingPerMPrice"
            label="Randafwerking per meter prijs"
            rules={[{ required: true, message: 'Vul de randafwerking per meter prijs in' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
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

export default AdminSeeMaterials;

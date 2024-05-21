import { useRef, useState , useEffect} from 'react';
import { SearchOutlined , EditOutlined, DeleteOutlined , LoadingOutlined} from '@ant-design/icons';
import { Button, Input, Space, Table , message} from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Navbar from './navbar';
import {  useNavigate } from 'react-router-dom';
import { Option } from './interfaces/Options';

type DataIndex = keyof Option;

function AdminSeeMaterials() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/Options');
        if (response.ok) {
          const data = await response.json();
          setOptions(data);
          setLoading(false);
        }
        else
        {
          setError('Failed to fetch data');
          setLoading(false);
        }

      } catch (err) {
        console.error(err);
        setError('Failed to fetch data');
      } 
    };
  
    fetchData();
  }, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    console.log(searchText);
    console.log(searchedColumn);
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

  const handleEdit = (id: number) => {
    navigate(`/material/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/Options/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setOptions(options.filter((option) => option.id !== id));
        message.success('Item successfully deleted');
      } else {
        message.error('Failed to delete the item');
      }
    } catch (error) {
      console.error('An error occurred while deleting the item:', error);
      message.error('An error occurred while deleting the item');
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
      title: 'Materiaal',
      dataIndex: 'name',
      key: 'material',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Prijs per m2',
      dataIndex: 'prijsPerM2',
      key: 'price',
      width: '20%',
      sorter: (a, b) => a.prijsPerM2- b.prijsPerM2,
      render: (price: any) => `€ ${price}`,
    },
    {
      title: 'Acties',
      key: 'actions',
      render: (record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record.id)}> <EditOutlined /></Button>
          <Button type="link" onClick={() => handleDelete(record.id)}> <DeleteOutlined /></Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h1> Material: </h1>
        <Button type="link" onClick={() => navigate(`/addmaterial`)}> Dit is geen knop</Button>
        {loading && <h1>Loading.. <LoadingOutlined/>.</h1>}
        {error && <p>{error}</p>}
        {!loading && !error && (
        <Table columns={columns} dataSource={options} pagination={{ pageSize: 7 }} />
      )}
      </div>
    </>
  );
}

export default AdminSeeMaterials;

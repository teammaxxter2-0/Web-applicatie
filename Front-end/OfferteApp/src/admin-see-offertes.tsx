
import { useRef, useState ,} from 'react';
import { SearchOutlined , FormOutlined, DeleteOutlined} from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Navbar from './Components/Navbar.tsx';
import {  useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';



interface Rectangle {
    id: number;
    date: Date;
    user: string;
  }
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Offerte  van [GEBRUIKER luuk]", 10, 20);
    doc.text(rectanglesData[1].user, 10 ,30);

    

    
    doc.save("Offerte.pdf");
  };

  
  const rectanglesData: Rectangle[] = [
    { id: 1, date: new Date('2024-01-01T10:00:00'), user: 'User1' },
    { id: 2, date: new Date('2024-01-02T11:30:00'), user: 'User2' },
    { id: 3, date: new Date('2024-01-03T12:45:00'), user: 'User3' },
    { id: 4, date: new Date('2024-01-04T14:00:00'), user: 'User4' },
    { id: 5, date: new Date('2024-01-05T15:15:00'), user: 'User5' },
    { id: 6, date: new Date('2024-01-06T16:30:00'), user: 'User6' },
    { id: 7, date: new Date('2024-01-07T17:45:00'), user: 'User7' },
    { id: 8, date: new Date('2024-01-08T09:00:00'), user: 'User8' },
    { id: 9, date: new Date('2024-01-09T08:30:00'), user: 'User9' },
    { id: 10, date: new Date('2024-01-10T07:45:00'), user: 'User10' },
  ];
  
type DataIndex = keyof Rectangle;

function AdminSeeOffertes() {
   
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const navigate = useNavigate();
  
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
  
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Rectangle> => ({
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
  
    const handleDetails= (id: number) => {
      navigate(`/offerte/${id}`);
    };
  
    const handleDelete = (id: number) => {
      console.log('Delete item with id:', id);
    };
  
    const columns: TableColumnsType<Rectangle> = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: '20%',
        ...getColumnSearchProps('id'),
      },
      {
        title: 'Datum van Aanmaak',
        dataIndex: 'date',
        key: 'dste',
        width: '20%',
        render: (date) => date.toLocaleString(),
      },
      {
        title: 'Gebruiker',
        dataIndex: 'user',
        key: 'user',
        width: '40%',
        ...getColumnSearchProps('user'),
      },
     
      {
        title: 'Acties',
        key: 'actions',
        render: (record) => (
          <Space size="middle">
            <Button type="link" onClick={() => handleDetails(record.id)}> <FormOutlined /></Button>
            <Button type="link" onClick={() => handleDelete(record.id)}> <DeleteOutlined /></Button>
          </Space>
        ),
      },
    ];
  
    return (
      <>
        <Navbar />
        <div className="container mt-3">
          <h1> Offertes: </h1>
          <Table columns={columns} dataSource={rectanglesData} pagination={{ pageSize: 7 }} />
        </div>
        <Button type="link" onClick={() => generatePDF()}> KLICK</Button>
      </>
    );
  }

export default AdminSeeOffertes;

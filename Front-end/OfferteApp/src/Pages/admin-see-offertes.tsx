import { useRef, useState, useEffect } from 'react';
import { SearchOutlined, FormOutlined, LoadingOutlined } from '@ant-design/icons';
import {Button, Input, Space, Table, Modal, message} from 'antd';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Navbar from '../Components/Navbar.tsx';
import { useNavigate } from 'react-router-dom';
import useToken from "../hooks/Token.ts";
import GeneratePDF from "../Components/GeneratePDF.ts";
import {Offerte} from "../interfaces/Offerte.ts";

type DataIndex = keyof Offerte;

function AdminSeeOffertes() {
  const token = useToken();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [bestellingen, setBestelingen] = useState<Offerte[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Offerte>({} as Offerte);

  const searchInput = useRef<InputRef>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(searchText);
    console.log(searchedColumn);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/Quotation', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBestelingen(data);
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

  const accepteer = async (quote: Offerte) => {
    quote.accepted = true;
    try{
      const response = await fetch("/api/Quotation/", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({...quote})
      })
    if (response.ok) {
      message.success("De offerte is geaccepteerd!")
    }else{
      message.error("Het is niet gelukt om de offerte te accepteren.")
    }
    }catch(err){
      console.error(err);
      message.error("Het is niet gelukt om de offerte te accepteren.")
    }
    await fetchData();
  }

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Offerte> => ({
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

  const handleViewModalClose = () => {
    setIsViewModalVisible(false);
    console.log(selectedOption);
    setSelectedOption({} as Offerte);
  };

  const handleDetails = (record: Offerte) => {
    setSelectedOption(record);

    setIsViewModalVisible(true);
  };

  const columns: TableColumnsType<Offerte> = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'offerte_prijs_totaal',
      dataIndex: 'offerte_prijs_totaal',
      key: 'offerte_prijs_totaal',
      width: '40%',
      ...getColumnSearchProps('offerte_prijs_totaal'),
    },
    {
      title: 'Acties',
      key: 'actions',
      render: (record) => (
          <Space size="middle">
            <Button type="link" onClick={() => handleDetails(record)}> <FormOutlined /></Button>
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
                <Table columns={columns} dataSource={bestellingen} pagination={{ pageSize: 7 }} />
              </>
          )}
          <Button type="primary" style={{ marginLeft: 55 }} onClick={() => navigate(-1)}>
            Ga terug
          </Button>
        </div>


        <Modal
            title="Bestelling Info"
            open={isViewModalVisible}
            onCancel={handleViewModalClose}
            width={600}
            footer={[
              <Button key="close" onClick={handleViewModalClose}>
                Terug
              </Button>,
            ]}
        >
          <div>
            <p><strong>Naam:</strong> {selectedOption.name}</p>
            <p><strong>Aangemaakt op:</strong> {selectedOption.creation === undefined ? "Geen tijd bekend" : selectedOption.creation.toLocaleString()}</p>
            <p><strong>Geaccepteerd:</strong> {selectedOption.accepted ? "Ja" : "Nee"}</p>
            <p><strong>Aantal m2:</strong> {selectedOption.aantal_m2}</p>
            <p><strong>Prijs per m2:</strong> €{selectedOption.prijs_per_m2}</p>
            <p><strong>Prijs m2 Totaal:</strong> €{selectedOption.prijs_m2_totaal}</p>
            <p><strong>Randafwerking:</strong> {selectedOption.randafwerking ? 'Ja' : 'Nee'}</p>
            <p><strong>Randafwerking m:</strong> {selectedOption.randafwerking_m}</p>
            <p><strong>Randafwerking Prijs per m:</strong> €{selectedOption.randafwerking_prijs_per_m}</p>
            <p><strong>Randafwerking Hoogte (mm):</strong> {selectedOption.randafwerking_hoogte_mm}</p>
            <p><strong>Randafwerking Prijs Totaal:</strong> €{selectedOption.randafwerking_prijs_totaal}</p>
            <p><strong>Spatrand m:</strong> {selectedOption.spatrand_m}</p>
            <p><strong>Spatrand Prijs per m:</strong> €{selectedOption.spatrand_prijs_per_m}</p>
            <p><strong>Spatrand Hoogte (mm):</strong> {selectedOption.spatrand_hoogte_mm}</p>
            <p><strong>Spatrand Prijs Totaal:</strong> €{selectedOption.spatrand_prijs_totaal}</p>
            <p><strong>Vensterbank m:</strong> {selectedOption.vensterbank_m}</p>
            <p><strong>Vensterbank Prijs per m:</strong> €{selectedOption.vensterbank_prijs_per_m}</p>
            <p><strong>Vensterbank Breedte (mm):</strong> {selectedOption.vensterbank_breedte_mm}</p>
            <p><strong>Vensterbank Prijs Totaal:</strong> €{selectedOption.vensterbank_prijs_totaal}</p>
            <p><strong>Spoelbak:</strong> {selectedOption.spoelbak ? 'Ja' : 'Nee'}</p>
            <p><strong>Uitsparing Spoelbak:</strong> {selectedOption.uitsparing_spoelbak}</p>
            <p><strong>Spoelbak Prijs:</strong> €{selectedOption.spoelbak_prijs}</p>
            <p><strong>Kraangat:</strong> {selectedOption.kraangat ? 'Ja' : 'Nee'}</p>
            <p><strong>Kraangat Prijs:</strong> €{selectedOption.kraangat_prijs}</p>
            <p><strong>Zeepdispenser:</strong> {selectedOption.zeepdispenser ? 'Ja' : 'Nee'}</p>
            <p><strong>Zeepdispenser Prijs:</strong> €{selectedOption.zeepdispenser_prijs}</p>
            <p><strong>Boorgaten:</strong> {selectedOption.boorgaten ? 'Ja' : 'Nee'}</p>
            <p><strong>Boorgaten Stuk:</strong> {selectedOption.boorgaten_stuk}</p>
            <p><strong>Boorgaten mm:</strong> {selectedOption.boorgaten_mm}</p>
            <p><strong>Boorgaten Prijs per Stuk:</strong> €{selectedOption.boorgaten_prijs_per_stuk}</p>
            <p><strong>Boorgaten Prijs Totaal:</strong> €{selectedOption.boorgaten_prijs_totaal}</p>
            <p><strong>WCD:</strong> {selectedOption.wcd ? 'Ja' : 'Nee'}</p>
            <p><strong>WCD Prijs:</strong> €{selectedOption.wcd_prijs}</p>
            <p><strong>Achterwand:</strong> {selectedOption.achterwand ? 'Ja' : 'Nee'}</p>
            <p><strong>Achterwand m2:</strong> {selectedOption.achterwand_m2}</p>
            <p><strong>Achterwand Prijs per m2:</strong> €{selectedOption.achterwand_prijs_per_m2}</p>
            <p><strong>Achterwand Prijs Totaal:</strong> €{selectedOption.achterwand_prijs_totaal}</p>
            <p><strong>Offerte Prijs Totaal:</strong> €{selectedOption.offerte_prijs_totaal}</p>
            <Button type="link" onClick={() => GeneratePDF(selectedOption)}>GENEREER PDF</Button>
            <Button type={"link"} onClick={() => accepteer(selectedOption)}>Accepteer offerte</Button>
          </div>
        </Modal>
      </>
  );
}

export default AdminSeeOffertes;

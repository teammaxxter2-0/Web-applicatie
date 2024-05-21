
import  { useState, useEffect } from 'react';
import Navbar  from './navbar';
import { useParams } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import { Card, Row, Col , InputNumber} from 'antd';
import type { InputNumberProps } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Collapse } from 'reactstrap';
import { Option } from './interfaces/Options';




  

  function AdminSeeDetailsMaterials() {
    const { id } = useParams();
    const idInt = id ? parseInt(id, 10) : -1;
    const navigate = useNavigate();
    const [option, setOption] = useState<Option>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/Options/${id}`, {
            method: 'GET',
          });
      
          if (response.ok) {
            const data = await response.json();
            setOption(data);
            setLoading(false);
            console.log('Item found');
          } else {
            console.log('Item not found');
            setError('ID NOT EXIST');
            setLoading(false);
          }
        } catch (error) {
          console.error('An error occurred while finding the item:', error);
          setError('An error occurred while fetching data.');
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);

    // const [materialCollapsed, setMaterialCollapsed] = useState(false);
    // const [boolCollapsed, setBoolCollapsed] = useState(false);
    // const [contentCollapsed, setContentCollapsed] = useState(false);
    // const [venCollapsed, setVenCollapsed] = useState(false);
    // const [spatCollapsed, setSpatCollapsed] = useState(false);
    
    // const onChangeNumber: InputNumberProps['onChange'] = (value) => {
    //     console.log('changed', value);
    //   };
    // const rectangle = rectanglesData.find(rect => rect.id === idInt);
    // const toggleCollapse = (section: string) => {
    //     switch (section) {
    //       case 'material':
    //         setMaterialCollapsed(!materialCollapsed);
    //         break;
    //       case 'bool':
    //         setBoolCollapsed(!boolCollapsed);
    //         break;
    //       case 'content':
    //         setContentCollapsed(!contentCollapsed);
    //         break;
    //       case 'ven':
    //         setVenCollapsed(!venCollapsed);
    //         break;
    //       case 'spat':
    //         setSpatCollapsed(!spatCollapsed);
    //         break;
    //       default:
    //         break;
    //     }
    //   };
      return (
        <>
            <Navbar />
            <div className="container mt-3">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && option && (
                    <Card title="Option Details">
                        <Row gutter={[166, 16]}>
                            <Col span={24}><strong>ID:</strong> { option.id}</Col>
                            <Col span={24}><strong>Name:</strong> {option.name}</Col>
                            <Col span={12}><strong>Spatrand:</strong> {option.spatrand}</Col>
                            <Col span={12}><strong>Vensterbank:</strong> {option.vensterbank}</Col>
                            <Col span={12}><strong>Boorgaten per stuk:</strong> {option.boorgatenPerStuk ? 'Ja' : 'Nee'}</Col>
                            <Col span={12}><strong>WCD:</strong> {option.wcd ? 'Ja' : 'Nee'}</Col>
                            <Col span={12}><strong>Randafwerking:</strong> {option.randafwerking ? 'Ja' : 'Nee'}</Col>
                            <Col span={12}><strong>Prijs per m²:</strong> {option.prijsPerM2}</Col>
                            <Col span={12}><strong>Randafwerking per m:</strong> {option.randafwerkingPerM}</Col>
                            <Col span={12}><strong>Spatrand per m:</strong> {option.spatrandPerM}</Col>
                            <Col span={12}><strong>Vensterbank per m:</strong> {option.vensterbankPerM}</Col>
                            <Col span={12}><strong>Uitsparing onderbouw:</strong> {option.uitsparingOnderbouw}</Col>
                            <Col span={12}><strong>Uitsparing inleg:</strong> {option.uitsparingInleg}</Col>
                            <Col span={12}><strong>Uitsparing ruw:</strong> {option.uitsparingRuw}</Col>
                            <Col span={12}><strong>Kraangat:</strong> {option.kraangat}</Col>
                            <Col span={12}><strong>Zeepdispenser:</strong> {option.zeepdispenser}</Col>
                            <Col span={12}><strong>Boorgaten per stuk prijs:</strong> {option.boorgatenPerStukPrijs}</Col>
                            <Col span={12}><strong>WCD prijs:</strong> {option.wcdPrijs}</Col>
                            <Col span={12}><strong>Achterwand per m:</strong> {option.achterwandPerM}</Col>
                            <Col span={12}><strong>Randafwerking per m prijs:</strong> {option.randafwerkingPerMPrice}</Col>
                        </Row>
                    </Card>
                )}

            
          {/* {rectangle ? (
                <Row gutter={[26, 26]} >
                    
                    <Col >
                        <Card title="ID">
                            <p>{rectangle.id}</p>
                        </Card>
                    </Col>
                    <Col   >
                        <Card title="Material" actions={[<EditOutlined key="edit" onClick={() => toggleCollapse('material')} />]}>
                            <p>{rectangle.material}</p>
                            <Collapse isOpen={materialCollapsed}>
                              <p>materialCollapsed collapse</p>
                           <input type="text"
                           />
                         <button onClick={() => toggleCollapse('material')}> Save</button>
                            </Collapse>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card title="Bools" actions={[<EditOutlined key="edit"  onClick={() => toggleCollapse('bool')} />]}>
                            <p>Bool1: {rectangle.bool1.toString()}</p>
                            <p>Bool2: {rectangle.bool2.toString()}</p>
                            <p>Bool3: {rectangle.bool3.toString()}</p>
                            <Collapse isOpen={boolCollapsed}>
                              <p>Boolean collapse</p>
                            </Collapse>
                        </Card>
                        
                    </Col>
                    <Col >
                        <Card title="Content" actions={[<EditOutlined key="edit" onClick={() => toggleCollapse('content')} />]}>
                            <p>{rectangle.content}</p>
                            <Collapse isOpen={contentCollapsed}>
                              <p> content Collapsed collapse</p>
                            </Collapse>
                        </Card>
                    </Col>
                    
                    <Col>
                        <Card title="Spat" actions={[<EditOutlined key="edit"  onClick={() => toggleCollapse('spat')} />]}>
                            <p>Max Spat: {rectangle.maxSpat}</p>
                            <p>Min Spat: {rectangle.minSpat}</p>
                            <Collapse isOpen={spatCollapsed}>
                              <p> spatrandCollapsed collapse</p>
                              <InputNumber min={0} defaultValue={1} onChange={onChangeNumber} changeOnWheel />
                            </Collapse>
                        </Card>
                    </Col>
                    <Col >
                        <Card title="Ven"  actions={[<EditOutlined key="edit"  onClick={() => toggleCollapse('ven')} />]}>
                            <p>Max Ven: {rectangle.maxVen}</p>
                            <p>Min Ven: {rectangle.minVen}</p>
                            <Collapse isOpen={venCollapsed}>
                              <p>New vensterbank Price:    {<InputNumber min={0} defaultValue={1} onChange={onChangeNumber} changeOnWheel />}</p>
                              
                            </Collapse>
                        </Card>
                    </Col>
                </Row>
            ) : (
                
                <p>No rectangle found with ID: {id}</p>
            )} */}
            
           
            <button onClick={() => navigate(-1)}> Go back</button>
            <p><p></p></p>
            </div>
        </>
    );
}

export default AdminSeeDetailsMaterials;
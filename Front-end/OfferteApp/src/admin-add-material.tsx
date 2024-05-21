
import { Form, Input, InputNumber, Checkbox, Button } from 'antd';
import Navbar from './navbar';
import { Option } from './interfaces/Options';

function  AdminAddMaterial()  
{
    const onFinish = (values:any) => {
        console.log('Received values:', values);
        // Here you can handle the form submission, like sending data to your backend
    };

    return (
        <>
            <Navbar />
            <h1>Voeg materiaal toe</h1>
            <p>doen we dit zo?</p>
            <Form
                name="add-material"
                onFinish={onFinish}
                layout="vertical"
                style={{ maxWidth: 600, margin: '0 auto' }}
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
            </Form>
        </>
    );
};

export default AdminAddMaterial;

import { Bestelling } from "../interfaces/Bestelling.ts";
import React from "react";
import { Divider, Descriptions} from 'antd';

interface Props {
    viewObject: Bestelling | undefined;
}

const TableView: React.FC<Props> = ({ viewObject }) => {
    if (viewObject === undefined) {
        return <>De bestelling is leeg.</>
    }
    const preData = Object.entries(viewObject).map(([label, value]) => {
        
        if (label === "offerte_prijs_totaal") {
            return {
                 
            };
        }

        
        return {
            label,
            value: value !== undefined
                ? typeof value === "boolean"
                    ? value ? "Ja" : "Nee"
                    : typeof value === "number" && isNaN(value)
                        ? "0"
                        : String(value)
                : "Undefined"
        };
    });

    return (
        <div style={{ maxHeight: 800, overflowY: 'auto' }}>
            <div style={{ marginBottom: '50px' }}>
                <h3>Live Informatie</h3>
                <Divider />
            </div>
            <Descriptions bordered column={1}>
                {preData.map(({ label, value }, index) => (
                    <Descriptions.Item label={label} key={index}>
                        {value}
                    </Descriptions.Item>
                    
                ))}
               
            </Descriptions>
            <Divider />
            <h4>Totaal:</h4>
            <h2>€ {viewObject.offerte_prijs_totaal}<strong/></h2>
            <Divider />
        </div>
    );
}

export default TableView;

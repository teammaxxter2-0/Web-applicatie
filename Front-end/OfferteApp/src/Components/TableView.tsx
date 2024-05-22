import {Bestelling} from "../types/Bestelling.ts";
import React from "react";

interface Props {
    viewObject: Bestelling | undefined;
}

const TableView: React.FC<Props> = ({viewObject}) => {
    if (viewObject === undefined) {
        return <>De bestelling is leeg.</>
    }

    return <>
        <h3>Live Informatie Tabel</h3>
        <table>
            <thead>
            <tr>
                <th>Label</th>
                <th>Waarde</th>
            </tr>
            </thead>
            <tbody>
            {Object.entries(viewObject).map(([label, value], index) => (
                <tr key={index}>
                    <td>{label}</td>
                    <td>{value !== undefined ? (typeof value === 'boolean' ? (value ? "Ja" : "Nee") : value) : "Undefined"}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </>
}

export default TableView;
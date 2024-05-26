import { useState } from 'react';
import Navbar from '../Components/Navbar.tsx';
import { Material } from "../types/Materiaalsoort.ts";
import useOptions from "../hooks/Options.tsx";

function Winkelwagen() {
    const materials = useOptions();
    const [Materiaal, setMateriaal] = useState<Material | null>(null);

    const handleselectchangeMeteriaal = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const material = materials.find(m => m.id === parseInt(event.target.value));
        setMateriaal(material || null);
    };

    return (
        <>
            <Navbar />
            <h1>Winkelwagen</h1>
            <div className="inputTable">
                <select onChange={handleselectchangeMeteriaal}>
                    <option value="">Selecteer Materiaal</option>
                    {materials.map(material => (
                        <option key={material.id} value={material.id}>
                            {material.name}
                        </option>
                    ))}
                </select>
                {Materiaal && (
                    <table>
                        <thead>
                            <tr>
                                <th>Label</th>
                                <th>Waarde</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{Materiaal.name}</td>
                                <td>{Materiaal.prijsPerM2}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>

        </>
    );
}

export default Winkelwagen;

import {useState} from 'react';
import Navbar from './navbar';
import {Material} from "./types/Materiaalsoort.ts";
import useOptions from "./hooks/Options.tsx";

function Winkelwagen() {
    const materials = useOptions();
    const [Materiaal, setMateriaal] = useState<Material | null>(null);

    const handleselectchangeMeteriaal = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const material = materials.find(m => m.id === parseInt(event.target.value));
        setMateriaal(material || null);
    };

    return (
        <>
            <Navbar/>
            <h1>Winkelwagen</h1>
            <div className="inputTable">
                <h3>InputTable</h3>
                <select onChange={handleselectchangeMeteriaal}>
                    <option value="">Select Material</option>
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

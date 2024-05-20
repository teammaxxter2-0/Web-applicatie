import { useState } from 'react';
import Navbar from './navbar';
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

function Chatbot() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
        'Assistent: Hallo! Hoe kan ik je vandaag helpen met betrekking tot onze keukenbladen?'
    ]);
    const [infoTable, setInfoTable] = useState({
        "Materiaalsoort": "",
        "m2": "",
        "Randafwerking": "",
        "Spatrand": "",
        "Vensterbank": "",
        "Uitsparing spoelbak": "",
        "Kraangat": "",
        "Zeepdispenser": "",
        "Boorgaten per stuk": "",
        "Wandcontactdoos": "",
        "Achterwand m2": "",
        "Randafwerking achterwand": ""
    });

    async function sendData(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        appendUserMessage(inputValue);
        setInputValue('');
        const response = await fetch('ai/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: inputValue })
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            appendBotMessage(jsonResponse.message);
            updateInfoTable(jsonResponse.materialinfo);
        } else {
            appendBotMessage('Failed to send data');
        }
        setInputValue('');
    }

    function getTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function appendUserMessage(message: string) {
        setMessages(prevMessages => [
            `${getTime()} - U: ${message}`,
            ...prevMessages
        ]);
    }

    function appendBotMessage(message: string) {
        setMessages(prevMessages => [
            `${getTime()} - Assistent: ${message}`,
            ...prevMessages
        ]);
    }

    function updateInfoTable(materialinfo: any) {
        setInfoTable({
            "Materiaalsoort": materialinfo.material_type,
            "m2": materialinfo.m2,
            "Randafwerking": materialinfo.edge_finishing_m,
            "Spatrand": materialinfo.splashback_m2,
            "Vensterbank": materialinfo.windowsill_m,
            "Uitsparing spoelbak": materialinfo.sink_cutout_type,
            "Kraangat": materialinfo.tap_hole_count,
            "Zeepdispenser": materialinfo.soap_dispenser_count,
            "Boorgaten per stuk": materialinfo.drill_holes_count,
            "Wandcontactdoos": materialinfo.power_outlet_count,
            "Achterwand m2": materialinfo.backsplash_m2,
            "Randafwerking achterwand": materialinfo.backsplash_edge_finishing_m
        });
    }

    return (
        <>
            <Navbar />
            <div className="input-container" id="logContainer">
                <h2>KeukenGPT</h2>
                <form onSubmit={sendData} autoComplete={"off"}>
                    <input
                        id="inputBox"
                        placeholder="Voer hier iets in"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    ></input>
                    <button type={"submit"}>Versturen</button>
                </form>
                <hr />
                <div className="output-box" id="outputBox">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(marked.parse(message).toString()),
                            }}
                            className={message.includes('U:') ? 'user-message' : 'log-container'}
                        ></div>
                    ))}
                </div>
                <div className="info-table">
                    <h3>Live Informatie Tabel</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Label</th>
                                <th>Waarde</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(infoTable).map(([label, value], index) => (
                                <tr key={index}>
                                    <td>
                                        {label}
                                    </td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Chatbot;

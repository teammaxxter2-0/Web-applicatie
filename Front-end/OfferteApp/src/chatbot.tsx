import { useState } from 'react';
import Navbar from './navbar';
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

function Chatbot() {

    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
        'Assistent: Hallo! Hoe kan ik je vandaag helpen met betrekking tot onze keukenbladen?'
    ]);

    async function sendData(e: any) {
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
   
    return <>
        <Navbar />
        <div className="input-container" id="logContainer">
            <h2>KeukenGPT</h2>
            <form onSubmit={sendData} autoComplete={"off"}>
                <input
                    id="inputBox"
                    placeholder="Enter something here"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                ></input>
                <button type={"submit"}>Send</button>
            </form>
            <hr/>
            <div className="output-box" id="outputBox">
                {messages.map((message, index) => <div key={index}
                                                       dangerouslySetInnerHTML={{__html: sanitizeHtml(marked.parse(message).toString())}}
                                                       className={message.includes('U:') ? 'user-message' : 'log-container'}>
                </div>)}
            </div>
        </div>
    </>;
}

export default Chatbot;

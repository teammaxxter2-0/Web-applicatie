import React, { useState } from 'react';
import Navbar from '../Components/Navbar.tsx';
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { Bestelling } from "../interfaces/Bestelling.ts";
import TableView from "../Components/TableView.tsx";
import '../Styles/chat.css'

function Chatbot() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
        getTime() + ' - Assistent: Hallo! Hoe kan ik je vandaag helpen met betrekking tot onze keukenbladen?'
    ]);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [infoTable, setInfoTable] = useState<Bestelling>();

    async function sendData(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        appendUserMessage(inputValue);
        setInputValue('');
        setLoadingMessage('...');

        const threadId = localStorage.getItem('threadId');
        const url = threadId ? `ai/chat/${threadId}` : 'ai/chat';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: inputValue })
        });
        if (response.ok) {
            const assistant = await response.json();
            const message = JSON.parse(assistant.message);
            setLoadingMessage('');
            appendBotMessage(message.assistant.message);
            updateInfoTable(message.materiaalInformatie);
            if (assistant.threadId !== undefined) {
                localStorage.setItem('threadId', assistant.threadId);
            }
        } else {
            setLoadingMessage('');
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

    function updateInfoTable(materialinfo: Bestelling) {
        setInfoTable(materialinfo);
    }

    return (
        <>
            <Navbar />
            <div className="chat-container">
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
                    {loadingMessage && (
                        <div className="log-container">{`${getTime()} - Assistent: ${loadingMessage}`}</div>
                    )}
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
                    <TableView viewObject={infoTable} />
                </div>
            </div>
        </>
    );
}

export default Chatbot;

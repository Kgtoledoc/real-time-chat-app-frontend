import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Chat = ({ token, username }) => {
    const [socket, setSocket] = useState(null);
    const [currentRoom, setCurrentRoom] = useState('general');
    const [messages, setMessages] = useState([]);
    const [meessageInput, setMessageInput] = useState('');

    useEffect(() => {
        const newSocket = io('http://localhost:3000', {
            auth: {
                token: `${token}`,
            },
        });

        newSocket.on('message', (data) => {
            setMessages((prev) => [...prev, data]);
        })

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('recentMessages', (msg) => {
            setMessages(msg);
        });

        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, [token]);

    const joinRoom = (room) => {
        if (room) {
            socket.emit('joinRoom', room);
            setCurrentRoom(room);
            setMessages([]);
        }
    };

    const sendMessage = () => {
        if (meessageInput.trim()) {
            console.log('Sending message:', meessageInput);
            console.log('Current room:', currentRoom);
            socket.emit('message', {
                content: meessageInput,
                room: currentRoom
            })
        }
    };

    return (
        <div>
            <h2>Chat Room: {currentRoom}</h2>
            <div>
                <button onClick={() => joinRoom('general')}>General</button>
                <button onClick={() => joinRoom('sports')}>Sports</button>
                <button onClick={() => joinRoom('movies')}>Movies</button>
            </div>
            <div>
                <input type="text"
                    placeholder='Enter room name'
                    onKeyDown={(e) => e.key === 'Enter' && joinRoom(e.target.value)}
                />
                <button onClick={() => joinRoom(prompt('Enter room name'))}>Join Room</button>
            </div>
            <div id="messages">

                {messages.map((msg, index) => (
                    console.log(msg),
                    <div key={index} className="message">
                        <strong>{msg.username}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={meessageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message here..."
                />
                <button onClick={sendMessage}>Send</button>

            </div>

        </div>
    )
}

export default Chat;

import React from "react";
import Message from "../../components/Message";
import { useSocket } from "../../context/socket-context";
import { socket } from "../../socket";

import './ChatPage.styles.scss';

const ChatPage = () => {


    const {messages, sendMessage} = useSocket();
    const [message, setMessage] = React.useState('');


    const sendMessageHandler = (e) => {
        e.preventDefault();

        sendMessage(message);
    };

    console.log(messages);

    return (
        <div className="chat-page-root">
            <div className="messages-container">
                {messages.map((m, i) => {
                    return (
                        <Message key={m.message + i} message={m.message} isOwner={m.isOwner} />
                    );
                })}
                
            </div>
            <div className="send-message-container">
                <form className="message-sending-form" >
                    <div className="message-input">
                        <input type="text" placeholder="Enter message"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                         />
                    </div>
                    <div className="send-message-btn">
                        <button onClick={sendMessageHandler}  >SEND</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
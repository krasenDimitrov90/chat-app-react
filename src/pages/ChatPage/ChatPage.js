import React from "react";
import { useLocation } from "react-router-dom";
import { useMessagesContext } from "../../context/messages-context";
import { useSocket } from "../../context/socket-context";

import './ChatPage.styles.scss';

const ChatPage = () => {

    const location = useLocation();
    const { peerId } = location.state || '';

    const { sendPrivateMessage } = useSocket();
    const { getMessagesFromPeer, setMessagesHandler } = useMessagesContext();
    const messages = getMessagesFromPeer(peerId);
    const [message, setMessage] = React.useState('');

    console.log(messages);
    const sendMessageHandler = (e) => {
        e.preventDefault();

        sendPrivateMessage(message, peerId);
        setMessagesHandler([{ message, isOwner: true }], peerId);
    };


    const Message = ({ message, isOwner }) => {

        return (
            <div className={isOwner ? "owner-message" : "message"}>
                <p>{message}</p>
            </div>
        );
    };


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
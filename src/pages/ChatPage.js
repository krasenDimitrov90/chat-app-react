import React from "react";
import Message from "../components/Message";

import './ChatPage.styles.scss';

const ChatPage = () => {

    return (
        <div className="chat-page-root">
            <div className="messages-container">
                <Message message={'Yo ho ho'} isOwner={true} />
                <Message message={'Yo ho ho'} isOwner={true} />
                <Message message={'Yo ho ho'} isOwner={false} />
                <Message message={'Yo ho ho'} isOwner={false} />
                <Message message={'Yo ho ho'} isOwner={false} />
                <Message message={'Yo ho ho'} isOwner={false} />
                
            </div>
            <div className="send-message-container">
                <form className="message-sending-form" >
                    <div className="message-input">
                        <input type="text" placeholder="Enter message" />
                    </div>
                    <div className="send-message-btn">
                        <button>SEND</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
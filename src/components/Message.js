import React from "react";

import './Message.styles.scss';

const Message = ({ message, isOwner }) => {

    return (
        <div className={isOwner ? "owner-message" : "message"}>
            <p>{message}</p>
        </div>
    );
};

export default Message;
import React from "react";

import './Message.styles.scss';

const Message = ({ message, side, hasAvatar }) => {

    const containerClasses = `flex ${side === 'right' ? 'justify-end' : 'justify-start'} px-[30px] my-[10px]`;
    let messagesClasses = `${side === 'left' ? 'message-text-container-left' : 'message-text-container-right'}`
    messagesClasses += ' flex  max-w-[500px] mx-[40px] rounded-[3px] px-[20px] py-[10px] ';
    return (
        <div className={containerClasses}>
            <div className="flex basis-[50px]">
                {side === 'left' && hasAvatar && <img src="https://avatars.akamai.steamstatic.com/4f052355543f6a3ddd526e0a2dc182421e922798_full.jpg" alt=""
                    className="w-[50px] h-[50px] rounded-[50%]"
                />}
            </div>
            <div className={messagesClasses}>
                <p>
                    {message}
                </p>
            </div>
            <div className="flex basis-[50px]">
                {side === 'right' && hasAvatar && <img src="https://avatars.akamai.steamstatic.com/4f052355543f6a3ddd526e0a2dc182421e922798_full.jpg" alt=""
                    className="w-[50px] h-[50px] rounded-[50%]"
                />}
            </div>
        </div>
    );
};

export default Message;
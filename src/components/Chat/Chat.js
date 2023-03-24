import React from "react";
import { useMessagesContext } from "../../context/messages-context";
import { useSocket } from "../../context/socket-context";
import { SVG } from "../../SVG";
import Message from "../Message/Message";

const Chat = ({ peerId, name, online }) => {

    const { sendPrivateMessage } = useSocket();
    const { getMessagesFromPeer, setMessagesHandler, clearUnreadedMessagesFromPeer } = useMessagesContext();
    const messages = getMessagesFromPeer(peerId);
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        clearUnreadedMessagesFromPeer(peerId);
    }, [peerId, messages]);

    let currentMessageOwner = null;

    const sendMessageHandler = (e) => {
        e.preventDefault();

        sendPrivateMessage(message, peerId);
        setMessagesHandler([{ message, isOwner: true }], peerId);
        setMessage('');
    };

    const renderMessages = () => {
        return messages.map((m, i) => {
            const side = m.isOwner ? 'right' : 'left';
            let hasAvatar;
            if (i === 0) {
                currentMessageOwner = m.isOwner;
                hasAvatar = true;
            } else {
                hasAvatar = currentMessageOwner === m.isOwner ? false : true;
                currentMessageOwner = m.isOwner;
            }
            return (
                <Message key={i} message={m.message} side={side} hasAvatar={hasAvatar} />
            );
        })
    };

    return (
        <div className="flex flex-[3] flex-col">
            <div className=" bg-[#5e5c8e] flex py-[20px] ">
                <div className="px-[20px]">
                    <h3>{name}</h3>
                </div>
                <div className="flex">
                    <div className="flex items-center mr-[6px]">
                        <div className={`${online ? 'bg-[#00cf4b]' : 'border-[2px] border-[black]'}  w-[10px] h-[10px]  rounded-[50%]   `}></div>
                    </div>
                    <p>{online ? 'Online' : 'Offline'}</p>
                </div>
            </div>
            <div className=" bg-[#dcdef7] flex-1 overflow-y-scroll scroll-hide">
                {renderMessages()}
            </div>
            <div className="bg-[white]" >
                <form onSubmit={sendMessageHandler} className="h-[70px] flex items-center">
                    <input type="text" placeholder="Type somthing to send"
                        className="text-[black] outline-none pl-[20px] flex-1"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <div className="pr-[20px]">
                        <button  >
                            <SVG.Send w={24} h={24} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Chat;
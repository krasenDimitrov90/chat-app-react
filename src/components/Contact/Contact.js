import React from "react";

import './Contact.styles.scss';

const Contact = ({ name, peerId, online, onClick, isChatingWithThisContact, unreadedMessagesFromPeer }) => {
    console.log({ peerId })
    
    const [messagesCount, setMessagesCount] = React.useState(0);
    const avatarClasses = `avatar-container ${online ? 'online' : 'offline'}`;

    React.useEffect(() => {
        setMessagesCount(unreadedMessagesFromPeer);
    }, [unreadedMessagesFromPeer]);

    return (
        <div onClick={onClick.bind(null, { name, peerId })} className="transition duration-300 ease-in-out flex py-[20px] cursor-pointer hover:bg-[#373658]">
            <div className="flex flex-1 px-[20px] items-center">
                <div className={avatarClasses}>
                    <img src="https://avatars.akamai.steamstatic.com/4f052355543f6a3ddd526e0a2dc182421e922798_full.jpg" alt=""
                        className="w-[50px] h-[50px] rounded-[50%]"
                    />
                </div>
                <div className=" pl-[14px]">
                    <p>{name}</p>
                </div>
            </div>
            {!isChatingWithThisContact && messagesCount > 0 && <div className="px-[20px]">
                <div className="bg-[#00cf4b] w-[20px] leading-[20px] rounded-[50%] text-center text-[12px] text-[white]">
                    {messagesCount}
                </div>
            </div>}

        </div>
    );
};

export default React.memo(Contact);
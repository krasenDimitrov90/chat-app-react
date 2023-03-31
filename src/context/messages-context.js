import React from "react";

const MessagesContext = React.createContext();
export const useMessagesContext = () => React.useContext(MessagesContext);

const MessagesContextProvider = ({ children }) => {

    const [messages, setMessages] = React.useState({});
    const [unreadedMessages, setUnreadedMessages] = React.useState({});

    React.useEffect(() => {
        setMessages(prev => {
            return JSON.parse(localStorage.getItem('allMessages')) || {};
        });
    }, []);

    React.useEffect(() => {
        if (Object.keys(messages).length > 0) {
            localStorage.setItem('allMessages', JSON.stringify(messages));
        }
    }, [messages]);

    const setMessagesHandler = React.useCallback((message, from) => {

        setMessages(prev => {
            const currentMessagesFromSender = prev[from] || [];
            let updatedMessages = [...currentMessagesFromSender, ...message];
            return { ...prev, [from]: updatedMessages };
        });
    }, [messages]);

    const setUnreadedMessagesHandler = React.useCallback((messagesCount, from) => {

        setUnreadedMessages(prev => {
            let currentUnreadedMessagesCount = prev[from] || 0;
            currentUnreadedMessagesCount += messagesCount;
            return { ...prev, [from]: currentUnreadedMessagesCount };
        });
    }, [messages]);

    const clearUnreadedMessagesFromPeer = React.useCallback((from) => {

        setUnreadedMessages(prev => {
            if (prev.hasOwnProperty(from)) {
                let coppy = { ...prev };
                delete coppy[from];
                return { ...coppy };
            } else {
                return { ...prev };
            }
        });
    }, [messages]);


    const getMessagesFromPeer = React.useCallback((from) => {
        return messages[from] || [];
    }, [messages]);

    const clearAllMessages = React.useCallback(() => setMessages({}), [messages]);

    const value = {
        messages,
        clearAllMessages,
        unreadedMessages,
        setMessagesHandler,
        getMessagesFromPeer,
        setUnreadedMessagesHandler,
        clearUnreadedMessagesFromPeer,
    };

    return (
        <MessagesContext.Provider value={value} >
            {children}
        </MessagesContext.Provider>
    );
};

export default MessagesContextProvider;
import React from "react";

const MessagesContext = React.createContext();
export const useMessagesContext = () => React.useContext(MessagesContext);

const MessagesContextProvider = ({ children }) => {

    const [messages, setMessages] = React.useState({});

    const setMessagesHandler = React.useCallback((message, from) => {

        setMessages(prev => {
            const currentMessagesFromSender = prev[from] || [];
            let updatedMessages = [...currentMessagesFromSender, ...message];
            return { ...prev, [from]: updatedMessages };
        });
    });

    const getMessagesFromPeer = React.useCallback((from) => {
        return messages[from] || [];
    });

    const value = {
        messages,
        setMessagesHandler,
        getMessagesFromPeer,
    };

    return (
        <MessagesContext.Provider value={value} >
            {children}
        </MessagesContext.Provider>
    );
};

export default MessagesContextProvider;
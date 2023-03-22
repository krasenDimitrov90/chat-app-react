import React from "react";
import { socket } from "../socket";
import { useAuthContext } from "./auth-context";
import { useMessagesContext } from "./messages-context";

const SocketContext = React.createContext();

export const useSocket = () => React.useContext(SocketContext);

export const getMessagesFromLocalStorage = (from) => JSON.parse(localStorage.getItem('messagesFrom:' + from)) || [];
export const setMessagesInLocalStorage = (messages, from) => {
    let savedMessages = getMessagesFromLocalStorage(from);
    localStorage.setItem('messagesFrom:' + from, JSON.stringify([...savedMessages, ...messages]));
}



const SocketContextProvider = ({ children }) => {

    const { setMessagesHandler} = useMessagesContext();
    // const [messages, setMessages] = React.useState({});
    const { userToken } = useAuthContext();
    const [users, setUsers] = React.useState([]);

    // const setMessagesHandler = React.useCallback((message, from) => {

    //     setMessages(prev => {
    //         console.log(prev);
    //         const currentMessagesFromSender = prev[from] || [];
    //         // messages[from] = [...currentMessagesFromSender, messages];
    //         let updatedMessages = [...currentMessagesFromSender, ...message];
    //         return { ...prev, [from]: updatedMessages };
    //     });
    // });

    // const getMessagesFromPeer = React.useCallback((from) => {
    //     return messages[from] || [];
    // });

    React.useEffect(() => {
        if (userToken) {
            socket.auth = { userId: localStorage.getItem('userId') };
            socket.connect();
        }
        return () => socket.disconnect();
    }, [userToken]);

    React.useEffect(() => {

        socket.on('connect', () => {
            console.log(socket.id);
        });

        socket.on('unreceived-messages', (messages, from) => {
            // setMessages(prev => {
            //     let newMessages = [...prev];
            //     messages.reduce((acc, message) => {
            //         acc.push({ message, isOwner: false });
            //         return acc;
            //     }, newMessages);
            //     return newMessages;
            // });
            let newMessages = messages.reduce((acc, message) => {
                acc.push({ message, isOwner: false });
                return acc;
            }, []);
            setMessagesInLocalStorage(newMessages, from);
            setMessagesHandler(newMessages, from);
        });



        socket.on('users', (users) => {
            setUsers(users);
        });

        socket.on('private-message', ({ message, from }) => {
            // setMessages(prev => [...prev, { message, isOwner: false }]);
            // setMessagesInLocalStorage([{ message, isOwner: false }], from);
            // console.log('IN ON-PRIVATE-MESSAGE RECEIVING', { from });
            setMessagesHandler([{ message, isOwner: false }], from);

        });

        socket.on('user-left', (userId) => {
            // console.log(userId + ' has left');
        });

        return () => {
            socket.off('connect');
            socket.off('recieve-message');
            socket.off('users');
            socket.off('private-message');
            socket.off('user-left');
            socket.off('unreceived-messages');
        };
    }, [userToken]);



    const sendPrivateMessage = (message, to) => {
        socket.emit("private-message", {
            message,
            to,
        });
        // setMessages(prev => [...prev, { message, isOwner: true }]);
        // const userId = localStorage.getItem('userId');
        // setMessagesHandler([{ message, isOwner: true }], userId);
    };



    const value = {
        // messages,
        sendPrivateMessage,
        // setMessagesHandler,
        // getMessagesFromPeer,
    };

    return (
        <SocketContext.Provider value={value} >
            {children}
        </SocketContext.Provider>
    );
};


export { SocketContextProvider };
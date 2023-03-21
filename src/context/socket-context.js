import React from "react";
import { socket } from "../socket";
import { useAuthContext } from "./auth-context";

const SocketContext = React.createContext();

export const useSocket = () => React.useContext(SocketContext);



const SocketContextProvider = ({ children }) => {

    const [messages, setMessages] = React.useState([]);
    const { userToken } = useAuthContext();
    const [users, setUsers] = React.useState([]);

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
            setMessages(prev => {
                let newMessages = [...prev];
                messages.reduce((acc, message) => {
                    acc.push({ message, isOwner: false });
                    return acc;
                }, newMessages);
                console.log(newMessages);
                return newMessages;
            });
        });

        socket.on('recieve-message', (message) => {
            console.log(message);
            setMessages(prev => [...prev, { message, isOwner: false }]);
        });

        socket.on('users', (users) => {
            setUsers(users);
        });

        socket.on('private-message', ({ message, from }) => {
            console.log(from);
            setMessages(prev => [...prev, { message, isOwner: false }]);
        });

        socket.on('user-left', (userId) => {
            console.log(userId + ' has left');
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


    console.log(users);

    const sendMessage = (message) => {
        socket.emit('send-message', message);
        setMessages(prev => [...prev, { message, isOwner: true }]);
    };

    const sendPrivateMessage = (message, to) => {
        socket.emit("private-message", {
            message,
            to,
        });
        setMessages(prev => [...prev, { message, isOwner: true }]);
    };



    const value = {
        messages,
        sendMessage,
        sendPrivateMessage,
    };

    return (
        <SocketContext.Provider value={value} >
            {children}
        </SocketContext.Provider>
    );
};


export { SocketContextProvider };
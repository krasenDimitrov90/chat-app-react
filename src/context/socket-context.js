import React from "react";
import { socket } from "../socket";

const SocketContext = React.createContext();

export const useSocket = () => React.useContext(SocketContext);



const SocketContextProvider = ({ children }) => {

    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id);
        });

        socket.on('recieve-message', (message) => {
            console.log(message);
            setMessages(prev => [...prev, { message, isOwner: false }]);
        });

        return () => {
            socket.off('connect');
            socket.off('recieve-message');
        };
    }, []);


    const sendMessage = (message) => {
        socket.emit('send-message', message);
        setMessages(prev => [...prev, { message, isOwner: true }]);
    };



    const value = {
        messages,
        sendMessage,
    };

    return (
        <SocketContext.Provider value={value} >
            {children}
        </SocketContext.Provider>
    );
};


export { SocketContextProvider };
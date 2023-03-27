import React from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import Contact from "../../components/Contact/Contact";
import Empty from "../../components/Empty/Empty";
import { AuthContext, useAuthContext } from "../../context/auth-context";
import { SocketContext } from "../../context/socket-context";
import useHttp from "../../hooks/use-http";
import { SVG } from "../../SVG";



const DashBoard = () => {

    
    const navigate = useNavigate();
    const [peerIdToChatWith, setPeerIdToChatWith] = React.useState(null);
    // const { getUserCredentials } = useAuthContext();
    const { getUserCredentials } = React.useContext(AuthContext);
    const { userEmail, userId, userToken, isLoggedIn } = getUserCredentials();
    const socketCtx = React.useContext(SocketContext);
    const { users } = socketCtx;
    const [peers, setPeers] = React.useState([]);
    const { sendRequest, isLoding, error, } = useHttp();

    const setPeersAfterFetch = React.useCallback((peers) => {
        const arrayOfPeers = Object.entries(peers).reduce((acc, [id, name]) => {
            acc.push({ id, name });
            return acc;
        }, []);
        setPeers(arrayOfPeers);
    }, []);


    React.useEffect(() => {

        if (!localStorage.getItem('token')) {
            return () => navigate('/login');
           
        }

        const config = {
            action: 'get',
            path: `/users/${userId}/peers`,
            token: userToken,
        };

        sendRequest(config, setPeersAfterFetch);

    }, [userToken]);

    const goChatWeedPeer = React.useCallback((peer) => {
        setPeerIdToChatWith(peer);
    }, [isLoggedIn]);

    return (
        <div className="flex flex-1 h-[100vh] text-[#cbc9ee]">
            <div className="flex flex-1 flex-col">
                <div className="bg-[#2f2d52] flex py-[20px]">
                    <div className="flex-1 px-[20px]">
                        <h3>{userEmail}</h3>
                    </div>
                    <div className="px-[20px]">
                        <SVG.Menu w={22} h={22} />
                    </div>
                </div>
                <div className=" bg-[#3f3d61] flex py-[20px] border-b-[#444266] border-b-[2px]">
                    <div className="flex flex-1 px-[20px]">
                        <div className="flex items-center">
                            <SVG.Search w={18} h={18} />
                        </div>
                        <div className="flex items-center ml-[14px]" >
                            <input type="text" placeholder="Search"
                                className="bg-[transparent] outline-none "
                            />
                        </div>
                    </div>
                    <div className="px-[20px]">
                        <div className="flex items-center">
                            <SVG.Plus w={22} h={22} />
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-scroll bg-[#3f3d61] scroll-hide">
                    {peers.map((p, i) => {
                        return <Contact
                            key={p.id}
                            name={p.name}
                            peerId={p.id}
                            // messagesCount={unreadedMessages[p.id]}
                            online={users.some(u => u.userId === p.id)}
                            onClick={goChatWeedPeer}
                        />
                    })}
                </div>
                <div className="flex h-[70px] items-center bg-[#474b7b]">
                    <div className="px-[20px]">
                        <p>Vernone George</p>
                    </div>
                </div>
            </div>
            {!peerIdToChatWith && <Empty />}
            {peerIdToChatWith &&
                <Chat
                    peerId={peerIdToChatWith.peerId}
                    name={peerIdToChatWith.name}
                    online={users.some(u => u.userId === peerIdToChatWith.peerId)}
                />}

        </div>
    );
};

export default DashBoard;
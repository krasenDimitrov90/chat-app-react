import React from "react";
import Peer from "../../components/Peer/Peer";
import { useAuthContext } from "../../context/auth-context";
import useHttp from "../../hooks/use-http";

const DashBoardPage = () => {

    const [peers, setPeers] = React.useState([]);
    const { getUserCredentials } = useAuthContext();
    const { userId, userToken } = getUserCredentials();
    const { sendRequest, isLoding, error, } = useHttp();

    const setPeersAfterFetch = React.useCallback((peers) => {
        const arrayOfPeers = Object.entries(peers).reduce((acc, [id, name]) => {
            acc.push({ id, name });
            return acc;
        }, []);
        setPeers(arrayOfPeers);
    }, []);

    React.useEffect(() => {

        const config = {
            action: 'get',
            path: `/users/${userId}/peers`,
            token: userToken,
        };

        sendRequest(config, setPeersAfterFetch);

    }, []);
    console.log(peers);
    return (
        <div>
            <div className="people-container">
                {peers.length !== 0 &&
                    peers.map(p => {
                        return (
                            <Peer key={p.id}
                                name={p.name}
                                id={p.id}
                            />
                        );
                    })
                }
            </div>
            <div className="gropus-container" >

            </div>
        </div>
    );
};

export default DashBoardPage;
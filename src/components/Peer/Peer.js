import React from "react";


import './Peer.styles.css';
import { Link } from "react-router-dom";

const Peer = ({ name, id }) => {
    return (
        <div className="peer-container">
            <p>{name}</p>
            <Link to={`/chat`} state={{ peerId: id }}>CHAT</Link>
        </div>
    );
};

export default Peer;
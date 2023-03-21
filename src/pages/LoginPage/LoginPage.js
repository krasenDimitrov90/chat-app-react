import React from "react";
import { useAuthContext } from "../../context/auth-context";
import useHttp from "../../hooks/use-http";
import { socket } from "../../socket";


const LoginPage = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { sendRequest, isLoding, error, data } = useHttp();
    const { login } = useAuthContext();

    const onEmailInputChange = (e) => setEmail(e.target.value);
    const onPasswordInputChange = (e) => setPassword(e.target.value);

    const loginHandler = (userData) => {
        if (userData.hasOwnProperty('idToken')) {
            login(userData.idToken, userData.localId, userData.email);
        }
    };

    const submitLogin = (e) => {

        e.preventDefault();

        const data = {
            email,
            password,
            returnSecureToken: true,
        };

        const requestConfig = { data, action: 'login' };
        sendRequest(requestConfig, loginHandler);

    };



    return (
        <>
            {isLoding && <h1>Loading.............</h1>}
            {!isLoding && <div>
                <form onSubmit={submitLogin}>
                    <input onChange={onEmailInputChange} value={email} type="text" placeholder="Enter email" />
                    <input onChange={onPasswordInputChange} value={password} type="pasword" placeholder="Enter password" />
                    <button>SEND</button>
                </form>
            </div>}
        </>
    );
};

export default LoginPage;
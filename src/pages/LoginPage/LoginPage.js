import React from "react";
import useHttp from "../../hooks/use-http";


const LoginPage = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { sendRequest, isLoding, error } = useHttp();

    const onEmailInputChange = (e) => setEmail(e.target.value);
    const onPasswordInputChange = (e) => setPassword(e.target.value);

    const submitLogin = (e) => {

        e.preventDefault();

        const data = {
            email,
            password,
            returnSecureToken: true,
        };

        const requestConfig = { data, action: 'login' };
        sendRequest(requestConfig, (result) => console.log(result));

    };



    return (
        <>
            {isLoding && <h1>Loading.............</h1> }
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
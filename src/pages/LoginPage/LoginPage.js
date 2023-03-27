import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import FormCard from "../../components/FormCard/FormCard";
import InputField from "../../components/InputField/InputField";
import { useAuthContext } from "../../context/auth-context";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { socket } from "../../socket";
import { SVG } from "../../SVG";

import './LoginPage.styles.scss';

const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const LoginPage = () => {

    const navigate = useNavigate();
    const [formIsInvalid, setFormIsInvalid] = React.useState(false);
    const { sendRequest, isLoding, error, data } = useHttp();
    const { login, isLoggedIn } = useAuthContext();


    const {
        value: enteredEmail,
        valueIsValid: enteredEmailIsValid,
        hasError: emailInputIsInvalid,
        onChangeHandler: emailInputChangeHandler,
        onBlurHandler: emailInputOnBlurHandler,
        resetInput: resetEmailInput,
    } = useInput(value => value.match(emailValidator));

    const {
        value: enteredPassword,
        valueIsValid: enteredPasswordIsValid,
        hasError: passwordInputIsInvalid,
        onChangeHandler: passwordInputOnChangeHandler,
        onBlurHandler: passwordInputOnBlurHandler,
        resetInput: resetPasswordInput,
    } = useInput(value => value.trim().length >= 6);

    React.useEffect(() => {
        if (!enteredEmailIsValid || !enteredPasswordIsValid) {
            setFormIsInvalid(true);
        } else {
            setFormIsInvalid(false);
        }
    }, [enteredEmailIsValid, enteredPasswordIsValid]);


    const loginHandler = (userData) => {
        if (userData.hasOwnProperty('idToken')) {
            login(userData.idToken, userData.localId, userData.email);
            navigate('/dashboard');
        }
    };


    const submitHandler = (e) => {
        e.preventDefault();

        if (!enteredEmailIsValid) {
            return;
        }
        if (!enteredPasswordIsValid) {
            return;
        }

        const data = {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
        };

        const requestConfig = {
            action: 'login',
            data: data,
        };

        sendRequest(requestConfig, loginHandler);

        resetEmailInput();
        resetPasswordInput();
    };


    return (
        <div className="login-wrapper">
            <img src="https://media.istockphoto.com/id/1371726643/photo/different-notifications-on-violet-background-pop-up-messages-copy-space.jpg?b=1&s=170667a&w=0&k=20&c=FhmBYUrsGsR0hYn5zEDa0SkEFfF-rwuUfMEZ4HpX0rE=" alt="" />
            <FormCard submitHandler={submitHandler} formTitle={'LOG IN'} formIsInvalid={formIsInvalid}>

                <InputField
                    icon={<i className="fa-solid fa-user"></i>}
                    type="text"
                    id='email'
                    name='email'
                    placeholder="Email"
                    value={enteredEmail}
                    onBlur={emailInputOnBlurHandler}
                    onChange={emailInputChangeHandler}
                    inputIsInvalid={emailInputIsInvalid}
                    invalidMessage='Invalid Email!'
                >{<SVG.User />}</InputField>

                <InputField
                    icon={<i className="fa-solid fa-lock"></i>}
                    type="password"
                    id='password'
                    name='password'
                    placeholder="Password"
                    value={enteredPassword}
                    onBlur={passwordInputOnBlurHandler}
                    onChange={passwordInputOnChangeHandler}
                    inputIsInvalid={passwordInputIsInvalid}
                    invalidMessage='Incorect password!'
                >{<SVG.Lock />}</InputField>

                <Button
                    title={"Login"}
                    disabled={formIsInvalid}
                />
            </FormCard>
        </div>
    );

    // return (
    //     <>
    //         {isLoding && <h1>Loading.............</h1>}
    //         {!isLoding && <div>
    //             <form onSubmit={submitLogin}>
    //                 <input onChange={onEmailInputChange} value={email} type="text" placeholder="Enter email" />
    //                 <input onChange={onPasswordInputChange} value={password} type="pasword" placeholder="Enter password" />
    //                 <button>SEND</button>
    //             </form>
    //         </div>}
    //     </>
    // );
};

export default LoginPage;
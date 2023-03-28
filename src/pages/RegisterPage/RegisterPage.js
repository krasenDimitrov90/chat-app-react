import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import FormCard from "../../components/FormCard/FormCard";
import InputField from "../../components/InputField/InputField";
import Loader from "../../components/Loader/Loader";
import { useAuthContext } from "../../context/auth-context";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import { SVG } from "../../SVG";
import Modal from "../../components/Modal/Modal";

import './RegisterPage.styles.scss';
import usePopUp from "../../hooks/use-popUp";
import ErrorPopUp from "../../components/ErrorPopUp/ErrorPopUp";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";



const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const RegisterPage = () => {

    const navigate = useNavigate();
    const [formIsInvalid, setFormIsInvalid] = React.useState(false);
    const { isLoading, sendRequest, error } = useHttp();
    const { login } = useAuthContext();

    const afterRequestFinished = () => {
        if (error) {
            setFormIsInvalid(true);
            navigate('/register');
        } else {
            navigate('/dashboard');
        }
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(afterRequestFinished);


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
    } = useInput(value => value.length > 5);

    const {
        value: repeatPassword,
        valueIsValid: repeatPasswordIsValid,
        hasError: repeatPasswordInputHasError,
        onChangeHandler: repeatPasswordInputOnChangeHandler,
        onBlurHandler: repeatPasswordInputBlurHandler,
        resetInput: resetRepeatPasswordInput,
    } = useInput((value) => enteredPassword === value);



    React.useEffect(() => {
        if (!enteredEmailIsValid || !enteredPasswordIsValid || !repeatPasswordIsValid || enteredPassword !== repeatPassword) {
            setFormIsInvalid(true);
        } else {
            setFormIsInvalid(false);
        }
    }, [enteredEmailIsValid, enteredPasswordIsValid, repeatPasswordIsValid, enteredPassword, repeatPassword]);


    const registerHandler = (userData) => {
        const { localId, email } = userData;
        const name = email.slice(0, email.indexOf('@'));
        const data = {
            [localId]: {
                "email": email,
                "name": name,
                "peers": ""
            }
        };

        const requestConfig = {
            action: 'patch',
            path: '/users',
            data: data,
        };

        if (userData.hasOwnProperty('idToken')) {
            login(userData.idToken, userData.localId, userData.email);
            navigate('/dashboard');
        }

        sendRequest(requestConfig, () => console.log('Success'));
        setRequestIsFinished(true);
        setModalIsOpen(true);
    };

    const errorHandler = () => {
        setModalIsOpen(true);
        setRequestIsFinished(true);
    };


    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (!enteredEmailIsValid) {
            return;
        }

        if (enteredPassword !== repeatPassword) {
            return;
        }

        const data = {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
        };

        const requestConfig = {
            action: 'register',
            data: data,
        };

        sendRequest(requestConfig, registerHandler, errorHandler);

        resetEmailInput();
        resetPasswordInput();
        resetRepeatPasswordInput();
    };

    return (
        <>
            {modalIsOpen && requestIsFinished &&
                <Modal>
                    {error !== null && <ErrorPopUp message={'Email already exist!'} />}
                    {error === null && <SuccessPopUp message={'Succesfuly registered'} />}
                </Modal>}
            {isLoading && <Loader />}
            {!isLoading && <div className="register-wrapper">
                <img src="https://media.istockphoto.com/id/1371726643/photo/different-notifications-on-violet-background-pop-up-messages-copy-space.jpg?b=1&s=170667a&w=0&k=20&c=FhmBYUrsGsR0hYn5zEDa0SkEFfF-rwuUfMEZ4HpX0rE=" alt="" />
                <FormCard submitHandler={onSubmitHandler} formTitle={'REGISTER'} btnName={"Register"} formIsInvalid={formIsInvalid}>

                    <InputField
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
                        type="password"
                        id='password'
                        name='password'
                        placeholder="Password"
                        value={enteredPassword}
                        onBlur={passwordInputOnBlurHandler}
                        onChange={passwordInputOnChangeHandler}
                        inputIsInvalid={passwordInputIsInvalid}
                        invalidMessage='Password must have at least 6 characters!'
                    >{<SVG.Lock />}</InputField>

                    <InputField
                        type="password"
                        id='repeat-password'
                        name='repeat-password'
                        placeholder="Repeat password"
                        value={repeatPassword}
                        onBlur={repeatPasswordInputBlurHandler}
                        onChange={repeatPasswordInputOnChangeHandler}
                        inputIsInvalid={repeatPasswordInputHasError}
                        invalidMessage={`Passwords does't match!`}
                    >{<SVG.Lock />}</InputField>

                    <Button
                        title={"Register"}
                        disabled={formIsInvalid}
                    />
                    <div className="text-[12px] mt-[12px]">
                        <p>
                            You have an acount <NavLink className={"text-[blue]"} to={'/login'} >Login</NavLink>
                        </p>
                    </div>
                </FormCard>
            </div>}
        </>
    );
};

export default RegisterPage;
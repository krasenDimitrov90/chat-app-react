import React from "react";

const AuthContext = React.createContext();

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const userToken = localStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = React.useState(!!userToken);

    React.useEffect(() => {

        if (userToken) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn, userToken]);

    const getUserCredentials = () => {
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');

        return {
            userToken,
            userId,
            userEmail,
        };
    };


    const loginHandler = (token, userId, email) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userEmail', email);
        setIsLoggedIn(true);
    };

    const loggoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
    };

    const contextValue = {
        isLoggedIn,
        login: loginHandler,
        loggout: loggoutHandler,
        getUserCredentials,
        userToken,
    };


    return (
        <AuthContext.Provider value={contextValue} >
            {children}
        </AuthContext.Provider>
    );
};
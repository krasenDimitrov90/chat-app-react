import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, useAuthContext } from "../../context/auth-context";



const HomePage = () => {

    const navigate = useNavigate();
    // const { getUserCredentials } = useAuthContext(); it has a problem when using context like this
    // const { userEmail, isLoggedIn } = getUserCredentials();

    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn } = authCtx;

    React.useEffect(() => {

        return !isLoggedIn ? navigate('/login') : navigate('/dashboard');
        
    }, [navigate, isLoggedIn]);

};

export default HomePage;
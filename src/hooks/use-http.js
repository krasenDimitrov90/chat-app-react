import React from "react";
import { api } from "../servicies/api";


const useHttp = () => {

    const [isLoading, setIsloading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const sendRequest = React.useCallback((requestConfig, dataHandler, errorHandler) => {

        const action = requestConfig.action;
        
        setError(null);
        setIsloading(true);
        return api[action](requestConfig)
            .then(data => {
                dataHandler(data);
                setIsloading(false);
            })
            .catch(err => {
                console.log(err);
                err.then(error => {
                    const errorMessage = error.error.message || error.error;
                    setIsloading(false);
                    errorHandler();
                    setError(errorMessage);
                })
            });
    },[])


    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;
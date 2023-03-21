import React from "react";
import API from "../servicies/api";

const api = new API();

const useHttp = () => {
    const [isLoding, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const afterRequestFinished = React.useCallback((callBack) => {

        return function (result) {
            setIsLoading(false);
            console.log(result);
            if (result.hasOwnProperty("error")) {
                setError(result.error);
                return callBack(result.error);
            }
            callBack(result);
        }
        
    }, [])

    const sendRequest = React.useCallback((requestConfig, callBack) => {

        const action = requestConfig.action;

        setIsLoading(true);
        setError(null);
        api[action](requestConfig, afterRequestFinished(callBack));

    }, []);

    return {
        sendRequest,
        isLoding,
        error,
    };

};

export default useHttp;

const request = (method, url, requestConfig = {}) => {

    const { data, id, token, path } = requestConfig;
    const options = {};

    if (method !== 'GET') {
        options.method = method;
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(data);
    }

    if (path) {
        url = `${url}/${path}`;

        if (id) {
            url = `${url}/${id}.json`;
        } else {
            url = `${url}.json`;
        }
    }



    if (token) {
        url += `?auth=${token}`;
    }


    return fetch(url, options)
        .then(res => {
            if (!res.ok) {
                throw res.json();
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            if (data === null) {
                return {};
            }
            return data;
        })
        .catch(error => {
            throw error;
        })
}


export const api = {
    login_URL: process.env.REACT_APP_LOGIN_URL,
    register_URL: process.env.REACT_APP_REGISTER_URL,
    host: 'https://chat-app-api-6bd4d-default-rtdb.europe-west1.firebasedatabase.app',

    get: (requestConfig) => request('GET', api.host, requestConfig),
    post: (requestConfig) => request('POST', api.host, requestConfig),
    put: (requestConfig) => request('PUT', api.host, requestConfig),
    patch: (requestConfig) => request('PATCH', api.host, requestConfig),
    del: (requestConfig) => request('DELETE', api.host, requestConfig),

    login: (requestConfig) => request('POST', api.login_URL, requestConfig),
    register: (requestConfig) => request('POST', api.register_URL, requestConfig),
};



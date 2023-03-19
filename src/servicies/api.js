export default class API {
    constructor() {
        this.config = {};
        this.login_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';
        this.register_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';
        this.host = 'https://inventory-app-3f096-default-rtdb.europe-west1.firebasedatabase.app';
        this.uri = '';
    }

    static #request(method, requestConfig, callBack, url = this.host) {
        API.#prepareRequestData(method, requestConfig, url);

        return fetch(this.uri, this.config)
            .then(res => API.#handleResponse(res))
            .then(data => {
                if ((typeof callBack) === 'function') {
                    callBack(data);
                }
            })
            .catch(err => {
                err.then(API.#handleError(callBack));
            });
    }

    static #prepareRequestData(method, requestConfig, URL) {
        const { data, id, token, path } = requestConfig;
        const options = {};
        let url = URL || this.host;

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
        this.uri = url;
        this.config = { ...options };
    }
    static #handleResponse(res) {
        console.log(res);

        this.uri = '';
        this.config = {};

        if (!res.ok) {
            throw res.json();
        }
        return res.json();
    }

    static #handleError(callBack) {

        return function errorHandle(err) {
            callBack(err);
        }
    }


    get(requestConfig, callBack) {
        return API.#request('GET', requestConfig, callBack);
    }
    post(requestConfig, callBack) {
        return API.#request('POST', requestConfig, callBack);
    }
    patch(requestConfig, callBack) {
        return API.#request('PATCH', requestConfig, callBack);
    }
    put(requestConfig, callBack) {
        return API.#request('PUT', requestConfig, callBack);
    }
    del(requestConfig, callBack) {
        return API.#request('DELETE', requestConfig, callBack);
    }


    login(requestConfig, callBack) {
        return API.#request('POST', requestConfig, callBack, this.login_URL);
    }
    register(requestConfig, callBack) {
        return API.#request('POST', requestConfig, callBack, this.register_URL);
    }
}


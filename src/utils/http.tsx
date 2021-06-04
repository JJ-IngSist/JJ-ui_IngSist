export const userUrl = "http://localhost:8080/";
export const postUrl = "http://localhost:8081/";

type Config = {
    headers?: Object | null,
    noAuth?: boolean,
};

type mapEntry = {
    key: string,
    value: string
}

const cleanCookies = (cookies: string) => {
    if (cookies) {
        let aux = cookies.split(';')
        let map: mapEntry[] = aux.map<mapEntry>(a => {return {key: a.split('=')[0], value: a.split('=')[1]}});
        return map.filter(m => m.key==='token')[0].value
    } else return ""
}

const request = (url: string, method: string, body: Object | null, config: Config) => {
    let headers : Object = {"Content-Type": "application/json", Authorization: ""};
    if (!config.noAuth) {
        const token = cleanCookies(document.cookie);
        debugger
        headers = (token) ? {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        } : {"Content-Type": "application/json",
            Authorization: ""};
    }
    const configuration: Object = {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: headers,
    };
    return fetch(url, configuration)

        .then(response => {
            console.log(response)
            if(response.ok) return response.json();
            // if the token has expired log out the user
            // else if(response.status === 403 && localStorage['token']) {
            //     localStorage.removeItem('token');
            //     localStorage.removeItem('admin');
            //     window.location.reload();
            // }

            // if an error occurs on the server return the errorMessage in case we intentionally threw that error, or a generic one in case an unexpected exception rises.
            return response.json().then(error => {
                if(error.hasOwnProperty('message')) {
                    throw (error.message)
                } else throw new Error("¡Error inesperado del servidor!")
            })
        })
        // Catch connection errors and the error throw above.
        .catch(error => {
            throw(error)
        })
}

export const get = (url: string, config = {}) => request(url, "GET", null, config);
export const getWithBody = (url: string, body: Object, config = {}) => request(url, "GET", body, config);
export const post = (url: string, body: Object, config = {}) => request(url, "POST", body, config);
export const put = (url: string, body: Object, config = {}) => request(url, "PUT", body, config);
export const del = (url: string, config = {}) => request(url, "DELETE", null, config);
const db = (function () {
    function parametres(params) {
        let result = Object.keys(params)
            .filter(el => typeof params[el] !== "undefined")
            .reduce((accum, el, index) => {
                return accum + (index === 0 ? "" : "&") + el + "=" + params[el];
            }, "");
        return result;
    };

    function request(type, path, params, reqBody, callBack) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            if (!params || Object.keys(params).length === 0) {
                xhr.open(type, path, true);
            } else {
                xhr.open(type, path + "?" + parametres(params), true);
            }
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (this.status == 200) {
                    if (callBack) {
                        callBack();
                    }
                    resolve(this.response);
                } else {
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            }
            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };
            xhr.send(reqBody ? JSON.stringify(reqBody) : null);
        })
    };

    return {
        get(path, params, callBack) {
            return request("GET", path, params, undefined, callBack);
        },
        post(path, reqBody, callBack) {
            return request("POST", path, undefined, reqBody, callBack);
        },
        put(path, params, reqBody, callBack) {
            return request("PUT", path, params, reqBody, callBack);
        },
        delete(path, params, callBack) {
            return request("DELETE", path, params, undefined, callBack);
        }
    };
})();

window.nextId = (() => {
    let id = 6;
    return () => {
        return id++;
    };
})();

const storageUsers = [
    {
        username: "Alex",
        password: "123"
    },
    {
        username: "Gena",
        password: "0"
    }
];

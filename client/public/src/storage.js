const db = (function () {
    return {
        get: () => { },
        put: () => { }
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

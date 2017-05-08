const TOKEN_KEY = process.env.TOKEN_LOCAL_KEY;
console.log(TOKEN_KEY);
const Auth = {
    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },
    destroyToken() {
        localStorage.removeItem(TOKEN_KEY);
    },
    getToken() {
        let token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return null;
        }
        return token;
    },
    loggedIn() {
        return this.getToken() ? true : false;

    }
}

export default function (Vue) {
    Vue.auth = Auth;
    Object.defineProperties(Vue.prototype, {
        $auth: {
            get: () => Vue.auth
        }
    })
}
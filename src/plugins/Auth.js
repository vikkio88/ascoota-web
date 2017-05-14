const TOKEN_KEY = process.env.TOKEN_LOCAL_KEY;
const TOKEN_EXPIRATION = 'token_expiration';

const Auth = {
    setToken(token) {
        let utc_now = Date.now() / 1000 | 0;
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(TOKEN_EXPIRATION, utc_now + 23 * 3600)
    },
    destroyToken() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRATION);
    },
    getToken() {
        let utc_now = Date.now() / 1000 | 0;
        let token = localStorage.getItem(TOKEN_KEY);
        let expiration = localStorage.getItem(TOKEN_EXPIRATION);
        if (!token || !expiration || utc_now > parseInt(expiration)) {
            this.destroyToken();
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
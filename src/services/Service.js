import Vue from 'vue'
const apiUrl = process.env.SERVICE_URL;

var service = class Service {

    get(route) {
        return Vue.http.get(apiUrl + route);
    }

    post(route, body) {
        return Vue.http.post(apiUrl + route, body);
    }

    put(route, body) {
        return Vue.http.put(apiUrl + route, body);
    }

    delete(route) {
        return Vue.http.delete(apiUrl + route);
    }
};

export default service;

import Vue from 'vue'

const authRoutes = [
    /\/me.?/
];

Vue.http.interceptors.push((request, next) => {
    authRoutes.forEach((route)=>{
        if(request.url.match(route) && Vue.auth.loggedIn()){
            request.headers.set('ASCOOTA-TOKEN', Vue.auth.getToken());
        }
    });
    next();
});
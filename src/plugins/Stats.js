import Vue from 'vue'


var VueStats = {
    push (actionName) {
        return Vue.http.post(
            process.env.STATS_URL,
            {
                navigator: window.navigator.appVersion,
                action: actionName
            }
        );
    }
};


export default function (Vue) {
    Vue.stats = VueStats;
    Object.defineProperties(Vue.prototype,
        {
            $stats: {
                get: () => {
                    return Vue.stats;
                }
            }
        }
    )
}
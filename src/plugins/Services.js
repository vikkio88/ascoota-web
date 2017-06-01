import { AuthService } from '../services/ascoota/AuthService';
import { PodcastService } from '../services/ascoota/PodcastService';

const Services = {
    auth() {
        return new AuthServices();
    },
    podcast() {
        return new PodcastService();
    },
}

export default function (Vue) {
    Vue.services = Services;
    Object.defineProperties(Vue.prototype, {
        $services: {
            get: () => Vue.services
        }
    })
}
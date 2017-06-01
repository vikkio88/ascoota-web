import { AuthService } from '../services/ascoota/AuthService';
import { PodcastService } from '../services/ascoota/PodcastService';
import { ShowService } from '../services/ascoota/ShowService';

const Services = {
    auth: new AuthService(),
    podcast: new PodcastService(),
    show: new ShowService()
}

export default function (Vue) {
    Vue.services = Services;
    Object.defineProperties(Vue.prototype, {
        $services: {
            get: () => Vue.services
        }
    })
}
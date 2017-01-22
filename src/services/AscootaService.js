import Service from 'vue-service'

const apiUrl = process.env.SERVICE_URL;

export default class AscootaService extends Service {
    constructor(){
        super(apiUrl);
    }
}
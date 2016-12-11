import Service from '../Service';

const ENDPOINT = 'radios';

var radioService = class RadioService extends Service {
  getAll() {
    return this.get(ENDPOINT + '?l=5');
  }
  getOne(id) {
    return this.get(ENDPOINT + '/' + id);
  }

};
export default radioService;
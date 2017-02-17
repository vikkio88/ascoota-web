import AscootaService from '../AscootaService';

const ENDPOINT = 'radios';

var radioService = class RadioService extends AscootaService {
  getAll() {
    return this.get(ENDPOINT + '?l=10');
  }
  getOne(id) {
    return this.get(ENDPOINT + '/' + id);
  }

};
export default radioService;
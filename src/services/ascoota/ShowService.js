import Service from '../Service';
var radioService = class RadioService extends Service {
  constructor(radioId) {
    super();
    this.endpoint = `radios/${radioId}/shows`;
  }
  getAll() {
    return this.get(this.endpoint);
  }
  getOne(showId) {
    return this.get(`${this.endpoint}/${showId}`);
  }

};
export default radioService;
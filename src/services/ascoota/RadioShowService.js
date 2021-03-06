import AscootaService from '../AscootaService';

var radioShowService = class RadioShowService extends AscootaService {
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

  getMorePodcasts(showId, page) {
    return this.get(`${this.endpoint}/${showId}/podcasts?l=10&p=${page}`);
  }

};
export default radioShowService;
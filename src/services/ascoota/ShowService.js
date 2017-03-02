import AscootaService from '../AscootaService';

var showService = class ShowService extends AscootaService {
  constructor() {
    super();
    this.endpoint = `shows`;
  }

  getOne(slug) {
    return this.get(`${this.endpoint}/${slug}`);
  }

  getMorePodcasts(showId, page) {
    return this.get(`${this.endpoint}/${showId}/podcasts?l=10&p=${page}`);
  }

};
export default showService;
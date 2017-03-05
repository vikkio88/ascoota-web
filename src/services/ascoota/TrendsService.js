import AscootaService from '../AscootaService';

var trendsService = class TrendsService extends AscootaService {
  constructor() {
    super();
    this.endpoint = `trends`;
  }
  getShows() {
    return this.get(`${this.endpoint}/shows`);
  }
  getLatestPodcasts() {
    return this.get(`${this.endpoint}/podcasts/latest`);
  }

};
export default trendsService;
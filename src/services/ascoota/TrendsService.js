import AscootaService from '../AscootaService';

var trendsService = class TrendsService extends AscootaService {
  constructor() {
    super();
    this.endpoint = `trends`;
  }
  getShows() {
    return this.get(`${this.endpoint}/shows?l=5`);
  }
  getLatestPodcasts() {
    return this.get(`${this.endpoint}/podcasts/latest?l=5`);
  }

};
export default trendsService;
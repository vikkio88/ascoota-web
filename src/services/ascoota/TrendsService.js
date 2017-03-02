import AscootaService from '../AscootaService';

var trendsService = class TrendsService extends AscootaService {
  constructor() {
    super();
    this.endpoint = `trends`;
  }
  getTrends() {
    return this.get(`${this.endpoint}/shows`);
  }

};
export default trendsService;
import AscootaService from '../AscootaService';

const ENDPOINT = 'podcasts';

var podcastService = class PodcastService extends AscootaService {
  getOne(id) {
    return this.get(ENDPOINT + '/' + id);
  }

};
export default podcastService;
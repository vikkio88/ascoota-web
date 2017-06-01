import AscootaService from '../AscootaService';

const ENDPOINT = 'podcasts';

class PodcastService extends AscootaService {
  getOne(id) {
    return this.get(ENDPOINT + '/' + id);
  }

};
export { PodcastService };
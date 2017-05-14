import AscootaService from '../AscootaService';

export default class UserService extends AscootaService {
  constructor() {
    super();
    this.endpoint = '';
  }

  getMe() {
    return this.get('me');
  }

  positionSave(podcastInfo) {
    return this.put('me/position', podcastInfo);
  }

  addToFavourites(show) {
    return this.post('me/favourites/shows', show);
  }

  removeFromFavourites(showId) {
    return this.delete(`me/favourites/shows/${showId}`);
  }

};

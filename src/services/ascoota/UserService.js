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

};

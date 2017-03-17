import AscootaService from '../AscootaService';

export default class UserService extends AscootaService {
  constructor() {
    super();
    this.endpoint = '';
  }

  getMe() {
    return this.get('me');
  }
};

import AscootaService from '../AscootaService';

var authService = class AuthService extends AscootaService {
  constructor() {
    super();
    this.endpoint = `auth`;
  }

  providerAuth(provider, token) {
    return this.post(`${this.endpoint}/${provider}`, { auth: token });
  }
};

export default authService;
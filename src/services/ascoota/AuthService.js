import AscootaService from '../AscootaService';

class AuthService extends AscootaService {
  constructor() {
    super();
    this.endpoint = `auth`;
  }

  providerAuth(provider, token) {
    return this.post(`${this.endpoint}/${provider}`, { auth: token });
  }
};

export { AuthService };
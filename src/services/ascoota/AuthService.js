import AscootaService from '../AscootaService';

var authService = class AuthService extends AscootaService {
  constructor() {
    super();
    this.endpoint = `auth`;
  }

  getAuthUrl(provider) {
    let currentWebsite = window.location.protocol + "//" + window.location.host;
    return this.get(`${this.endpoint}/${provider}?callback=${currentWebsite}`);
  }
  
  getInfoCallback(provider, data) {
    let currentWebsite = window.location.protocol + "//" + window.location.host;
    return this.get(`${this.endpoint}/${provider}/callback?code=${data}&callback=${currentWebsite}`);
  }

};
export default authService;
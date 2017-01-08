import Service from '../Service';

var statsPushService = class StatsPushService extends Service {
  constructor() {
    super();
    this.endpoint = `stats`;
  }
  push(actionName) {
    return this.post(
      this.endpoint,
      {
        navigator: window.navigator.appVersion,
        action: actionName
      }
    );
  }
};
export default statsPushService;
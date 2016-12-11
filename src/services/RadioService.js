import Vue from 'vue'
const ENDPOINT = 'radios';

var radioService = {
  getAll() {
    return Vue.http.get(process.env.SERVICE_URL + ENDPOINT + '?l=5');
  },

  getOne(id) {
    return Vue.http.get(process.env.SERVICE_URL + ENDPOINT + '/' + id);
  }

};
export default radioService;
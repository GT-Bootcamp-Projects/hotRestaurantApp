// import Vue from 'vue';
// import axios from 'axios';
// import VueAxios from 'vue-axios';
// import { API_URL } from '@/common/config';

// const ApiService = {
  // init() {
    // Vue.use(VueAxios, axios);
    // Vue.axios.defaults.baseURL = API_URL;
  // },

  // setHeader() {
    // Vue.axios.defaults.headers.common[
      // 'Content-Type'
    // ] = 'application/json';
  // },

  // query(resource, body) {
    // return Vue.axios.get(resource, body).catch(err => {
      // throw new Error(`ApiService --> ${err}`);
    // });
  // },

  // get(resource, param = "") {
    // return Vue.axios.get(`${resource}/${param}`).catch(err => {
      // throw new Error(`ApiService --> ${err}`);
    // });
  // },

  // post(resource, body) {
    // return Vue.axios.post(`${resource}`, body);
  // },

  // update(resource, param, body) {
    // return Vue.axios.put(`${resource}/${param}`, body);
  // },

  // delete(resource) {
    // return Vue.axios.delete(resource).catch(err => {
      // throw new Error(`ApiService --> ${err}`);
    // });
  // }
// };

// export default ApiService;

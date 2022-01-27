import Vue from "vue";

export default class Resources {
  getGender(params) {
    const url = `https://api.genderize.io/?name=${params}`;
    return Vue.http.get(url);
  }
}

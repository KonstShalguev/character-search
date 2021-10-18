import axios from "axios";

const API = (resources) => {
  const url = 'https://rickandmortyapi.com/api/' + resources;
  return axios.get(url)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    })
}

export default API;

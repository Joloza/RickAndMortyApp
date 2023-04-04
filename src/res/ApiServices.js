import axios from 'axios';

const URL = 'https://rickandmortyapi.com/api/';

export const getAllCharacters = async(numberPage) => {
  return axios.get(`${URL}character?page=${numberPage}`)
    .then(response => {
      return response.data.results;
    })
    .catch(error => {
      return error.code;
    });
}

export const getCharacterByName = async(name) => {
    return axios.get(`${URL}character?name=${name}`)
    .then(response => {
      return response.data.results;
    })
    .catch(error => {
      return error.code;
    });
}
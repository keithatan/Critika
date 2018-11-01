export const LOGIN = 'log_in';
import axios from 'axios';

const ROOT_URL = 'http://localhost:5000'


// Login
export function login(){
  
    const request;

    axios.post(ROOT_URL + '/login', {
        username: 'demoAccountUser1',
        password: 'demoAccountPass1'
      })
      .then(function (response) {
        request = response;
        console.log(response);
      })
      .catch(function (error) {
        request = error;
        console.log(error);
      });

    return {
        type: LOGIN,
        payload: request
    };
}
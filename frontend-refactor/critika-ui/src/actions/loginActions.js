import Axios from 'axios'

export function login(userData){
    return dispatch =>{
        return Axios.post('http://localhost:5000/user/login', {
            username: userData.userlogin,
            password: userData.password
          }).then((res) =>{
            const userToken = res.headers.token
            localStorage.setItem('jwtToken', userToken)
          }).catch((error) => {
            console.log(error);
          });
        }
}
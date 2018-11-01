import Axios from 'axios'
import setAuth from '../../src/util/setAuth'
export function login(userData){
    return dispatch =>{
        return Axios.post('http://localhost:5000/user/login', {
            username: userData.userlogin,
            password: userData.password
          }).then((res) =>{
            const userToken = res.headers.token
            localStorage.setItem('jwtToken', userToken)
            setAuth(token)
          }).catch((error) => {
            console.log(error);
          });
        }
}
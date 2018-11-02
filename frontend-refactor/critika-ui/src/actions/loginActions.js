import Axios from 'axios'
import setAuth from '../../src/util/setAuth'
export function login(userData){
    return dispatch =>{
        return Axios.post('http://localhost:5000/user/login', {
            username: userData.userlogin,
            password: userData.password
          }).then((res) =>{
            console.log(res.headers)
            const userToken = res.headers.token
            console.log(userToken)
            localStorage.setItem('jwtToken', userToken)
            setAuth(userToken)
          }).catch((error) => {
            console.log(error);
          });
        }
}
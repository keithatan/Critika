import Axios from "axios";

export function userRegisterRequest(userData){
    return dispatch =>{

        return Axios.post('http://localhost:5000/user/register', {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            securityquestionanswer: userData.securityanswer,
            securityquestion: userData.securityquestion,
          })
    }

}
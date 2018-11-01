import {LOGIN} from '../actions';

const UserReducer = function (state = {}, action){
    switch(action.type){
    case LOGIN:
        console.log(action.payload.data);
        return action.payload.data;
    default:
        return state;
    }
}

export default UserReducer;
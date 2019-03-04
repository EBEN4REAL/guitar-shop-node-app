 import {
     LOGIN_USER,
     REGISTER_USER,
     AUTH_USER,
     LOGOUT_USER
    } from '../../../store/actions/types';


const  rootReducer =  (state={} , action) => {
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return {...state, loginSuccess: action.payload }
        case  AUTH_USER:
            return {...state, user_data: action.payload}
        case LOGOUT_USER:
            return {...state}
        default:
            return state;
    }
}
export default rootReducer;
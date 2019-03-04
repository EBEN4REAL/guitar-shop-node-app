import axios from 'axios';
import {LOGIN_USER} from '../types';
import {REGISTER_USER} from '../types';
import {AUTH_USER} from '../types';
import  {LOGOUT_USER} from '../types.js';

import {USER_SERVER} from '../../../components/utils/misc'

export const loginUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
                    .then(res => res.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}
export const registerUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(res => res.data);
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const  auth = () => {
    const req = axios.get(`${USER_SERVER}/auth`).then(res => res.data);

    return {
        type: AUTH_USER,
        payload: req
    }
}

export const logoutUser = () => {
    const req = axios.get(`${USER_SERVER}/logout`)
        .then(res => {
            return res.data
        })

        return {
            type: LOGOUT_USER,
            payload: req
        }
}
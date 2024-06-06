import axios from 'axios';

const BASE_URL = "https://url-shortner-fsd.onrender.com/api/v1";


export const signUp = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/sign-up`, { ...payload });
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
} 

export const signIn = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/sign-in`, { ...payload });
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
} 

export const forgotPassword = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/forgot-password`, { ...payload });
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
} 

export const resetPassword = async (payload, id, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/reset-password/${id}/${token}`, { ...payload });
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
} 

export const activateUser = async (id) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/activate-account/${id}`);
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
}
import axios from 'axios';

const BASE_URL = "https://url-shortner-fsd.onrender.com/api/v1";

export const shortenUrl = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/url/shorten`, { ...payload }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
};

export const getMyUrls = async (page, rowsPerPage) => {
    try {
        const response = await axios.get(`${BASE_URL}/url/my-urls?page=${page}&rowsPerPage=${rowsPerPage}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
}

export const getUrlDetails = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/url/url-details`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(response.data) {
            return response;
        }
    }
    catch(err) {
        throw err;
    }
}
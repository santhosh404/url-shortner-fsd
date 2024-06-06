import axios from 'axios';

const BASE_URL = "https://url-shortner-fsd.onrender.com/api/v1";

export const getUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/user-details`, {
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
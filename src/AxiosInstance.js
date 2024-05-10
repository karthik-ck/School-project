import axios from 'axios';
const token = localStorage.getItem('token')

const axiosInstance = axios.create({
    baseURL: 'http://13.200.77.195:5002/api/v1/',
    headers : {
        'X-Db-Key': 'mk',
        'Authorization': 'Bearer ' + token
    }
});

export default axiosInstance;

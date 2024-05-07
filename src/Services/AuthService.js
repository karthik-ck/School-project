import axios from "axios";

const REACT_APP_APIURL = 'http://13.200.77.195:5002/api/v1/'
const token = localStorage.getItem('token')

const headers = {
    'X-Db-Key': 'mk',
    'Authorization':token
}

export default class AuthService {

    static login(inst_id, username, password) {
        const formData = {
            'inst_id': inst_id,
            'username': username,
            'password': password
        }
        const result = axios.post(REACT_APP_APIURL + 'admin/login', formData , { headers })
        return result;
    }

}

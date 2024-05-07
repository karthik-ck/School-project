import axios from "axios";

const REACT_APP_APIURL = 'http://13.200.77.195:5002/api/v1/'
const token = localStorage.getItem('token')

const headers = {
    'X-Db-Key': 'mk',
}

if (token) {
    headers['Authorization'] = 'Bearer ' + token;
}

export default class UserService {
    static getSubjects(search, page) {
        const result = axios.get(`${REACT_APP_APIURL}student/subject/list-subject?search=${search}&page=${page}`, { headers })
        return result;
    }

    static addSubject(subject_name, subject_code, subjectType) {
        const formData = {
            'subject_name': subject_name,
            'subject_code': subject_code,
            'subjectType': subjectType
        }
        const result = axios.post(`${REACT_APP_APIURL}student/subject/add-subject`, formData, { headers })
        return result;
    }

    static updateSubject(id, subject_name, subject_code, subjectType) {
        const formData = {
            'subject_name': subject_name,
            'subject_code': subject_code,
            'subjectType': subjectType
        }
        const result = axios.put(`${REACT_APP_APIURL}student/subject/update-subject/${id}`, formData, { headers })
        return result
    }

    static deleteSubject(id) {
        const result = axios.delete(`${REACT_APP_APIURL}student/subject/delete-subject/${id}`, { headers })
        return result
    }
}
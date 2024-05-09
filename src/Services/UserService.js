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

    // Customers

    static addCustomer(customers) {
        const formData = {
            'customers': JSON.stringify(customers)
        }
        const result = axios.post(`${REACT_APP_APIURL}user/customer/add`, formData, { headers })
        return result;
    }

    static getCustomers(page) {
        const result = axios.get(`${REACT_APP_APIURL}user/customer/list?page=${page}`, { headers })
        return result;
    }

    static getCustomerbyID(id) {
        const result = axios.get(`${REACT_APP_APIURL}user/customer/byid/${id}`, { headers })
        return result;
    }

    static updateCustomer(id, formData) {
        const result = axios.put(`${REACT_APP_APIURL}user/customer/update/${id}`, formData, { headers })
        return result;
    }

    // Parties

    static getPartiesData(page) {
        const result = axios.get(`${REACT_APP_APIURL}user/parties/list?page=${page}`, { headers })
        return result
    }

    static addParties(parties) {
        const formData = {
            'parties': JSON.stringify(parties)
        }
        const result = axios.post(`${REACT_APP_APIURL}user/parties/add`, formData, { headers })
        return result;
    }

    static getPartiesbyID(id) {
        const result = axios.get(`${REACT_APP_APIURL}user/parties/byid/${id}`, { headers })
        return result;
    }

    static updateParty(id, formData) {
        const result = axios.put(`${REACT_APP_APIURL}user/parties/update/${id}`, formData, { headers })
        return result;
    }

    static deleteParty(id) {
        const result = axios.delete(`${REACT_APP_APIURL}user/parties/delete/${id}`, { headers })
        return result;
    }

    // Exam
    static getAcademicYearDropdown() {
        const result = axios.get(`${REACT_APP_APIURL}student/academic-year/list-academic-year-dropdown`, { headers })
        return result;
    }

    static getClassDropdown(id) {
        const result = axios.get(`${REACT_APP_APIURL}student/class/dropdown/${id}`, { headers })
        return result;
    }

    static getBranchDropdown(id) {
        const result = axios.get(`${REACT_APP_APIURL}student/branch/list-branch-dropdown/${id}`, { headers })
        return result;
    }

    static getTermDropdown(id) {
        const result = axios.get(`${REACT_APP_APIURL}student/exam/term-class-exam?class_name=${id}`, { headers })
        return result;
    }

    static getExamList(page, class_name, branch_name, term_name) {
        const result = axios.get(`${REACT_APP_APIURL}student/exam/list-exam?page${page}&class_name=${class_name}&branch_name=${branch_name}&term_name=${term_name}`, { headers })
        return result;
    }

}
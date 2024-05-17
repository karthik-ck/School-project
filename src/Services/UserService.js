//import axios from "axios";
import axiosInstance from "../AxiosInstance";

// const REACT_APP_APIURL = 'http://13.200.77.195:5002/api/v1/'
// const token = localStorage.getItem('token')

// const headers = {
//     'X-Db-Key': 'mk',
// }

// if (token) {
//     headers['Authorization'] = 'Bearer ' + token;
// }

export default class UserService {
    static getSubjects(search, page) {
        const result = axiosInstance.get(`student/subject/list-subject?search=${search}&page=${page}`)
        return result;
    }

    static addSubject(subject_name, subject_code, subjectType) {
        const formData = {
            'subject_name': subject_name,
            'subject_code': subject_code,
            'subjectType': subjectType
        }
        const result = axiosInstance.post(`student/subject/add-subject`, formData)
        return result;
    }

    static updateSubject(id, subject_name, subject_code, subjectType) {
        const formData = {
            'subject_name': subject_name,
            'subject_code': subject_code,
            'subjectType': subjectType
        }
        const result = axiosInstance.put(`student/subject/update-subject/${id}`, formData,)
        return result
    }

    static deleteSubject(id) {
        const result = axiosInstance.delete(`student/subject/delete-subject/${id}`)
        return result
    }

    // Customers

    static addCustomer(customers) {
        const formData = {
            'customers': JSON.stringify(customers)
        }
        const result = axiosInstance.post(`user/customer/add`, formData)
        return result;
    }

    static getCustomers(page) {
        const result = axiosInstance.get(`user/customer/list?page=${page}`)
        return result;
    }

    static getCustomerbyID(id) {
        const result = axiosInstance.get(`user/customer/byid/${id}`)
        return result;
    }

    static updateCustomer(id, formData) {
        const result = axiosInstance.put(`user/customer/update/${id}`, formData)
        return result;
    }

    // Parties

    static getPartiesData(page) {
        const result = axiosInstance.get(`user/parties/list?page=${page}`)
        return result
    }

    static addParties(parties) {
        const formData = {
            'parties': JSON.stringify(parties)
        }
        const result = axiosInstance.post(`user/parties/add`, formData)
        return result;
    }

    static getPartiesbyID(id) {
        const result = axiosInstance.get(`user/parties/byid/${id}`)
        return result;
    }

    static updateParty(id, formData) {
        const result = axiosInstance.put(`user/parties/update/${id}`, formData)
        return result;
    }

    static deleteParty(id) {
        const result = axiosInstance.delete(`user/parties/delete/${id}`)
        return result;
    }

    // Exam
    static getAcademicYearDropdown() {
        const result = axiosInstance.get(`student/academic-year/list-academic-year-dropdown`)
        return result;
    }

    static getClassDropdown(id) {
        const result = axiosInstance.get(`student/class/dropdown/${id}`)
        return result;
    }

    static getBranchDropdown(id) {
        const result = axiosInstance.get(`student/branch/list-branch-dropdown/${id}`)
        return result;
    }

    static getSectionDropdown(id) {
        const result = axiosInstance.get(`student/section/list-section-dropdown/${id}`)
        return result;
    }

    static getTermDropdown(id) {
        const result = axiosInstance.get(`student/exam/term-class-exam?class_name=${id}`)
        return result;
    }

    static getExamList(page, class_name, branch_name, term_name) {
        const result = axiosInstance.get(`student/exam/list-exam?page${page}&class_name=${class_name}&branch_name=${branch_name}&term_name=${term_name}`)
        return result;
    }

    static getExambyId(id) {

    }

    static addExam(class_name, branch_name, term_name, exam_name, status, annual_report_status,
        exam_start_date, exam_end_date, dealine_for_markEntry) {
        const formData = {
            'class_name': class_name,
            'branch_name': branch_name,
            'term_name': term_name,
            'exam_name': exam_name,
            'status': status,
            'annual_report_status': annual_report_status,
            'exam_start_date': exam_start_date,
            'exam_end_date': exam_end_date,
            'dealine_for_markEntry': dealine_for_markEntry
        }
        const result = axiosInstance.post(`student/exam/add-exam`, formData)
        return result;
    }

    // Reports
    static getHealthReports(academic_year, student_class, section, branch) {
        const result = axiosInstance.get(`student/students/studentinfo?academic_year=${academic_year}&student_class=${student_class}&section=${section}&branch=${branch}`)
        return result
    }
}
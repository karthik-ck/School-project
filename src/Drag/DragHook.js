import { useEffect, useState } from 'react'
import UserService from '../Services/UserService'

function DragHook() {
    const [studentData, setStudentData] = useState([])
    const [year, setYear] = useState('')

    useEffect(() => {
        getAcademicYear()
    }, [])

    useEffect(() => {
        if (year) {
            report()
        }
    }, [year])

    function getAcademicYear() {
        UserService.getAcademicYearDropdown()
            .then((response) => {
                const defaultYear = response.data.data.find(
                    (year) => year.set_default === "TRUE"
                );
                setYear(defaultYear._id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function report() {
        UserService.getStudentData(year)
            .then((response) => {
                setStudentData(response.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return {
        studentData
    }
}

export default DragHook

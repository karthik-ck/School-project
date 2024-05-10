import { useEffect, useState } from "react"
import UserService from "../../Services/UserService"

function CreateExamHook() {
    const [classdata, setClassdata] = useState([])
    const [branchdata, setBranchdata] = useState([])
    const [termdata, setTermdata] = useState([])
    const [year, setYear] = useState('')
    const [selectedClass, setSelectedClass] = useState('')
    const [selectedBranch, setSelectedBranch] = useState('')
    const [selectedTerm, setSelectedTerm] = useState('')

    useEffect(() => {
        getAcademicYear()
    }, [])

    useEffect(() => {
        if (year) {
            getClass()
        }
    }, [year])

    useEffect(() => {
        if (selectedClass) {
            getBranch()
            getTerm()
        }
    }, [selectedClass])

    function getAcademicYear() {
        UserService.getAcademicYearDropdown()
            .then((response) => {
                const defaultYear = response.data.data.find((year) => year.set_default === 'TRUE')
                setYear(defaultYear._id)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function getClass() {
        UserService.getClassDropdown(year)
            .then((response) => {
                setClassdata(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function getBranch() {
        UserService.getBranchDropdown(selectedClass)
            .then((response) => {
                setBranchdata(response.data.data[0].branchData[0]._id)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function getTerm() {
        UserService.getTermDropdown(selectedClass)
            .then((response) => {
                setTermdata(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const classHandler = (event) => {
        setSelectedClass(event.target.value)
    }

    const branchHandler = (event) => {
        setSelectedBranch(event.target.value)
    }

    const termHandler = (event) => {
        setSelectedTerm(event.target.value)
    }

    return {
        classdata,
        selectedClass,
        classHandler,
        branchdata,
        termdata,
        selectedBranch,
        selectedTerm,
        branchHandler,
        termHandler
    }
}

export default CreateExamHook

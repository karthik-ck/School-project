import { useEffect, useState } from "react"
import UserService from "../../Services/UserService"
import { useLocation, useNavigate } from "react-router-dom"

function CreateExamHook() {
    const navigate=useNavigate()
    const [classdata, setClassdata] = useState([])
    const [branchdata, setBranchdata] = useState([])
    const [termdata, setTermdata] = useState([])
    const [year, setYear] = useState('')
    const [selectedClass, setSelectedClass] = useState('')
    const [selectedBranch, setSelectedBranch] = useState('')
    const [selectedTerm, setSelectedTerm] = useState('')
    const [examname, setExamname] = useState('')
    const [annualReport, setAnnualReport] = useState('')
    const [status, setStatus] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [deadlineDate,setDeadlineDate]=useState('')

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

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

    useEffect(()=>{
        if(id){

        }
    },[id])

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
                setBranchdata(response.data.data[0].branchData)
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
        setSelectedBranch('')
        setSelectedTerm('')
    }

    const branchHandler = (event) => {
        setSelectedBranch(event.target.value)
    }

    const termHandler = (event) => {
        setSelectedTerm(event.target.value)
    }

    const examnameChange = (event) => {
        setExamname(event.target.value)
    }

    const annualReportChange = (event) => {
        setAnnualReport(event)
    }

    const statusChange = (event) => {
        setStatus(event)
    }

    const startDateChange = (event) => {
        setStartDate(event.target.value)
        setEndDate('')
        setDeadlineDate('')
    }

    const endDateChange = (event) => {
        setEndDate(event.target.value)
        setDeadlineDate('')
    }

    const deadlineDateChange = (event) => {
        setDeadlineDate(event.target.value)
    }

    const saveExam = () => {
        if (selectedClass && selectedTerm && examname && annualReport && status && startDate && endDate && deadlineDate){
            UserService.addExam(selectedClass, selectedBranch, selectedTerm, examname,
                status, annualReport, startDate, endDate, deadlineDate)
                .then((response) => {
                    if (response.status === 200) {
                        alert(response.data.status.message)
                        navigate("/exam")
                    } else {
                        alert(response.data.status.message)
                    }
                })
                .catch((error) => {
                    alert(error.response.data.status.message)
                })
        }
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
        termHandler,
        saveExam,
        examname,
        examnameChange,
        annualReport,
        annualReportChange,
        status,
        statusChange,
        startDate,
        endDate,
        startDateChange,
        endDateChange,
        deadlineDate,
        deadlineDateChange
    }
}

export default CreateExamHook

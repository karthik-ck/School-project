import { useState, useEffect } from 'react'
import UserService from '../Services/UserService'
import { useNavigate } from 'react-router-dom'

function ExamHook() {
  const navigate = useNavigate()
  const [examData, setExamData] = useState([])
  const [year, setYear] = useState('')
  const [classData, setClassData] = useState([])
  const [seClass, setSeClass] = useState('')
  const [branchData, setBranchData] = useState([])
  const [seBranch, setSeBranch] = useState('')
  const [termdata, setTermdata] = useState([])
  const [seTerm, setSeTerm] = useState('')
  const [isSearch, setIsSearch] = useState(true)

  useEffect(() => {
    getAcademicYear()
  }, [])

  useEffect(() => {
    if (year) {
      getClass()
    }
  }, [year])

  useEffect(() => {
    if (seClass) {
      getBranch()
      getSection()
    }
  }, [seClass])

  useEffect(() => {
    if (seClass && isSearch) {
      getExamList()
    }
  }, [seClass, seBranch, seTerm, isSearch])

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
        setClassData(response.data.data)
        if (response.data.data.length > 0) {
          setSeClass(response.data.data[0]._id)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getBranch() {
    UserService.getBranchDropdown(seClass)
      .then((response) => {
        setBranchData(response.data.data[0].branchData)
        if (response.data.data[0].branchData.length > 0) {
          setSeBranch(response.data.data[0].branchData[0]._id)
        } else {
          setSeBranch("")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getSection() {
    UserService.getTermDropdown(seClass)
      .then((response) => {
        setTermdata(response.data.data)
        if (response.data.data.length > 0) {
          setSeTerm(response.data.data[0]._id)
        } else {
          setSeTerm("")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function getExamList() {
    UserService.getExamList(1, seClass, seBranch, seTerm)
      .then((response) => {
        setExamData(response.data.data.docs)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const classHandler = (event) => {
    setSeClass(event.target.value)
    setIsSearch(false)
  }

  const branchHandler = (event) => {
    setSeBranch(event.target.value)
    setIsSearch(false)
  }

  const termHandler = (event) => {
    setSeTerm(event.target.value)
    setIsSearch(false)
  }

  function dateFormat(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();

    // Create the formatted date string in dd-MM-yyyy format
    const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    return formattedDate;

  }

  const searchFilter = () => {
    setIsSearch(true)
  }

  function addExam() {
    navigate("/exam/create-exam")
  }

  return {
    classData,
    seClass,
    branchData,
    seBranch,
    termdata,
    seTerm,
    classHandler,
    branchHandler,
    termHandler,
    examData,
    dateFormat,
    searchFilter,
    addExam
  }
}

export default ExamHook

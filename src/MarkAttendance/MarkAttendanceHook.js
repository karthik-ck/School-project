import { useState, useEffect } from 'react'
import UserService from '../Services/UserService';

function MarkAttendanceHook() {
  const [yeardata, setYeardata] = useState([]);
  const [year, setYear] = useState("");
  const [classData, setClassData] = useState([]);
  const [seClass, setSeClass] = useState("");
  const [branchData, setBranchData] = useState([]);
  const [seBranch, setSeBranch] = useState("");
  const [sectiondata, setSectiondata] = useState([]);
  const [seSection, setSeSection] = useState("");
  const [isSearch, setIsSearch] = useState(true);
  const [seDate, setSeDate] = useState("");
  const [report, setReport] = useState([])
  const [allPresent, setAllPresent] = useState(false)
  const [allHoliday, setAllHoliday] = useState(false)
  const [studentArray, setStudentArray] = useState([])
  const [attMonth, setAttMonth] = useState('')
  const [attYear, setAttYear] = useState('')
  const [loading, setLoading] = useState(false)

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    setSeDate(`${year}-${month}-${day}`)
    setAttMonth(month)
    setAttYear(year)
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getAcademicYear();
    getTodayDate()
  }, []);

  useEffect(() => {
    if (year) {
      getClass();
    }
  }, [year]);

  useEffect(() => {
    if (seClass) {
      getBranch();
      getSection();
    }
  }, [seClass]);

  useEffect(() => {
    if (seClass && seSection && isSearch) {
      getReport()
    }
  }, [seClass, seSection, seBranch, isSearch])

  function getAcademicYear() {
    setLoading(true)
    UserService.getAcademicYearDropdown()
      .then((response) => {
        setYeardata(response.data.data);
        const defaultYear = response.data.data.find(
          (year) => year.set_default === "TRUE"
        );
        setYear(defaultYear._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getClass() {
    UserService.getClassDropdown(year)
      .then((response) => {
        setClassData(response.data.data);
        if (response.data.data.length > 0) {
          setSeClass(response.data.data[0]._id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getBranch() {
    UserService.getBranchDropdown(seClass)
      .then((response) => {
        setBranchData(response.data.data[0].branchData);
        if (response.data.data[0].branchData.length > 0) {
          setSeBranch(response.data.data[0].branchData[0]._id);
        } else {
          setSeBranch("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getSection() {
    UserService.getSectionDropdown(seClass)
      .then((response) => {
        setSectiondata(response.data.data);
        if (response.data.data.length > 0) {
          setSeSection(response.data.data[0]._id);
        } else {
          setSeSection("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getReport() {
    UserService.getAttendanceList(seDate, seClass, seSection, seBranch, '')
      .then((response) => {
        if (response.data.data.length > 0) {
          setReport(response.data.data);
          setLoading(false)
        } else {
          setReport([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const yearHandler = (event) => {
    setYear(event.target.value);
    setIsSearch(false);
  };

  const classHandler = (event) => {
    setSeClass(event.target.value);
    setIsSearch(false);
  };

  const branchHandler = (event) => {
    setSeBranch(event.target.value);
    setIsSearch(false);
  };

  const sectionHandler = (event) => {
    setSeSection(event.target.value);
    setIsSearch(false);
  };

  const dateHandler = (event) => {
    setSeDate(event.target.value)
    if (event.target.value) {
      const date = event.target.value.split('-')
      setAttMonth(date[2])
      setAttYear(date[0])
    }
    setIsSearch(false);
  }

  function searchFilter() {
    setIsSearch(true);
    setStudentArray([])
    setAllPresent(false)
    setAllHoliday(false)
  }

  const allPresentHandler = (event) => {
    const attendance = event.target.value
    const updatedReport = report.map((val) => ({
      ...val,
      attendance
    }))
    setReport(updatedReport)
    setAllPresent(true)
    setAllHoliday(false)

    let array = []
    updatedReport.forEach((arr) => {
      array.push({
        "student_id": arr._id,
        "attendance": arr.attendance
      })
    })
    setStudentArray(array)
  }

  const allHolidayHandler = (event) => {
    const attendance = event.target.value
    const updatedReport = report.map((val) => ({
      ...val,
      attendance
    }))
    setReport(updatedReport)
    setAllPresent(false)
    setAllHoliday(true)

    let array = []
    updatedReport.forEach((arr) => {
      array.push({
        "student_id": arr._id,
        "attendance": arr.attendance
      })
    })
    setStudentArray(array)
  }

  const presentHandler = (event, list) => {
    const attendance = event.target.value
    const updateList = { ...list, attendance }
    const updatedReport = report.map((val) =>
      val._id === updateList._id ? updateList : val
    )
    setReport(updatedReport)
    setAllPresent(false)
    setAllHoliday(false)

    let array = []
    updatedReport.forEach((arr) => {
      if (arr.attendance) {
        array.push({
          "student_id": arr._id,
          "attendance": arr.attendance
        })
      }
    })
    setStudentArray(array)
  }

  function saveChanges() {
    if (studentArray.length === 0) {
      alert('Please Choose any Students.!')
      return;
    }

    UserService.markAttandance(studentArray, seDate, attMonth, attYear)
      .then((res) => {
        if (res.status.code === 200) {
          alert(res.data.status.message);
          setStudentArray([])
        } else {
          alert(res.data.status.message);
        }
      })
      .catch((error) => {
        alert(error.response.data.status.message);
      });
  }

  return {
    yeardata,
    year,
    classData,
    seClass,
    yearHandler,
    classHandler,
    branchData,
    seBranch,
    sectiondata,
    seSection,
    branchHandler,
    sectionHandler,
    searchFilter,
    seDate,
    dateHandler,
    report,
    allPresentHandler,
    allHolidayHandler,
    presentHandler,
    allPresent,
    allHoliday,
    saveChanges,
    loading
  }
}

export default MarkAttendanceHook

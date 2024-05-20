import { useState, useEffect } from "react";
import UserService from "../Services/UserService";

function ReportsHook() {
    const [yeardata, setYeardata] = useState([]);
    const [year, setYear] = useState("");
    const [classData, setClassData] = useState([]);
    const [seClass, setSeClass] = useState("");
    const [branchData, setBranchData] = useState([]);
    const [seBranch, setSeBranch] = useState("");
    const [sectiondata, setSectiondata] = useState([]);
    const [seSection, setSeSection] = useState("");
    const [report, setReport] = useState([]);
    const [isSearch, setIsSearch] = useState(true);
    const [selectAll, setSelectAll] = useState(false);
    const [studentArray, setStudentArray] = useState([]);

    useEffect(() => {
        getAcademicYear();
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
            getReport();
        }
    }, [seClass, seBranch, seSection, isSearch]);

    function getAcademicYear() {
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
        UserService.getHealthReports(year, seClass, seSection, seBranch)
            .then((response) => {
                if (response.data.data.data.length) {
                    setReport(response.data.data.data[0]?.documentdata);
                } else {
                    setReport([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // async function getReport() {
    //     try {
    //         const response = await UserService.getHealthReports(year, seClass, seSection, seBranch)
    //         if (response.data.data.data.length) {
    //             setReport(response.data.data.data[0]?.documentdata);
    //         } else {
    //             setReport([]);
    //         }
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

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

    function searchFilter() {
        setIsSearch(true);
        setStudentArray([]);
    }

    const allCheckboxHandler = (event) => {
        const selected = event.target.checked;
        setSelectAll(selected);
        const updatedReport = report.map((item) => ({
            ...item,
            selected,
        }));
        setReport(updatedReport);
        const array = updatedReport.map((item) => item._id);
        setStudentArray(array);

        if (event.target.checked === false) {
            setStudentArray([]);
        }
    };

    const checkboxHandler = (event, list) => {
        const selected = event.target.checked ? true : false;
        const updateList = { ...list, selected };
        const updatedReport = report.map((item) =>
            item._id === updateList._id ? updateList : item
        );
        setReport(updatedReport);

        if (selected) {
            setStudentArray((prevArray) => [...prevArray, list._id]);
        } else {
            setSelectAll(false)
            setStudentArray((prevArray) => prevArray.filter((id) => id !== list._id))
        }
    };

    function generateCard() {
        if (studentArray.length < 1) {
            alert('Please Select Student..!')
            return;
        }
        UserService.generateHealthReport(year, seClass, seSection, seBranch, "", studentArray)
            .then((response) => {
                if (response.status === 200) {
                    const blob = new Blob([response.data], { type: "application/pdf" });

                    const fileName = 'Health & Activity Report Card.pdf';
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(link.href);
                } else {
                    alert(response.data.status.message);
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
        report,
        searchFilter,
        allCheckboxHandler,
        selectAll,
        checkboxHandler,
        generateCard
    };
}

export default ReportsHook;

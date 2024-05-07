import { useEffect, useState } from 'react'
import UserService from '../Services/UserService'

export default function HomeHook() {
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [type, setType] = useState('')
    const [listSubjects, setListSubjects] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [showupdate, setShowupdate] = useState(false)
    const [editId, setEditId] = useState()
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [totalDocs,setTotalDocs]=useState(0)
    const [pagingCounter, setPagingCounter] = useState(0)
    const [perPage, setPerPage]=useState(0)

    useEffect(() => {
        getSubjectList()
    }, [currentPage])

    function getSubjectList() {
        UserService.getSubjects(search, currentPage)
            .then((response) => {
                setListSubjects(response.data.data.docs)
                setTotalPage(response.data.data.totalPages)
                setTotalDocs(response.data.data.totalDocs)
                setPagingCounter(response.data.data.pagingCounter)
                setPerPage(response.data.data.limit)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleChange = (event) => {
        if (event.target.name === 'name') {
            setName(event.target.value)
        }
        if (event.target.name === 'code') {
            setCode(event.target.value)
        }
        if (event.target.name === 'type') {
            setType(event.target.value)
        }
    }

    const saveSubject = () => {
        setSubmitted(true)
        if (name && code && type) {
            setSubmitted(false)
            UserService.addSubject(name, code, type)
                .then((response) => {
                    if (response.status === 200) {
                        alert(response.data.status.message)
                        getSubjectList()
                        setName('')
                        setCode('')
                        setType('')
                    } else {
                        alert(response.data.status.message)
                    }
                })
                .catch((error) => {
                    alert(error.response.data.status.message)
                })
        }
    }

    const edit = (list) => {
        setName(list.subject_name)
        setCode(list.subject_code)
        setType(list.subjectType)
        setShowupdate(true)
        setEditId(list._id)
    }

    const cancel = () => {
        setShowupdate(false)
        setName('')
        setCode('')
        setType('')
    }

    const updateSubject = () => {
        setSubmitted(true)
        if (name && code && type) {
            setSubmitted(false)
            UserService.updateSubject(editId, name, code, type)
                .then((response) => {
                    if (response.status === 200) {
                        alert(response.data.status.message)
                        getSubjectList()
                        setName('')
                        setCode('')
                        setType('')
                        setShowupdate(false)
                    } else {
                        alert(response.data.status.message)
                    }
                })
                .catch((error) => {
                    alert(error.response.data.status.message)
                })
        }
    }

    const deleteSubject = (list) => {
        UserService.deleteSubject(list._id)
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data.status.message)
                    getSubjectList()
                } else {
                    alert(response.data.status.message)
                }
            })
            .catch((error) => {
                alert(error.response.data.status.message)
            })
    }

    const Search = (event) => {
        setSearch(event.target.value)
        getSubjectList()
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return {
        name,
        code,
        type,
        listSubjects,
        handleChange,
        saveSubject,
        submitted,
        edit,
        showupdate,
        cancel,
        updateSubject,
        deleteSubject,
        Search,
        currentPage,
        totalPage,
        handlePageChange,
        totalDocs,
        pagingCounter,
        perPage
    }
}
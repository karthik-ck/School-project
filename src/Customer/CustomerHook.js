import { useEffect, useState } from 'react'
import UserService from '../Services/UserService'
import { useNavigate } from 'react-router-dom'

function CustomerHook() {
    const navigate = useNavigate()
    const [customerData, setCustomerData] = useState([])
    const [fetchData, setFetchData] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalDocs, setTotalDocs] = useState(0)
    const [perPage, setPerPage] = useState(0)
    const [pagingCounter, setPagingCounter] = useState(0)

    useEffect(() => {
        getCustomers()
    }, [])

    function getCustomers() {
        UserService.getCustomers(currentPage)
            .then((response) => {
                setCustomerData(response.data.data.docs)
                setFetchData(response.data.data.docs[0])

                setCurrentPage(response.data.data.page)
                setTotalDocs(response.data.data.totalDocs)
                setPagingCounter(response.data.data.pagingCounter)
                setPerPage(response.data.data.limit)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const nameClick = (list) => {
        setFetchData(list)
    }

    const editCustomer = (id) => {
        navigate(`/settings?id=${id}`)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return {
        customerData,
        fetchData,
        nameClick,
        editCustomer,
        currentPage,
        totalDocs,
        perPage,
        pagingCounter,
        handlePageChange
    }
}

export default CustomerHook

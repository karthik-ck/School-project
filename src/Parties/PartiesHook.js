import { useEffect, useState } from "react"
import UserService from "../Services/UserService"
import { useNavigate } from "react-router-dom"

function PartiesHook() {
    const navigate = useNavigate()
    const [partyData, setPartyData] = useState([])
    const [fetchData, setFetchData] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalDocs, setTotalDocs] = useState(0)
    const [perPage, setPerPage] = useState(0)
    const [pagingCounter, setPagingCounter] = useState(0)

    useEffect(() => {
        getPartiesData()
    }, [])

    function getPartiesData() {
        UserService.getPartiesData(currentPage)
            .then((response) => {
                setPartyData(response.data.data.docs)
                setFetchData(response.data.data.docs[0])

                setCurrentPage(response.data.data.page)
                setTotalDocs(response.data.data.totalDocs)
                setPerPage(response.data.data.limit)
                setPagingCounter(response.data.data.pagingCounter)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const nameClick = (list) => {
        setFetchData(list)
    }

    const editParty = (id) => {
        navigate(`/parties/add-parties?id=${id}`)
    }

    const deleteParty = (id) => {
        UserService.deleteParty(id)
            .then((response) => {
                if (response.status === 200) {
                    alert(response.data.status.message)
                    getPartiesData()
                } else {
                    alert(response.data.status.message)
                }
            })
            .catch((error) => {
                alert(error.response.data.status.message)
            })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return {
        partyData,
        fetchData,
        nameClick,
        editParty,
        deleteParty,
        currentPage,
        totalDocs,
        perPage,
        pagingCounter,
        handlePageChange
    }
}

export default PartiesHook

import { useEffect, useState } from 'react'
import UserService from '../Services/UserService'
import { useNavigate } from 'react-router-dom'

function CustomerHook() {
    const navigate = useNavigate()
    const [customerData, setCustomerData] = useState([])

    useEffect(() => {
        getCustomers()
    }, [])

    function getCustomers() {
        UserService.getCustomers()
            .then((response) => {
                setCustomerData(response.data.data.docs)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return {
        customerData
    }
}

export default CustomerHook

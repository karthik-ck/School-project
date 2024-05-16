import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        navigate('')
    }

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
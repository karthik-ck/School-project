import React, { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const LanguageContext = createContext()

export const LanguageProvider = ({children}) => {
    const [language,setLanguage]=useState('English')

    const toggleLanguage = () => {
        setLanguage((prevLang)=> (prevLang === 'English' ? 'Kannada' : 'English'))
    }

    return(
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => useContext(LanguageContext)

export default LanguageContext
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'light') {
            root.style.setProperty('--background-color', 'var(--background-color-light)');
            root.style.setProperty('--text-color', 'var(--text-color-light)');
        } else {
            root.style.setProperty('--background-color', 'var(--background-color-dark)');
            root.style.setProperty('--text-color', 'var(--text-color-dark)');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeContext
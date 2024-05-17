import React, { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import AuthContext from '../Auth/AuthContext'
import { useTheme } from '../Auth/ThemeContext'
import { useLanguage } from '../Auth/LanguageContext'
import '../App.css'

function Header() {
    const { user, logout } = useContext(AuthContext)
    const { theme, toggleTheme } = useTheme()
    const { language, toggleLanguage } = useLanguage()

    const themeStyle = {
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        textAlign: "center",
        marginRight: "10px",
        padding: "10px",
        border: "none",
        borderRadius: "5px"
    }

    return (
        <div className='header_container'>
            <div className='header-top'>
                <img src={require('../Assets/Images/project-logo.png')} alt='' className='header-top-icon' />
                <div className='header-right'>
                    <div className='language_style'>
                        Language : {language}
                    </div>
                    <button onClick={toggleLanguage} className='toggle_switch'>
                        Switch to {language === 'English' ? 'Kannada' : 'English'} Language
                    </button>
                    <div style={themeStyle}>
                        Mode : {theme}
                    </div>
                    <button onClick={toggleTheme} className='toggle_switch'>
                        Switch to {theme === 'light' ? 'dark' : 'light'} Mode
                    </button>
                    <div className='header-right-text'>
                        Hi,
                        {user ? user.username : ''}
                        <span>08-05-2024</span>
                    </div>
                    <div className='header-settings'>
                        <button onClick={logout} title="logout">
                            <img src={require('../Assets/Images/setting-icon.png')} alt='' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='header-menu'>
                <ul>
                    <li><Link to="/home">Subjects</Link></li>
                    <li><Link to="/customer">Settings</Link></li>
                    <li><Link to="/parties">Parties</Link></li>
                    <li><Link to="/exam">Exam</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header

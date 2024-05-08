import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className='header_container'>
            <div className='header-top'>
                <img src={require('../Assets/Images/project-logo.png')} alt='' className='header-top-icon' />
                <div className='header-right'>
                    <div className='header-right-text'>
                        Hi, SuperAdmin
                        <span>08-05-2024</span>
                    </div>
                    <div className='header-settings'>
                        <button>
                            <img src={require('../Assets/Images/setting-icon.png')} alt='' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='header-menu'>
                <ul>
                    <li><Link to="/home">Subjects</Link></li>
                    <li><Link to="/customer">Settings</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header

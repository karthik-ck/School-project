import React from 'react'
import './Header.css'

function Header() {
    return (
        <div className='header_container'>
            <div className='header-top'>
                <img src={require('../Assets/Images/project-logo.png')} alt='' className='header-top-icon'/>
                <div className='header-right'>
                    <div className='header-right-text'>
                        Hi, SuperAdmin
                        <span>03-05-2024</span>
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
                <li>Dashboard</li>
                <li>Settings</li>
              </ul>
            </div>
        </div>
    )
}

export default Header

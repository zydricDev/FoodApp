import React from 'react'
import {Link} from 'react-router-dom'
import AuthOptions from '../auth/AuthOptions'
import LoggedInOptions from './LoggedInOptions'

export default function Header() {
    return (
        <header className='flex justify-between bg-black-t-50 '>
            <div className='flex'>
                <Link to='/'>
                    <h1 className='xl:text-4xl p-3 hover:text-white'>App Name</h1>
                </Link>
                <LoggedInOptions/>
            </div>
            <AuthOptions/>
            
            
        </header>
    )
}

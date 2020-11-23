import React from 'react'
import {Link} from 'react-router-dom'
import AuthOptions from '../auth/AuthOptions'
import LoggedInOptions from './LoggedInOptions'

export default function Header() {
    return (
        <header className='flex justify-between border-b shadow-sm'>
            <div className='flex'>
                <Link to='/'>
                    <h1 className='xl:text-4xl p-3 text-red-500 hover:text-red-600 font-bold ml-5'>Food App</h1>
                </Link>
                <LoggedInOptions/>
            </div>
            <AuthOptions/>
            
            
        </header>
    )
}

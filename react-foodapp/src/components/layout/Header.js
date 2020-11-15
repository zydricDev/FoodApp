import React from 'react'
import {Link} from 'react-router-dom'
import AuthOptions from '../auth/AuthOptions'

export default function Header() {
    return (
        <header className='flex justify-between bg-black-t-50 '>
            <Link to='/'>
                <h1 className='xl:text-4xl p-3 hover:text-white'>App Name</h1>
            </Link>
            <AuthOptions/>
        </header>
    )
}

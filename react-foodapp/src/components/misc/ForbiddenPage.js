import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'

export default function ForbiddenPage() {
    return (
        <div className='bg-gray-300 w-full h-screen text-center'>
                <div className='py-40 text-gray-600'>
                    <FontAwesomeIcon icon={faGrinBeamSweat} className='text-5xl' />
                    <p className='my-2 font-semibold'>This page is forbidden, please log-in to view this page</p>
                </div>
        </div>
    )
}

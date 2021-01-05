import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDizzy } from '@fortawesome/free-solid-svg-icons'

export default function NoDataPage(props) {

    return (
        <div className='bg-gray-300 w-full h-screen text-center'>
                <div className='py-40 text-gray-600'>
                    <FontAwesomeIcon icon={faDizzy} className='text-5xl' />
                    <p className='my-2 font-semibold'>{props.reason}</p>
                </div>
        </div>
    )
}
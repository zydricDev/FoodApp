import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

export default function ErrorNotice(props) {
    return (
        <div className='px-3 bg-red-t-75 flex items-center gap-3 rounded'>
            <span className='font-medium'>{props.message}</span>
            <button className='hover:text-white p-1 focus:outline-none text-2xl' onClick={props.clearError}>
                <FontAwesomeIcon icon={faWindowClose}/>
            </button>
        </div>
    )
}

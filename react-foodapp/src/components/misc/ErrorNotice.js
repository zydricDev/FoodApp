import React from 'react'

export default function ErrorNotice(props) {
    return (
        <div className='bg-red-t-75'>
            <span className='mx-3'>{props.message}</span>
            <button className='bg-red-t-75 displ hover:text-white p-1 focus:outline-none' onClick={props.clearError}>X</button>
        </div>
    )
}

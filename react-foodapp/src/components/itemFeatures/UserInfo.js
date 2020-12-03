import React from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import domain from '../../domain'

import Loader from '../misc/Loader'
export default function UserInfo(propUrl) {
    let usrId = propUrl.propUrl
    let content = <Loader></Loader>
    const usrInfo = useAxiosGet(`${domain}/users/find/${usrId}`)
    
    if (usrInfo.error) {
        content = <Loader></Loader>
    }

    if(usrInfo.data){
        content = 
        <div className='mt-5 w-full'>
            <div className='px-5 text-3xl font-medium text-white'>
                <p>{usrInfo.data.displayName}</p>
            </div>
            <div className='flex w-full justify-between p-5'>
                <div className='w-3/6'>
                    <p className='text-white'>{usrInfo.data.address}</p>
                    <p className='border-b border-gray-400 py-2 text-white'>{usrInfo.data.zipcode}</p>
                    <p className='border-b border-gray-400 py-2 text-white'>Phone: {usrInfo.data.phone}</p>
                    
                </div>
                <div className='w-5/6 px-5'>
                    <img src={usrInfo.data.icon} alt={usrInfo.data.icon} className='rounded-full h-40 w-40 object-cover'/>
                </div>
            
            </div>
        </div>
    }

    

    return (
        content
    )
}

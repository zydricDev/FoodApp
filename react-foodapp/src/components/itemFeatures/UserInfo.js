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
        <div className='px-10 py-5 w-5/6'>
            <div className='px-5 text-3xl font-medium text-white'>
                <p>{usrInfo.data.displayName}</p>
            </div>
            <div className='flex w-full justify-between p-5 items-center gap-3'>
                <div className='w-3/6'>
                    <p className='text-white break-all'>{usrInfo.data.address}, {usrInfo.data.zipcode}</p>
                    <p className='border-b border-t border-gray-400 py-2 text-white'>
                        Phone: ({usrInfo.data.phone.substring(0,3)})-{usrInfo.data.phone.substring(3,6)}-{usrInfo.data.phone.substring(6,10)}
                    </p>
                </div>
                <div className='w-5/6 px-5'>
                    <img src={usrInfo.data.icon} alt={usrInfo.data.icon} className='h-40 w-40 object-cover'/>
                </div>
            </div>
        </div>
    }

    

    return (
        content
    )
}

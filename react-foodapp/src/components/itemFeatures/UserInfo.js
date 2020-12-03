import React, { useContext } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import domain from '../../domain'
import UserContext from '../../context/UserContext'
import Loader from '../misc/Loader'
export default function UserInfo() {
    let usrId = undefined
    let content = <Loader></Loader>
    const userCred = useContext(UserContext)
    
    
    if(userCred.userData.user){
        usrId = userCred.userData.user.id
    }
    const usrInfo = useAxiosGet(`${domain}/users/find/${usrId}`)
    
    if (usrInfo.error) {
        content = <Loader></Loader>
    }

    if(usrInfo.data){
        content = 
        <div className='mt-5'>
            <div className='px-5 text-3xl font-medium'>
                <p>{usrInfo.data.displayName}</p>
            </div>
            <div className='flex w-full justify-between p-5'>
                <div className='w-3/6 p-5'>
                    <p>{usrInfo.data.address}</p>
                    <p className='border-b border-gray-400 py-2'>{usrInfo.data.zipcode}</p>
                    
                    <p className='border-b border-gray-400 py-2'>{usrInfo.data.phone}</p>
                    
                </div>
                <div className='w-4/6'>
                    <img src={usrInfo.data.icon} alt={usrInfo.data.icon} className='rounded-full h-32 w-32'/>
                </div>
            
            </div>
        </div>
    }

    

    return (
        content
    )
}

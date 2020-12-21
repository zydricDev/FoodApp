import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'
import UserContext from '../../context/UserContext'
import ErrorNotice from '../misc/ErrorNotice'
import domain from '../../domain'

import Cart from '../cartFeatures/Cart'
export default function MyCart() {
    const userCred = useContext(UserContext)
    const [error, setError] = useState()
    const [url, setUrl] = useState()
    let content = undefined
    
    
    useEffect(()=>{
        const load = () =>{
            if(userCred.userData.user){
                setUrl(`${domain}/precheck/display/${userCred.userData.user.id}`)
                
            }
        }
        load()
    },[userCred])
    

    try{
        
        if(userCred.userData.user && url){
            content =
            <div className='w-full'>
                {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
                <div>
                    <Cart userUrl={url}/>
                </div>
            </div>
        }else{
            content = 
            <div className='bg-gray-300 w-full h-screen text-center'>
                <div className='py-40 text-gray-500'>
                    <FontAwesomeIcon icon={faGrinBeamSweat} className='text-5xl' />
                    <p className='my-2'>This page is forbidden, please log-in to view this page</p>
                </div>
            </div>
        }
        
    }
    catch(err){
        err.response.data.msg && setError(err.response.data.msg)
    }

    return (
        content
    )
}

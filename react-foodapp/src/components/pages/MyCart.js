import React, { useState, useContext, useEffect } from 'react'

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
            <div>
                sad
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

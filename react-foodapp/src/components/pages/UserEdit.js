import React, {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import domain from '../../domain'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import ErrorNotice from '../misc/ErrorNotice'
import Axios from 'axios'
import UserContext from '../../context/UserContext'
import Loader from '../misc/Loader'


export default function UserEdit() {
    const userData = useContext(UserContext)
    const history = useHistory()

    const [error, setError] = useState()
    const [userId, setUserId] = useState()
    
    const [displayName, setName] = useState()
    const [icon, setAddress] = useState()
    const [address, setIcon] = useState()
    const [zipcode, setZipcode] = useState()
    const [phone, setPhone] = useState()

    let content = <Loader></Loader>
    let url = undefined
    useEffect(()=>{
        if(userData.userData.user){
            setUserId(userData.userData.user.id)
        }
        
    },[userData])


    if(userId){
        url = `${domain}/users/find/${userId}`
    }
    
    const currentData = useAxiosGet(url)

    const submit = async () =>{
        try{
            const query = {displayName, icon, address, zipcode, phone}
            const newDisplayName = {displayName}          
            await Axios.patch(`${domain}/users/edit/${userId}`, query, {
                headers: { "auth-token": localStorage.getItem('auth-token') }
            })
            await Axios.patch(`${domain}/food/edit/user/${userId}`, newDisplayName, {
                headers: { "auth-token": localStorage.getItem('auth-token') }
            })
            history.push('/home')
            
        }catch(err){
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    if(currentData.error){
        content = <Loader></Loader>
    }
    
    if(currentData.data){
        content = 
        <div>
            {error && ( <ErrorNotice message={error} clearError={() => setError(undefined)}/>)}
            <label>Name</label>
            <input onChange={e=>{setName(e.target.value)}} className='bg-gray-500 p-2'/>

            <label>Address</label>
            <input onChange={e=>{setAddress(e.target.value)}} className='bg-gray-500 p-2'/>

            <label>Icon</label>
            <input onChange={e=>{setIcon(e.target.value)}} className='bg-gray-500 p-2'/>

            <label>Zipcode</label>
            <input onChange={e=>{setZipcode(e.target.value)}} className='bg-gray-500 p-2'/>
            
            <label>Phone</label>
            <input onChange={e=>{setPhone(e.target.value)}} className='bg-gray-500 p-2'/>

            <button onClick={submit}>Hit me</button>
        </div>
    }


    return (
        content
    )
}

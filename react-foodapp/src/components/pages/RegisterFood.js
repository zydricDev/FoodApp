import React, {useState, useContext} from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import ErrorNotice from '../misc/ErrorNotice'


export default function RegisterFood() {
    const [foodName, setFoodName] = useState()
    const [userDisplayName, setUserDisplayName] = useState()
    const [userId, setUserId] = useState()
    const [price, setPrice] = useState()
    const [desc, setDesc] = useState()
    const [image, setImage] = useState()
    const [error, setError] = useState()

    const userCred = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) =>{
        e.preventDefault()
     
        try{
            setUserDisplayName(userCred.userData.user.displayName)
            setUserId(userCred.userData.user.id)
            const newFood = {foodName, userDisplayName, userId, price, desc, image}

            await Axios.post('http://localhost:4000/food/register', newFood, {
                headers:{"auth-token": localStorage.getItem('auth-token')}
            })
            history.push('/')
        }catch(err){
            err.response.data.msg && setError(err.response.data.msg)
        }
    }
    return (
        <div className='flex justify-center p-3'>
            <div className='flex-col'>
                <h2 className='flex p-3 font-bold justify-center xl:text-2xl'>Register Item</h2>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)}/>
                )}
                <form onSubmit={submit}>
                    <div className='flex justify-center'>
                        <div className='flex-col justify-center'>
                            <label>Name:</label>
                            <input className='flex justify-center bg-black-t-50 border-black p-1' type='text' onChange={e => setFoodName(e.target.value)}/>

                            <label>Price:</label>
                            <input className='flex justify-center bg-black-t-50 border-black p-1' type='number' min='0' onChange={e => setPrice(e.target.value)}/>

                            <label>Description:</label>
                            <input className='flex justify-center bg-black-t-50 border-black p-1' type='text' onChange={e => setDesc(e.target.value)}/>

                            <label>Image Link:</label>
                            <input className='flex justify-center bg-black-t-50 border-black p-1' type='text' onChange={e => setImage(e.target.value)}/>

                            <div className='flex justify-center'>
                                <input className='my-5 xl:text-xl hover:bg-black hover:text-white' type='submit' value='Register Item'/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

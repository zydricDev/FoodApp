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
        <div className='flex justify-center mt-10'>
            <div className='flex-col border border-gray-400 w-2/6'>
                
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)}/>
                )}
                <form onSubmit={submit}>
                    <div className='pb-5'>
                        <div className='grid w-2/6 p-5 w-full'>
                            <h2 className='flex font-bold mb-5 xl:text-2xl'>Register Item</h2>
                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Name:</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='text' onChange={e => setFoodName(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Price:</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='number' min='0' onChange={e => setPrice(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Description:</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='text' onChange={e => setDesc(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Image Link:</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='text' onChange={e => setImage(e.target.value)}/>
                            </div>

                            
                            <input className='xl:text-xl hover:bg-blue-700 text-white w-full rounded p-2 bg-blue-600' type='submit' value='Register Item'/>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

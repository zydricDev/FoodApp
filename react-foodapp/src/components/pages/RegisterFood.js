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
    const [category, setCategory] = useState('none')
    const [feature, setFeature] = useState(0)

    const [error, setError] = useState()
    

    const userCred = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault()

        try {
            
            if (userCred.userData.user.displayName && userCred.userData.user.id) {
                setUserDisplayName(userCred.userData.user.displayName)
                setUserId(userCred.userData.user.id)
                const newFood = { foodName, userDisplayName, userId, price, desc, image, category, feature }
                await Axios.post('http://localhost:4000/food/register', newFood, {
                    headers: { "auth-token": localStorage.getItem('auth-token') }
                })
            }

            history.push('/')
        } catch (err) {
            
            err.response.data.msg && setError(err.response.data.msg)
        }
    }
    return (

        <div className='flex justify-center mt-10'>
            <div className='flex-col border border-gray-400 lg:w-2/6 md:w-3/6 w-5/6'>
                
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)}/>
                )}
                <form onSubmit={submit}>
                    <div className='pb-5'>
                        <div className='grid w-2/6 p-5 w-full'>
                            <h2 className='flex font-bold mb-5 xl:text-2xl'>Register Item</h2>
                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Name (required)</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='text' onChange={e => setFoodName(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Price (required)</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='number' min='0' onChange={e => setPrice(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Description</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='text' onChange={e => setDesc(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Image Link</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='text' onChange={e => setImage(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Category (required)</label>
                                <select  className='border-black rounded p-2 border-2 border-gray-400' value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value='none'>uncategorized</option>
                                    <option value='Asian'>Asian</option>
                                    <option value='Salads'>Salads</option>
                                    <option value='Breakfast'>Breakfast</option>
                                    <option value='Vegetarian'>Vegetarian</option>
                                    <option value='Healthy'>Healthy</option>
                                    <option value='Hamburger'>Hamburger</option>
                                    <option value='Ice Cream'>Ice Cream</option>
                                    <option value='Bakery'>Bakery</option>
                                    <option value='American'>American</option>
                                    <option value='Japanese'>Japanese</option>
                                    <option value='Lunch'>Lunch</option>
                                    <option value='Deserts'>Deserts</option>
                                    
                                    
                                </select >
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Featured</label>
                                <select  className='border-black rounded p-2 border-2 border-gray-400' value={feature} onChange={e => setFeature(e.target.value)}>
                                    <option value='0'>False</option>
                                    <option value='1'>True</option>
                                </select >
                            </div>
                            
                            <input className='xl:text-xl hover:bg-blue-700 text-white w-full rounded p-2 bg-blue-600' type='submit' value='Register Item'/>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

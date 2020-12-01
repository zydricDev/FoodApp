import React, {useState, useContext} from 'react'
import Axios from 'axios'
import {useHistory, Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import ErrorNotice from '../misc/ErrorNotice'
import domain from '../../domain'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const {setUserData} = useContext(UserContext)
    const history = useHistory()

    
    const submit = async (e) =>{
        e.preventDefault()
        try{
            const loginUser = {email, password}
            const loginRes = await Axios.post(`${domain}/users/login`, loginUser)
    
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            })
    
            localStorage.setItem('auth-token', loginRes.data.token)
            history.push('/')
        }catch(err){
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    }
    return (
        <div>
            <div className='flex justify-center my-10'>
                {error && (
                            <ErrorNotice message={error} clearError={() => setError(undefined)}/>
                )}
            </div>
            <form onSubmit={submit}>
                
                <div className='flex justify-center py-10'>
                    <div className='grid border-2 w-2/6 p-5'>
                        <h2 className='flex justify-center font-bold xl:text-2xl mb-10'>Sign in with your FoodApp account</h2>
                        <div className='mb-5 grid'>
                            <label className='text-gray-500'>Email</label>
                            <input className='border-black rounded p-2 border-2 border-gray-400' type='email' onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='mb-5 grid'>
                            <label className='text-gray-500'>Password</label>
                            <input className='border-black rounded p-2 border-2 border-gray-400' type='password' onChange={e => setPassword(e.target.value)} />
                        </div>

                        <input className='xl:text-xl hover:bg-red-700 text-white w-full rounded p-2 bg-red-600' type='submit' value='Login' />
                        <div className='flex justify-center'>
                            <Link to='/register'>
                                <p className='hover:text-blue-700 text-blue-600 text-center mt-10'>Create your account</p>
                            </Link>
                        </div>
                    </div>

                </div>
                
            </form>

        </div>
    )
}

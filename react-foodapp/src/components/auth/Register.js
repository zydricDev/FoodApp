import React, {useState, useContext} from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import ErrorNotice from '../misc/ErrorNotice'
import domain from '../../domain'

export default function Register() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [displayName, setDisplayName] = useState()
    const [error, setError] = useState()

    //the first variables have to be the same name as the model in the database

    const {setUserData} = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) =>{
        e.preventDefault()
        try{
            const newUser = {email, password, passwordCheck, displayName}
            
            await Axios.post(`${domain}/users/register`, newUser)

            const loginRes = await Axios.post(`${domain}/users/login`,{
                email, password
            })

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
        <div className='flex justify-center mt-10'>
            <div className='flex-col border border-gray-400 w-2/6'>
                <div className='flex justify-center mt-2'>
                    {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)}/>
                    )}
                </div>
                <form onSubmit={submit}>
                    <div className='pb-5'>
                        
                        <div className='grid w-2/6 p-5 w-full'>
                            <h2 className='flex font-bold mb-5 xl:text-2xl'>Create your account</h2>
                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Email</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='email' onChange={e => setEmail(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Password (5 character minimum)</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='password' onChange={e => setPassword(e.target.value)}/>
                                <input className='border-black rounded p-2 border-2 border-gray-400 mt-1' type='password' placeholder='verify password' onChange={e => setPasswordCheck(e.target.value)}/>
                            </div>
                            
                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Display Name</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='text' onChange={e => setDisplayName(e.target.value)}/>
                            </div>
                            <input className='xl:text-xl hover:bg-blue-700 text-white w-full rounded p-2 bg-blue-600 cursor-pointer' type='submit' value='Register'/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

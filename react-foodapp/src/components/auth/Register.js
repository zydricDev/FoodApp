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
    const [icon, setIcon] = useState()
    const [address, setAddress] = useState()
    const [zipcode, setZipcode] = useState()
    const [phone, setPhone] = useState()
    const [country, setCountry] = useState()
    const [error, setError] = useState()

    

    const {setUserData} = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) =>{
        e.preventDefault()
        try{
            const newUser = {email, password, passwordCheck, displayName, icon, address, zipcode, phone, country}
            
            await Axios.post(`${domain}/users/register`, newUser)

            const loginRes = await Axios.post(`${domain}/users/login`,{
                email, password
            })

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            })

            localStorage.setItem('zdevsite.usrtkn', loginRes.data.token)
            
            history.push('/home')
        }catch(err){
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
        <div className='flex justify-center mt-5 p-5'>
            <div className='flex-col border border-gray-400 md:w-2/6 w-full'>
                <div className='flex justify-center mt-2'>
                    {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)}/>
                    )}
                </div>
                <form onSubmit={submit}>
                    <div className='pb-5'>
                        
                        <div className='p-5 w-full'>
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
                                <label className='text-gray-500'>Display Name (optional)</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='text' onChange={e => setDisplayName(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Icon url (optional)</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='text' onChange={e => setIcon(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Address</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='text' onChange={e => setAddress(e.target.value)}/>
                            </div>
                            

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Zip Code (5-digits)</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='number' onChange={e => setZipcode(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Country Postal Abbreviation (3-letters, eg. JPN - Japan)</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='text' onChange={e => setCountry(e.target.value)}/>
                            </div>

                            <div className='mb-5 grid'>
                                <label className='text-gray-500'>Phone number (optional)</label>
                                <input className='border-black rounded p-2 border-2 border-gray-400' type='number' onChange={e => setPhone(e.target.value)}/>
                            </div>
                            <input className='xl:text-xl hover:bg-blue-700 text-white w-full rounded p-2 bg-blue-600 cursor-pointer' type='submit' value='Register'/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

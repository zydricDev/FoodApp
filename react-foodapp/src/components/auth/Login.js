import React, {useState, useContext} from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
import UserContext from '../../context/UserContext'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const {setUserData} = useContext(UserContext)
    const history = useHistory()

    
    const submit = async (e) =>{
        e.preventDefault()
        const loginUser = {email, password}
        const loginRes = await Axios.post('http://localhost:4000/users/login', loginUser)

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        })

        localStorage.setItem('auth-token', loginRes.data.token)
        history.push('/')
    }
    return (
        <div>
            <h2 className='flex p-3 font-bold justify-center xl:text-2xl'>LOGIN</h2>
            <form onSubmit={submit}>
                <div className='flex justify-center'>
                    <div className='flex-col justify-center'>
                        <label className=''>Email:</label>
                        <input className='flex justify-center bg-black-t-50 border-black p-1' type='email' onChange={e => setEmail(e.target.value)}/>

                        <label className=''>Password:</label>
                        <input className='flex justify-center bg-black-t-50 border-black p-1' type='password' onChange={e => setPassword(e.target.value)}/>
                        <div className='flex justify-center'>
                            <input className='my-5 xl:text-xl hover:bg-black hover:text-white' type='submit' value='Login'/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

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
            <h2>Login</h2>
            <form onSubmit={submit}>
                <label>Email</label>
                <input id='login-email' type='email' onChange={e => setEmail(e.target.value)}/>

                <label>Password</label>
                <input id='login-password' type='password' onChange={e => setPassword(e.target.value)}/>
                
                
                <input type='submit' value='Login'/>
            </form>
        </div>
    )
}

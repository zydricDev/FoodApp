import React, {useState, useContext} from 'react'
import Axios from 'axios'
import {useHistory} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import ErrorNotice from '../misc/ErrorNotice'

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
            
            await Axios.post('http://localhost:4000/users/register', newUser)

            const loginRes = await Axios.post('http://localhost:4000/users/login',{
                email, password
            })

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            })

            localStorage.setItem('auth-token', loginRes.data.token)
            //return you to the home page
            history.push('/')
        }catch(err){
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
        <div>
            <h2>Register</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)}/>
            )}
            <form onSubmit={submit}>
                <label>Email</label>
                <input id='register-email' type='email' onChange={e => setEmail(e.target.value)}/>

                <label>Password</label>
                <input id='register-password' type='password' onChange={e => setPassword(e.target.value)}/>
                <input type='password' placeholder='verify password' onChange={e => setPasswordCheck(e.target.value)}/>

                <label>Display Name</label>
                <input id='register-display-name' type='text' onChange={e => setDisplayName(e.target.value)}/>

                
                <input type='submit' value='Register'/>
            </form>
        </div>
    )
}

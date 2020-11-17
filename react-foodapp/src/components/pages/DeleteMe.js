import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Axios from 'axios'

export default function DeleteMe() {

    const userCred = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) =>{
        e.preventDefault()
        try{
            await Axios.delete('http://localhost:4000/users/delete', {
                data:{id: userCred.userData.user.id}, 
                headers:{"auth-token": localStorage.getItem('auth-token')}
            })
            history.push('/')
        }catch(err){
            console.log('Error has occured while deleting user')
        }
    }


    return (
        <div>
            <button onClick={submit}>END ME</button>
        </div>
    )
}

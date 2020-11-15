import React, {useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../../context/UserContext'

export default function Home() {
    const {userData} = useContext(UserContext)
    const history = useHistory()
    //if the user is not logged in, its redirected to the login page
    useEffect(()=>{
        if(!userData.user) history.push('/login');

    })

    return (
        <div>
            Home
        </div>
    )
}

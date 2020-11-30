import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route} from "react-router-dom"
import Axios from 'axios'

import Mainhub from './components/pages/Mainhub'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/layout/Header'
import UserContext from './context/UserContext'
import FoodItem from './components/pages/FoodItem'
import RegisterFood from './components/pages/RegisterFood'
import DeleteMe from './components/pages/DeleteMe'
import MyStore from './components/pages/MyStore'
import Landing from './components/pages/Landing'

import domain from './domain'




export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    })

    useEffect(() => {

        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token')
            if (token === null) {
                localStorage.setItem('auth-token', '')
                token = ''
            }

            const tokenRes = await Axios.post(
                `http://${domain}/users/tokenIsValid`,
                null,
                { headers: { 'auth-token': token } }
            )

            if (tokenRes.data) {
                const userRes = await Axios.get(`http://${domain}/users/`, {
                    headers: { 'auth-token': token },
                })
                setUserData({
                    token,
                    user: userRes.data,
                })
            }
        }
        checkLoggedIn();
    }, [])

    

    return <>
        <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }}>
                <Header />
                <Switch>
                    
                    <Route path='/landing' component={Landing} />
                    <Route exact path='/' component={Mainhub} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/food/register' component={RegisterFood} />
                    <Route path='/food/myStore' component={MyStore} />
                    <Route path='/food/:id' component={FoodItem} />
                    <Route path='/user/delete' component={DeleteMe} />
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    </>
}

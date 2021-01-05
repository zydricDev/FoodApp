import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route} from "react-router-dom"
import Axios from 'axios'
import domain from './domain'

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
import UserEdit from './components/pages/UserEdit'
import NearMeMap from './components/pages/NearMeMap'
import MyCart from './components/pages/MyCart'
import Footer from './components/layout/Footer'




export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    })

    useEffect(() => {

        const checkLoggedIn = async () => {
            let token = localStorage.getItem('zdevsite.usrtkn')
            if (token === null) {
                localStorage.setItem('zdevsite.usrtkn', '')
                token = ''
            }

            const tokenRes = await Axios.post(
                `${domain}/users/tokenIsValid`,
                null,
                { headers: { 'zdevsite.usrtkn': token } }
            )

            if (tokenRes.data) {
                const userRes = await Axios.get(`${domain}/users/`, {
                    headers: { 'zdevsite.usrtkn': token },
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
                    <Route exact path='/' component={Landing} />
                    <Route path='/home' component={Mainhub} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/food/register' component={RegisterFood} />
                    <Route path='/food/myStore' component={MyStore} />
                    <Route path='/food/:id' component={FoodItem} />
                    <Route path='/user/cart' component={MyCart} />
                    <Route path='/user/delete' component={DeleteMe} />
                    <Route path='/user/edit' component={UserEdit} />
                    <Route path='/map' component={NearMeMap} />
                </Switch>
                <Footer />
            </UserContext.Provider>
        </BrowserRouter>
        
    </>
}

import React , {useContext} from 'react'
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';



export default function AuthOptions() {
    const {userData, setUserData} = useContext(UserContext)

    const history = useHistory();
    const register = () => history.push('/register')
    const login = () => history.push('/login')
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
    }
    return (
        <nav className='flex'>
            {
                //if userData.user true, log out else use the other buttons
                userData.user ? (
                    <div className='p-3 bg-red-t-50 flex'>
                        <button className='inline-block mx-3 hover:text-white' onClick={logout}>Log out</button>
                    </div>
                ) : (
                    <div className='p-3 bg-red-t-50 flex'> 
                        <button className='inline-block mx-3 hover:text-white focus:outline-none' onClick={register}>Register</button>
                        <button className='inline-block mx-3 hover:text-white focus:outline-none' onClick={login}>Login</button>
                    </div>
                )
            }
            
        </nav>
    )
}

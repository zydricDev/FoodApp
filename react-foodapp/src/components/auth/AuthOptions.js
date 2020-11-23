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
                    <div className='flex justify-center'>
                        <button className='inline-block mx-3 hover:text-white focus:outline-none' onClick={logout}>
                            <p className='px-5 border border-gray-500 rounded p-2 font-bold text-blue-400 hover:border-blue-500'>Log Out</p>
                        </button>
                    </div>
                ) : (
                    <div className='flex justify-center'> 
                        <button className='inline-block mx-3 hover:text-white focus:outline-none' onClick={login}>
                            <p className='px-5 border border-gray-500 rounded p-2 font-bold text-blue-400 hover:border-blue-500'>Sign in</p>
                        </button>
                    </div>
                )
            }
            
        </nav>
    )
}

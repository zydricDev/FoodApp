import React, { useContext } from 'react'
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom'

export default function HeaderOptions() {
    const {userData, setUserData} = useContext(UserContext)
    const history = useHistory();

    const foodRegister = () => history.push('/food/register')
    const myStore = () => history.push('/food/myStore')
    const editUsr = () => history.push('/user/edit')
    const mapNearby = () => history.push('/map')
    const logout = () => {
        
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('zdevsite.usrtkn', '')
        
    }
    
    return (
        <>
            <p className='text-3xl font-bold text-red-500 p-5'>Food app</p>
            
            {userData.user &&  
                <>
                    <button className='text-left border-b border-gray-300 w-full bg-white py-2 hover:bg-blue-300 duration-200 text-xl' onClick={mapNearby}>
                        <p className='ml-5'>Stores Nearby</p>
                    </button>

                    <button className='text-left border-b border-gray-300 w-full bg-white py-2 hover:bg-blue-300 duration-200 text-xl' onClick={myStore}>
                        <p className='ml-5'>My Shop</p>
                    </button>

                    <button className='text-left border-b border-gray-300 w-full bg-white py-2 hover:bg-blue-300 duration-200 text-xl' onClick={foodRegister}>
                        <p className='ml-5'>Add Food</p>
                    </button>
                
                    <button className='text-left border-b border-gray-300 w-full bg-white py-2 hover:bg-blue-300 duration-200 text-xl' onClick={editUsr}>
                        <p className='ml-5'>My Account</p>
                    </button>
                </>
            }
            
            {
                userData.user ?
                    <button onClick={logout}
                        className='text-left border-b border-gray-300 w-full bg-white py-2 hover:bg-blue-300 duration-200 text-xl'>
                        <p className='ml-5'>Logout</p>
                    </button>
                    :
                    <button onClick={() => history.push('/login')}
                        className='text-left border-b border-gray-300 w-full bg-white py-2 hover:bg-blue-300 duration-200 text-xl'>
                        <p className='ml-5'>Sign in</p>
                    </button>
            }
        </>
    )
}

import React , {useContext} from 'react'
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';


export default function LoggedInOptions() {
    const {userData, setUserData} = useContext(UserContext)
    const history = useHistory();
    
    const foodRegister = () => history.push('/food/register')
    const myStore = () => history.push('/food/myStore')
    
    return (
        <nav className='flex'>
            {
                userData.user ? (
                    <>
                        <div className='p-3 flex border-l border-black'>
                            <button className='inline-block mx-3 hover:text-white focus:outline-none' onClick={foodRegister}>Add Food</button>
                        </div>
                        <div className='p-3 flex border-l border-black'>
                            <button className='inline-block mx-3 hover:text-white focus:outline-none' onClick={myStore}>View Shop</button>
                        </div>
                    </>
                    
                ) : (
                    <div className='p-3 flex border-l border-black'> 
                        <button className='inline-block mx-3 hover:text-white focus:outline-none'>Does something</button>
                    </div>
                )
            }
            
        </nav>
    )
}

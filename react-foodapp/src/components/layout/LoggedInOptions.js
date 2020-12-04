import React , {useContext} from 'react'
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';


export default function LoggedInOptions() {
    const {userData} = useContext(UserContext)
    const history = useHistory();
    
    const foodRegister = () => history.push('/food/register')
    const myStore = () => history.push('/food/myStore')
    const editUsr = () => history.push('/user/edit')
    return (
        <nav className='flex w-full invisible md:visible'>
            {
                userData.user ? (
                    <div className='flex w-full justify-between'>
                        <div className='flex w-4/6'>
                            <div className='flex'>
                                <button className='inline-block mx-3 hover:text-white focus:outline-none' onClick={myStore}>
                                    <p className='px-5 rounded p-2 font-bold text-blue-400 hover:text-blue-500'>My Shop</p>    
                                </button>
                            </div>
                            <div className='flex'>
                                <button className='hover:text-white focus:outline-none' onClick={foodRegister}>
                                    <p className='px-5 rounded p-2 font-bold text-blue-400 hover:text-blue-500'>Add Food</p>
                                </button>
                            </div>
                        </div>
                        <div className='flex'>
                            <button className='inline-block mx-3 hover:text-white focus:outline-none' onClick={editUsr}>
                                <p className='px-5 rounded p-2 font-bold text-blue-400 hover:text-blue-500'>My Account</p>    
                            </button>
                        </div>
                    </div>
                    
                ) : (
                    null
                )
            }
            
        </nav>
    )
}

import React , {useContext} from 'react'
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

export default function LoggedInOptions() {
    const {userData} = useContext(UserContext)
    const history = useHistory();
    
    const foodRegister = () => history.push('/food/register')
    const myStore = () => history.push('/food/myStore')
    const editUsr = () => history.push('/user/edit')
    const mapNearby = () => history.push('/map')
    const myCart = () => history.push('/user/cart')
    return (
        <nav className='flex w-full invisible md:visible'>
            {
                userData.user ? (
                    <div className='flex w-full justify-between'>
                        <div className='flex w-4/6'>

                            <div className='flex'>
                                <button className='hover:text-white focus:outline-none' onClick={mapNearby}>
                                    <p className='px-5 rounded p-2 font-bold text-blue-400 hover:text-blue-500'>Shops Nearby</p>
                                </button>
                            </div>
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
                            <button className='inline-block mx-3 text-blue-500 hover:text-blue-600 focus:outline-none' onClick={myCart}>
                                <FontAwesomeIcon icon={faShoppingBag} className='text-2xl' />    
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

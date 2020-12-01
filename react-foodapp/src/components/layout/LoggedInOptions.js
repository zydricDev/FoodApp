import React , {useContext} from 'react'
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';


export default function LoggedInOptions() {
    const {userData} = useContext(UserContext)
    const history = useHistory();
    
    const foodRegister = () => history.push('/food/register')
    const myStore = () => history.push('/food/myStore')
    
    return (
        <nav className='flex ml-20 invisible md:visible'>
            {
                userData.user ? (
                    <>
                        <div className='flex ml-10'>
                            <button className='hover:text-white focus:outline-none' onClick={foodRegister}>
                                <p className='px-5 rounded p-2 font-bold text-blue-400 hover:text-blue-500'>Add Food</p>
                            </button>
                        </div>
                        <div className='flex ml-10'>
                            <button className='inline-block mx-3 hover:text-white focus:outline-none' onClick={myStore}>
                                <p className='px-5 rounded p-2 font-bold text-blue-400 hover:text-blue-500'>View My Shop</p>    
                            </button>
                        </div>
                    </>
                    
                ) : (
                    <div className='flex ml-10'> 
                        <button className='inline-block mx-3 hover:text-white focus:outline-none'>
                            <p className='px-5 rounded p-2 font-bold text-blue-400 hover:text-blue-500'>Does Something</p>    
                        </button>
                    </div>
                )
            }
            
        </nav>
    )
}

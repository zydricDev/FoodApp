import React, {useState, useContext, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import UserContext from '../../context/UserContext'


export default function Landing() {
    const history = useHistory()
    const userData = useContext(UserContext)
    const [search, setSearch] = useState()
    const [route, setRoute] = useState('/login')
    useEffect(() => {
        if(userData.userData.user){
            setRoute('/home')
        }
    }, [userData])

    const submit = (item) =>{
        history.push({ 
            pathname: '/home',
            state: item
        });
    }
    return (
        <div>
            <div className='lg:flex'>

                <div className='h-64 lg:w-full lg:h-full'>
                    <img className='object-cover w-full h-full' 
                    src='https://images.unsplash.com/photo-1546456674-7ce72b9286b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80' 
                    alt='美味しい料理'
                    />
                </div>

                <div className='flex justify-center w-full'>
                    <div className='flex-col text-blue-500'>
                        <div className='flex justify-end'>
                            <div className='flex px-10 pt-10 sm:pb-40 pb-10 font-bold text-2xl'>
                                <p>Get Perks</p>
                                <Link to={route}>
                                    <p className='ml-5 hover:text-blue-900'>Sign in</p>
                                </Link>
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='flex box-border'>
                                <div className='flex text-3xl sm:text-6xl font-bold sm:px-10'>
                                    <p>Order food delivery you’ll love</p>
                                </div>
                            </div>
                        </div>

                        <div className='md:flex sm:p-10 p-5 justify-center'>
                            
                            <input className='w-full sm:mb-3 md:mb-0 md:w-5/6 focus:outline-none p-3 mb-3 border-2 border-gray-500 rounded' 
                                placeholder='Enter Food or Shop' 
                                type='search'
                                onChange={e => setSearch(e.target.value)} 
                            />

                            <button className='w-full md:w-1/6 md:ml-5 text-center p-3 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold focus:outline-none' onClick={()=>submit(search)}>Search</button>

                        </div>

                    </div>
                </div>

            </div>
            <div className='md:flex w-full justify-evenly p-20'>
                
                <div className='md: mt-10 md:ml-20 xl:flex-col xl:p-3 xl:w-2/6 xl:ml-20'>
                    <div className='flex justify-center'>
                    <img className='h-20 flex' src='https://www.pinclipart.com/picdir/big/122-1228000_cafe-restaurant-cartoon-color-transprent-cafe-cartoon-png.png' alt='美味しい料理'/>
                    </div>
                    
                    <div className='text-center'>
                        <p className='text-xl font-medium flex justify-center p-1'>Local favorites</p>
                        <p>Satisfy any craving with delivery from popular neighborhood restaurants and chains. Reorder go-tos or find something new.</p>
                    </div>
                </div>

                <div className='md: mt-10 md:ml-20 xl:flex-col xl:p-3 xl:w-2/6 xl:ml-20'>
                    <div className='flex justify-center'>
                    <img className='h-20 flex' src='https://www.pinclipart.com/picdir/big/12-120965_clip-art-transparent-stock-bitcoin-transparent-double-bitcoin.png' alt='美味しい料理'/>
                    </div>
                    
                    <div className='text-center'>
                        <p className='text-xl font-medium flex justify-center p-1'>Support restaurants and others in need</p>
                        <p>Donate your change to World Central Kitchen at checkout to help support independent restaurants that are providing meals to those in need.</p>
                    </div>
                </div>
                
                <div className='md: mt-10 md:ml-20 xl:flex-col xl:p-3 xl:w-2/6 xl:ml-20'>
                    <div className='flex justify-center'>
                    <img className='h-20 flex' src='https://www.pinclipart.com/picdir/big/52-522921_gorgeous-yellow-citrine-diamond-halo-dangle-earrings-diamonds.png' alt='美味しい料理'/>
                    </div>
                    
                    <div className='text-center'>
                        <p className='text-xl font-medium flex justify-center p-1'>Exclusive Perks</p>
                        <p>Discover more deals and restaurant rewards near you. Cash in on Perks and get $100s in savings.</p>
                    </div>
                </div>
            </div>

            <div className='flex'>
                <div className='xl:flex p-20 w-full'>
                    <div className='self-center'>
                        <p className='font-bold sm:text-center md:text-3xl text-2xl'>Pickup or delivery from restaurants near you</p>
                        <p className='sm:text-center xl:px-40'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna neque viverra justo nec ultrices dui. Convallis aenean et tortor at. Sapien pellentesque habitant morbi tristique senectus et netus et. Odio eu feugiat pretium nibh ipsum consequat.</p>
                    </div>
                    <div className='flex mt-5 sm:mt-0 w-full'>
                        <img className='object-fill md: pt-10' src='https://images.unsplash.com/photo-1592834236858-2a3c9ecf004f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80' alt='美味しい料理'/>
                    </div>
                </div>
            </div>
        
            <div className='md:flex p-5 bg-blue-500 text-white'>
                <p className='w-full font-bold md:text-center md:text-3xl text-2xl self-center mb-5 sm:mb-0'>About Food App</p>
                <p className='w-full xl:px-20'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna neque viverra justo nec ultrices dui. Convallis aenean et tortor at. Sapien pellentesque habitant morbi tristique senectus et netus et. Odio eu feugiat pretium nibh ipsum consequat. At imperdiet dui accumsan sit. Amet mattis vulputate enim nulla aliquet. Aliquet enim tortor at auctor. Tellus at urna condimentum mattis pellentesque. Non tellus orci ac auctor augue mauris augue neque. Pulvinar pellentesque habitant morbi tristique senectus et netus. Aliquam id diam maecenas ultricies mi eget mauris pharetra et. Eros in cursus turpis massa tincidunt dui ut ornare lectus.</p>
            </div>
        </div>
    )
}

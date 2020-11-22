import React from 'react'

export default function Landing() {
    return (
        <div>
            <div className='flex'>

                <div className='flex w-full'>
                    <img className='object-fill' src='https://images.unsplash.com/photo-1546456674-7ce72b9286b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80' alt='Oiishi Riyouri'></img>
                </div>

                <div className='flex justify-center w-full'>
                    <div className='flex-col'>
                        <div className='flex justify-end'>
                            <div className='flex px-10 pt-10 pb-40 font-bold text-2xl'>
                                <p>Get Perks</p>
                                <p className='ml-5'>Sign in</p>
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='flex box-border'>
                                <div className='flex text-6xl font-bold px-10'>
                                    <p>Order food delivery you’ll love</p>
                                </div> 
                            </div>
                        </div>

                        <div className='flex p-10 justify-center'>
                            <input className='w-5/6 p-3 border-2 border-gray-500 rounded' placeholder='Enter street address or zip code'/>
                            <p className='text-center w-1/6 ml-5 p-3 bg-indigo-500 rounded text-white font-bold'>Find Food</p>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

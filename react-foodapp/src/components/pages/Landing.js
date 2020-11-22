import React from 'react'

export default function Landing() {
    return (
        <div>
            <div className='lg:flex'>

                <div className='flex w-full'>
                    <img className='xl:object-fill' src='https://images.unsplash.com/photo-1546456674-7ce72b9286b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80' alt='美味しい料理'/>
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

                        <div className='md:flex p-10 justify-center'>
                            <input className='sm:mb-3 md:mb-0 md:w-5/6 w-full p-3 mb-3 border-2 border-gray-500 rounded' placeholder='Enter street address or zip code'/>
                            <p className='md:w-1/6 md:ml-5 text-center p-3 bg-indigo-500 rounded text-white font-bold'>Find Food</p>
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
                        <p className='sm:text-center xl:px-40'>Explore restaurants that deliver near you, or try yummy takeout fare. With a place for every taste, it’s easy to find food you crave, and order online or through the Grubhub app. Find great meals fast with lots of local menus. Enjoy eating the convenient way with places that deliver to your door.</p>
                    </div>
                    <div className='flex mt-5 sm:mt-0 w-full'>
                        <img className='object-fill md: pt-10' src='https://images.unsplash.com/photo-1592834236858-2a3c9ecf004f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80' alt='美味しい料理'/>
                    </div>
                </div>
            </div>
        
            <div className='md:flex p-5 bg-blue-500'>
                <p className='w-full font-bold md:text-center md:text-3xl text-2xl self-center'>About Grubhub</p>
                <p className='w-full xl:px-20'>Grubhub helps you find and order food from wherever you are. How it works: you type in an address, we tell you the restaurants that deliver to that locale as well as showing you droves of pickup restaurants near you. Want to be more specific? Search by cuisine, restaurant name or menu item. We'll filter your results accordingly. When you find what you're looking for, you can place your order online or by phone, free of charge. Oh, and we also give you access to reviews, coupons, special deals and a 24/7 customer care team that tracks each order and makes sure you get exactly what you want.</p>
            </div>
        </div>
    )
}

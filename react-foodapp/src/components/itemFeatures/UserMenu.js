import React, { useState, useEffect } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'


export default function UserMenu(ownerId) {
    const owner = ownerId.propUrl
    const [url, setUrl] = useState()
    
    let content = undefined

    useEffect(() => {
        setUrl(`http://localhost:4000/food/display/${owner}?page=1&limit=9`)
    }, [url, owner])

    const userMenus = useAxiosGet(url)

    if(userMenus.error){
        content = <p>There was an error</p>
    }

    if(userMenus.data){
        
        content = 
            <div>
                <div className='mt-5'>
                    <div className='grid grid-cols-2 p-5 gap-5'>
                        {userMenus.data.result.map((item, index) => 
                            <div key={index} className='border flex justify-between relative transition duration-500 hover:shadow-md hover:border-gray-500 rounded'>
                                <div className='w-full p-2'>
                                    <p className='font-bold'>{item.foodName}</p>
                                    <p className='text-gray-700 mt-3'>{item.desc}</p>
                                    
                                </div>
                                <p className='absolute right-0 mr-2 mt-2 bg-gray-t-90 py-2 px-4 rounded font-bold'>${item.price}</p>
                                <img className='object-cover w-40 h-40' src={item.image} alt={item.foodName}/>
                            </div>
                        )} 
                    </div>
                </div>
            </div>
    }
    



    return (
        <div>
            {content}
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'


export default function UserMenu(ownerId) {
    const owner = ownerId.propUrl
    const [url, setUrl] = useState()
    //const [limit, setLimit] = useState(10)
    let content = undefined
    /*
    window.onscroll = function() {
        if(((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && userMenus.data) {
            console.log(userMenus.data.size.size, limit+10)
            if(userMenus.data.size.size > limit){
                setLimit(limit+10)
                
            }
        }
    };
    */
    useEffect(() => {
        setUrl(`http://localhost:4000/food/display/user/${owner}`)
        //window.removeEventListener('scroll', () => {})
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
                        {userMenus.data.map((item, index) => 
                            <div key={index} className='border flex justify-between relative transition duration-500 hover:shadow-md hover:border-gray-500 rounded'>
                                <div className='p-2'>
                                    <div className='inline-flex gap-3'>
                                        <p className='font-bold'>{item.foodName}</p>
                                        {item.feature && <p className='text-gray-700 bg-gray-300 rounded px-2 py-1'>Featured</p>}
                                    </div>
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

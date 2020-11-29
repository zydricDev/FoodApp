import React, { useState, useEffect } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'

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
    const categoryList = useAxiosGet('http://localhost:4000/category/display')

    if (userMenus.error) {
        content = <p>There was an error</p>
    }

    if (userMenus.data && categoryList.data) {

        content =
            <div>
                <div className='mt-5'>
                    <div className='inline-flex items-center'>
                        <p className='text-2xl font-bold pl-5'>Top Menus</p>
                        <FontAwesomeIcon icon={faMedal} className='text-2xl text-yellow-500 ml-2' />
                    </div>
                    
                    <div className='grid grid-cols-2 p-5 gap-5'>
                    {userMenus.data
                        .filter(item => item.feature)
                        .map((item, index) =>
                            <div key={index} className='border flex justify-between relative transition duration-500 hover:shadow-md hover:border-gray-500 rounded relative'>
                                <div className='p-2 absolute bottom-0'>
                                    <div className='bg-gray-t-90 px-2 my-1 rounded'>
                                        <p className='font-bold'>{item.foodName}</p>
                                        <p className='font-bold'>${item.price}</p>
                                    </div>
                                    
                                </div>
                                
                                <img className='object-cover w-full h-40' src={item.image} alt={item.foodName} />
                            </div>
                        )}
                    </div>

                    {categoryList.data.map((menuType, listIndex) =>
                        <div key={listIndex}>
                            {userMenus.data.find(item => item.category === menuType.newCategoryType) ? (
                                <>
                                    <p className='text-2xl font-bold px-5'>{menuType.newCategoryType}</p>
                                    <div className='grid grid-cols-2 p-5 gap-5'>
                                        {userMenus.data
                                            .filter(item => item.category === menuType.newCategoryType)
                                            .map((item, index) =>
                                                <div key={index} className='border flex justify-between relative transition duration-500 hover:shadow-md hover:border-gray-500 rounded'>
                                                    <div className='p-2'>
                                                        <div className='inline-flex gap-3 items-center'>
                                                            <p className='font-bold'>{item.foodName}</p>

                                                            {item.feature && <FontAwesomeIcon icon={faMedal} className='text-md text-yellow-500' />}
                                                        </div>
                                                        <p className='text-gray-700 mt-3'>{item.desc}</p>
                                                    </div>
                                                    {item.feature ? (<p className='absolute right-0 mr-2 mt-2 bg-gray-t-90 py-2 px-4 rounded font-bold'>${item.price}</p>) : (<p className='right-0 mr-2 mt-2 rounded font-bold'>${item.price}</p>)}
                                                    {item.feature && <img className='object-cover w-40 h-40' src={item.image} alt={item.foodName} />}
                                                </div>
                                            )}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
    }




    return (
        <div>
            {content}
        </div>
    )
}

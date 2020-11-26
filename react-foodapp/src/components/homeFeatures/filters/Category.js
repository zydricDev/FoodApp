import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useAxiosGet } from '../../../Hooks/HttpRequest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight, faTimes, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import Items from '../../homeFeatures/Items'
export default function Category() {
    const [position, setPosition] = useState(0)
    const [itemCategory, setCategory] = useState('null')
    const [featured, setFeatured] = useState(false)
    const [url, setUrl] = useState(`http://localhost:4000/food/display/${itemCategory}/${featured}`)
    const [activeFeature, setActiveFeature] = useState(false)


    const sliderList = useAxiosGet('http://localhost:4000/category/display')
    let menu = undefined
    let content = undefined
    useEffect(() => {
        if (itemCategory) {
            setUrl(`http://localhost:4000/food/display/${itemCategory}/${featured}`)
        }

    }, [url, itemCategory, featured])


    if (sliderList.error) {
        content = <p>There was an error</p>
    }

    const moveRight = () => {
        setPosition(position + 100)
    }
    const moveLeft = () => {
        setPosition(position - 100)
    }

    const clearAll = () =>{
        filterFunction('null')
        setFeatured(false) 
    }

    const filterFunction = (filterCategory) => {

        if (!filterCategory || (filterCategory === itemCategory)) {
            setCategory('null')
        } else {
            setCategory(filterCategory)
        }


    }

    const props = useSpring({
        to: async (next, cancel) => {
            await next({ transform: `translateX(${position}%)` })
        },
        from: { transform: `translateX(0%)` }
    })

    try {
        if (sliderList.data) {

            menu =
                <animated.div style={props}>
                    <div className='w-full'>
                        <div>
                            {sliderList.data.map((menuType, index) =>
                                <div key={index} className='ml-3 text-center inline-block'>
                                    <button onClick={() => { filterFunction(menuType.newCategoryType) }} className='relative'>
                                        {menuType.newCategoryType === itemCategory && (
                                            <div className='absolute top-0 right-0 h-8 w-8 z-10 rounded-full bg-blue-500 hover:bg-blue-600'>
                                                <FontAwesomeIcon icon={faTimes} className='text-lg my-2 text-white' />
                                            </div>
                                        )}

                                        <img src={menuType.img} alt={menuType.newCategoryType} className='rounded-full w-40 h-40 object-cover opacity-50 hover:opacity-100' />
                                        {menuType.newCategoryType !== itemCategory ? <p>{menuType.newCategoryType}</p> : <p className='font-bold'>{menuType.newCategoryType}</p>}
                                    </button>
                                </div>

                            )}

                        </div>


                    </div>
                </animated.div>
        }

    } catch (err) {
        console.log('An error has occurred')
    }

    content =
        <>
            <div className='flex w-2/6 border-r'>
                <div className='flex-col w-full'>
                    <div className='flex p-5 align-baseline'>
                        <p className='font-bold text-2xl'>Filters</p>
                        <button className='ml-3 p-2 focus:outline-none' onClick={clearAll}>
                            <p className='underline hover:no-underline'>Clear All</p>
                        </button>
                    </div>

                    <div className='p-5 flex justify-center'>
                        <p className='hover:border-0 hover:bg-blue-600 hover:text-white w-full text-center py-2 rounded-tl-lg rounded-bl-lg text-blue-500 font-medium border border-gray-400'>ASDASD</p>
                        <p className='hover:border-0 hover:bg-blue-700 hover:text-white w-full text-center py-2 rounded-tr-lg rounded-br-lg text-blue-500 font-medium border border-gray-400'>abasd</p>
                    </div>
                    <div className='border-t border-b'>
                        <button className='w-full flex justify-between' onClick={()=>{setActiveFeature(!activeFeature)}}>
                            <p className='p-5 text-xl font-bold'>Feature</p>
                            <div className='p-5'>
                                {activeFeature ? <FontAwesomeIcon icon={faAngleDown} className='text-xl' /> : <FontAwesomeIcon icon={faAngleUp} className='text-xl' /> }
                            </div>
                            
                        </button>
                        {activeFeature ? null : 
                            <div className='p-5'>
                                <div className='items-center inline-flex'>
                                    <input type='checkbox' checked={featured} onClick={e => setFeatured(!featured)} className='h-5 w-5'/>
                                    <span className='ml-3 text-md'>Featured</span>
                                </div>
                                
                            </div>
                        }
                        
                    </div>
                    
                </div>
            </div>

            <div className='w-full'>
                <div className='flex w-full p-5 border-b'>
                    <div className='flex w-full'>
                        <div className='flex justify-start'>
                            {
                                position < 0 &&
                                <button onClick={moveRight}>
                                    <FontAwesomeIcon icon={faAngleDoubleLeft} className='text-5xl' />
                                </button>
                            }
                        </div>

                        <div className='flex w-full overflow-hidden whitespace-no-wrap'>
                            {menu}
                        </div>

                        <div className='flex justify-start'>
                            {
                                position > -200 &&
                                <button onClick={moveLeft}>
                                    <FontAwesomeIcon icon={faAngleDoubleRight} className='text-5xl' />
                                </button>
                            }
                        </div>
                    </div>

                </div>

                <div className='flex w-full border-b justify-between'>
                    <div className='p-5 inline-flex gap-3'>
                        {itemCategory !== 'null' && (
                            <div className='bg-blue-400 py-2 px-4 rounded font-medium hover:bg-blue-300'>
                                <button onClick={() => { filterFunction('null') }} className='focus:outline-none'>
                                    <p className='inline-block'>{itemCategory}</p>
                                    <FontAwesomeIcon icon={faTimes} className='ml-3 text-1xl hover:text-white' />
                                </button>
                            </div>
                        )}
                        {featured ? 
                            <div className='bg-blue-400 py-2 px-4 rounded font-medium hover:bg-blue-300'>
                                <button onClick={() => { setFeatured(false) }} className='focus:outline-none'>
                                    <p className='inline-block'>Featured</p>
                                    <FontAwesomeIcon icon={faTimes} className='ml-3 text-1xl hover:text-white' />
                                </button>
                            </div> : null
                        }
                        
                    </div>
                    <div className='p-5'>
                        <div className=''>
                            <p className='inline-block'>Sort:</p>
                            <select className='border rounded border-gray-500 inline-block p-2 ml-3'>
                                <option value='default'>Default</option>
                                <option value='rating'>Rating</option>
                                <option value='distance'>Distance</option>
                                <option value='delivery fee'>Delivery Fee</option>
                            </select>
                        </div>
                    </div>
                </div>

                <Items filteredLink={url} />

            </div>
        </>
    return (
        content
    )
}


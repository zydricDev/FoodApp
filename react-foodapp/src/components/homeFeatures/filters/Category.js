import React, { useState, useEffect } from 'react'

import { useAxiosGet } from '../../../Hooks/HttpRequest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import Items from '../../homeFeatures/Items'
import domain from '../../../domain'
import Loader from '../../misc/Loader'


export default function Category(searchProps) {
    const [search, setSearch] = useState()
    const [itemCategory, setCategory] = useState('null')
    const [featured, setFeatured] = useState(false)
    const [activeFeature, setActiveFeature] = useState(false)
    const [sort, setSort] = useState('Default')

    const sliderList = useAxiosGet(`${domain}/category/display`)
    let menu = <Loader></Loader>
    let content = <Loader></Loader>

    useEffect(() => {
        setSearch(searchProps.searched)
    }, [searchProps, search])
    
    if (sliderList.error) {
        content = <Loader></Loader>
    }

    
    const clearAll = () => {
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


    try {
        if (sliderList.data) {
            menu =
                <div className='w-full'>
                    {sliderList.data.map((menuType, index) =>
                        <div key={index} className='text-center inline-block ml-4'>
                            <button onClick={() => {
                                filterFunction(menuType.newCategoryType)
                            }} className='relative'>
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
        }
    } catch (err) {
        <Loader></Loader>
    }

    content =
        <div className='grid grid-cols-1 sm:flex'>
            <div className='sm:flex sm:w-2/6 sm:border-r'>
                <div className='flex-col w-full'>
                    <div className='flex p-5 align-baseline'>
                        <p className='font-bold text-2xl'>Filters</p>
                        <button className='ml-3 p-2 focus:outline-none' onClick={clearAll}>
                            <p className='underline hover:no-underline'>Clear All</p>
                        </button>
                    </div>

                    <div className='p-5 flex justify-center'>
                        <p className='hover:border-0 hover:bg-blue-600 hover:text-white w-full text-center py-2 rounded-tl-lg rounded-bl-lg text-blue-500 font-medium border border-gray-400'>NOT YET</p>
                        <p className='hover:border-0 hover:bg-blue-700 hover:text-white w-full text-center py-2 rounded-tr-lg rounded-br-lg text-blue-500 font-medium border border-gray-400'>NON</p>
                    </div>
                    <div className='border-t border-b'>
                        <button className='w-full flex justify-between' onClick={() => { setActiveFeature(!activeFeature) }}>
                            <p className='p-5 text-xl font-bold'>Feature</p>
                            <div className='p-5'>
                                {activeFeature ? <FontAwesomeIcon icon={faAngleDown} className='text-xl' /> : <FontAwesomeIcon icon={faAngleUp} className='text-xl' />}
                            </div>

                        </button>
                        {activeFeature ? null :
                            <div className='p-5'>
                                <div className='items-center inline-flex'>
                                    <input type='checkbox' checked={featured} onChange={e => setFeatured(!featured)} className='h-5 w-5' />
                                    <span className='ml-3 text-md'>Featured</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className='w-full'>
                <div className='flex w-full p-5 border-b'>
                    <div className='flex w-full relative'>
                        <div className='flex w-full overflow-x-scroll whitespace-no-wrap'>
                            {menu}
                        </div>
                    </div>
                </div>


                <div className='grid grid-cols-1 px-3 sm:p-0 sm:flex w-full border-b justify-between'>
                    <div className='p-5 sm:inline-flex gap-3 grid grid-cols-1'>
                        {itemCategory !== 'null' && (
                            <div className='bg-blue-400 py-2 px-4 rounded font-medium hover:bg-blue-300'>
                                <button onClick={() => { filterFunction('null') }} className='focus:outline-none inline-flex items-center w-full justify-between'>
                                    <p className='inline-block'>{itemCategory}</p>
                                    <FontAwesomeIcon icon={faTimes} className='ml-3 text-1xl hover:text-white' />
                                </button>
                            </div>
                        )}
                        {featured ?
                            <div className='bg-blue-400 py-2 px-4 rounded font-medium hover:bg-blue-300'>
                                <button onClick={() => { setFeatured(false) }} className='focus:outline-none inline-flex items-center w-full justify-between'>
                                    <p className='inline-block'>Featured</p>
                                    <FontAwesomeIcon icon={faTimes} className='ml-3 text-1xl hover:text-white' />
                                </button>
                            </div> : null
                        }
                    </div>

                    <div className='flex  py-5 pr-5'>
                        <div>
                            <p className='inline-block'>Sort:</p>
                            <select className='border rounded border-gray-500 inline-block p-2 ml-3' value={sort} onChange={e => { setSort(e.target.value) }}>
                                <option value='Default'>Default</option>
                                <option value='Price'>Price</option>
                                <option value='Rating'>Rating</option>
                                <option value='Distance'>Distance</option>
                                <option value='Delivery Fee'>Delivery Fee</option>
                            </select>
                        </div>
                    </div>
                </div>
                        
                <Items 
                    filteredLink={`${domain}/food/display/all`}
                    searchFor={search} 
                    categoryFilter={itemCategory} 
                    feature={featured}
                    sortBy={sort}
                />

            </div>
        </div>


    return (
        content
    )
}


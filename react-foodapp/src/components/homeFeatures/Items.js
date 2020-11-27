import React, { useState, useEffect } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default function Items(linkProp) {
    const [url, setUrl] = useState()
    const [page, setPage] = useState(1)

    const updatedLink = linkProp.filteredLink

    let restaurantList = useAxiosGet(url)
    let nextPage = undefined
    let prevPage = undefined
    let content = undefined

    let availablePages = undefined



    useEffect(() => {

        setUrl(updatedLink + `?page=${page}`)
        

    }, [page, updatedLink])


    const clickNext = () => {
        if (nextPage) {
            setPage(page + 1)
        }
    }
    const clickPrev = () => {
        if (prevPage) {
            setPage(page - 1)
        }
    }


    if (restaurantList.error) {
        content = <p>There was an error</p>
    }

    try {
        if (restaurantList.data) {
            nextPage = restaurantList.data.next
            prevPage = restaurantList.data.previous
            availablePages = restaurantList.data.possiblePages
            
            content =
                <div className='flex-col w-full'>
                    <div className="flex-col w-full">
                        {restaurantList.data.result.map(item =>
                            <div key={item._id} className="flex w-full border-b border-gray-300">
                                <Link to={`/food/${item._id}`}>
                                    <img src={item.image} alt={item.foodName} className="p-3 h-20 w-20 object-cover box-content" />
                                </Link>
                                <div className='flex pl-5 w-full'>
                                    <div className='flex-col w-full'>
                                        <p className='mt-5 font-medium'>{item.foodName}</p>
                                        {item.feature &&
                                            <div className='flex w-full'>
                                                <p className='text-xs justify-start bg-gray-300'>Featured</p>
                                            </div>
                                        }
                                    </div>
                                    <div className='flex w-full justify-around'>
                                        <div className='flex w-3/6'>
                                            <p className='mt-5 font-medium'>{item.category}</p>
                                        </div>
                                        <div className='flex w-full'>
                                            <p className='mt-5 font-medium'>${item.price}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className='flex justify-center w-full'>

                        {prevPage && (
                            <button onClick={clickPrev} className='focus:outline-none'>
                                <div className='border-t border-b border-l w-12 h-12 py-2 border-black hover:bg-blue-800 items-center inline-flex justify-center'>
                                    <FontAwesomeIcon icon={faAngleLeft} className='text-xl' />
                                </div>
                            </button>
                        )}

                        {availablePages.before.map((item, index) =>
                            <div key={index}>
                                <div className='inline-flex py-5'>
                                    <button onClick={() => { setPage(item) }}>
                                        <div className='border-t border-b border-l w-12 h-12 py-2 text-center border-black hover:bg-blue-800'>
                                            <p>{item}</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className='inline-flex py-5'>
                            <div className='border w-12 h-12 py-2 text-center bg-blue-500 border-black'>
                                <p>{availablePages.current}</p>
                            </div>
                        </div>

                        {availablePages.ahead.map((item, index) =>
                            <div key={index}>
                                <div className='inline-flex py-5'>
                                    <button onClick={() => { setPage(item) }}>
                                        <div className='border-t border-b border-r w-12 h-12 py-2 text-center border-black hover:bg-blue-800'>
                                            <p>{item}</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {nextPage && (
                            <button onClick={clickNext} className='focus:outline-none'>
                                <div className='border-t border-b border-r w-12 h-12 py-2 border-black hover:bg-blue-800 items-center inline-flex justify-center'>
                                    <FontAwesomeIcon icon={faAngleRight} className='text-xl' />
                                </div>
                            </button>
                        )}
                    </div>
                    <div className='text-center pb-5'>
                        {page <= availablePages.maxPage ? (<p>Page {page} of {availablePages.maxPage}</p>) : null }
                    </div>
                </div>




        }
    } catch (err) {
        content = <p>Register PLZ</p>
    }

    return (
        <>
            {content}
        </>
    )
}

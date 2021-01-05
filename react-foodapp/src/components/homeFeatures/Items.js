import React, { useReducer } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import Loader from '../misc/Loader'
import domain from '../../domain'

export default function Items(superProps) {

    let url = `${domain}/food/display/test`


    if (superProps.searchFor) {
        url = `${domain}/food/find/${superProps.searchFor}`
    }

    const restaurantList = useAxiosGet(url)
    const limit = 9
    const initialPage = { page: 1, lower: 0, upper: 9 }

    function goTo(toPage) {
        return { page: toPage, lower: (toPage - 1) * limit, upper: toPage * limit }
    }

    function reducer(state, action) {
        const max = Math.ceil(restaurantList.data.length / limit)

        switch (action.type) {
            case 'first':
                if (state.page - 1 > 0) {
                    return { page: 1, lower: 0, upper: 9 }
                }
                return { page: state.page, lower: state.lower, upper: state.upper }
            
            case 'last':
                if (max && restaurantList.data) {
                    return { page: max, lower: (limit * (max - 1)), upper: (limit * (max - 1)) + (restaurantList.data.length % limit) }
                }
                return { page: state.page, lower: state.lower, upper: state.upper }    

            case 'prev':
                if (state.page - 1 > 0) {
                    return { page: state.page - 1, lower: state.lower - limit, upper: state.upper - limit }
                }
                return { page: state.page, lower: state.lower, upper: state.upper }

            case 'next':
                if (state.page + 1 <= max) {
                    return { page: state.page + 1, lower: state.lower + limit, upper: state.upper + limit }
                }
                return { page: state.page, lower: state.lower, upper: state.upper }
            case 'skip':
                return goTo(action.payload)
            default:
                break

        }

    }
    const [state, dispatch] = useReducer(reducer, initialPage);


    const category = superProps.categoryFilter
    const feature = superProps.feature
    const sort = superProps.sortBy

    let content = <Loader></Loader>



    const filtered = (item) => {

        if (category !== 'null' && category) {
            if (item.category !== category) {
                return
            }
        }
        if (feature) {
            if (!item.feature) {
                return
            }
        }
        return item
    }
    const sorted = (a, b) => {
        if (sort === 'Price') {
            return parseInt(a.price) - parseInt(b.price)
        }
        return
    }

    if (restaurantList.error) {
        content = <Loader></Loader>
    }

    let pagesAhead = []
    let pagesBefore = []
    let maxPage = undefined
    
    try {

        if (restaurantList.data) {
            pagesAhead = []
            pagesBefore = []
            maxPage = Math.ceil(restaurantList.data.filter(filtered).length / limit)
            if (state.page > maxPage) {
                state.page = 1
                state.upper = limit
                state.lower = 0
            }

            for (let i = 1; i <= 3; i++) {
                if (state.page + i <= maxPage) {
                    pagesAhead.push(state.page + i)
                }
                if (state.page - i > 0) {
                    pagesBefore.unshift(state.page - i)
                }
            }


            content =
                <div className='flex-col w-full'>

                    <div className="flex-col w-full">
                        {restaurantList.data
                            .filter(filtered)
                            .sort(sorted)
                            .slice(state.lower, state.upper)
                            .map((item, index) =>
                                <div key={index} className="flex w-full border-b border-gray-300">
                                    <Link to={`/food/${item._id}`}>
                                        <img src={item.image} alt={item.foodName} className="p-3 h-20 w-20 object-cover box-content" />
                                    </Link>
                                    <div className='flex pl-5 w-full'>
                                        <div className='flex-col sm:w-full w-3/6'>
                                            <p className='mt-5 font-medium'>{item.foodName}</p>
                                            {item.feature &&
                                                <div className='flex w-full'>
                                                    <p className='text-xs justify-start bg-gray-300'>Featured</p>
                                                </div>
                                            }
                                        </div>
                                        <div className='flex w-full sm:justify-around justify-between sm:mr-0 mr-10'>
                                            <div className='flex sm:w-3/6'>
                                                <p className='mt-5 font-medium'>{item.category}</p>
                                            </div>
                                            <div className='flex sm:w-full'>
                                                <p className='mt-5 font-medium'>${item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                    <div className='flex justify-center w-full'> 
                        <button onClick={() => dispatch({ type: 'first' })} className='focus:outline-none'>
                            <div className='border-t border-b border-l w-12 h-12 py-2 border-black hover:bg-blue-800 items-center inline-flex justify-center'>
                                <FontAwesomeIcon icon={faAngleDoubleLeft} className='text-xl' />
                            </div>
                        </button>
                            
                   
                      
                        {(state.page > 1) && (
                            <button onClick={() => dispatch({ type: 'prev' })} className='focus:outline-none'>
                                <div className='border-t border-b border-l w-12 h-12 py-2 border-black hover:bg-blue-800 items-center inline-flex justify-center'>
                                    <FontAwesomeIcon icon={faAngleLeft} className='text-xl' />
                                </div>
                            </button>
                        )}

                        {pagesBefore.map((item, index) =>
                            <div key={index}>

                                <div className='inline-flex py-5'>
                                    <button onClick={() => dispatch({ type: 'skip', payload: item })}>
                                        <div className='border-t border-b border-l w-12 h-12 py-2 text-center border-black hover:bg-blue-800'>
                                            <p>{item}</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className='inline-flex py-5'>
                            <div className='border w-12 h-12 py-2 text-center bg-blue-500 border-black'>
                                <p>{state.page}</p>
                            </div>
                        </div>

                        {pagesAhead.map((item, index) =>
                            <div key={index}>
                                <div className='inline-flex py-5'>
                                    <button onClick={() => dispatch({ type: 'skip', payload: item })}>
                                        <div className='border-t border-b border-r w-12 h-12 py-2 text-center border-black hover:bg-blue-800'>
                                            <p>{item}</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {(state.page < Math.ceil(restaurantList.data.filter(filtered).length / limit)) && (
                            <button onClick={() => dispatch({ type: 'next' })} className='focus:outline-none'>
                                <div className='border-t border-b border-r w-12 h-12 py-2 border-black hover:bg-blue-800 items-center inline-flex justify-center'>
                                    <FontAwesomeIcon icon={faAngleRight} className='text-xl' />
                                </div>
                            </button>
                        )}

                        <button onClick={() => dispatch({ type: 'last' })} className='focus:outline-none'>
                            <div className='border-t border-b border-r w-12 h-12 py-2 border-black hover:bg-blue-800 items-center inline-flex justify-center'>
                                <FontAwesomeIcon icon={faAngleDoubleRight} className='text-xl' />
                            </div>
                        </button>
                    </div>
                    <div className='text-center pb-5'>
                        <p>Page {state.page} of {Math.ceil(restaurantList.data.filter(filtered).length / limit)}</p>
                    </div>
                </div>




        }
    } catch (err) {
        content = <Loader></Loader>
    }

    return (
        <>
            {content}
        </>
    )
}


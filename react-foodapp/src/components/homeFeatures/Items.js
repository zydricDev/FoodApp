import React, {useState, useEffect} from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import { Link } from 'react-router-dom';


export default function Items(linkProp) {
    const [url, setUrl] = useState()
    const [page, setPage] = useState(1)

    const updatedLink = linkProp.filteredLink

    let restaurantList = useAxiosGet(url)
    let nextPage = undefined
    let prevPage = undefined
    let content = undefined
    
    
    useEffect(() =>{
        setUrl(updatedLink + `?page=${page}`)
        
    }, [page, updatedLink])


    const clickNext = () =>{
        if(nextPage){
            setPage(page+1)
        }
    }
    const clickPrev = () =>{
        if(prevPage) {    
            setPage(page-1)
        }
    }
    
    
    if (restaurantList.error) {
        content = <p>There was an error</p>
    }
    
    try {
        if (restaurantList.data) {
            nextPage = restaurantList.data.next
            prevPage = restaurantList.data.previous
                  
            content =
                <div className='flex-col w-full'>
                    <div className="flex-col w-full">
                        {restaurantList.data.result.map(item =>
                            <div key={item._id} className="flex w-full border-b border-gray-300">
                                <Link to={`/food/${item._id}`}>
                                    <img src={item.image} alt={item.foodName} className="p-3 h-20 w-20 object-cover box-content" />
                                </Link>
                                <div className='flex pl-5 w-full'>
                                    <div className='flex w-full'>
                                        <p className='mt-5 font-medium'>{item.foodName}</p>
                                    </div>
                                    <div className='flex w-full justify-around'>
                                        <div className='flex w-3/6'>
                                            <p className='mt-5 font-medium'>{item.category}</p>
                                        </div>
                                        <div className='flex w-full'>
                                            <p className='mt-5 font-medium'>{item.desc}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex justify-center w-full'>
                        {prevPage && (<button onClick={clickPrev}>Prev</button>)}
                        {nextPage && (<button className='ml-3' onClick={clickNext}>Next</button>)}
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

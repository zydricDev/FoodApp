import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import Category from '../homeFeatures/filters/Category'

export default function Mainhub() {
    const [search, setSearch] = useState()
    const [query, setQuery] = useState()

    
    const location = useLocation();
    
    useEffect(() => {
        setQuery(location.state)
    }, [location])

    const submit = (query) =>{
        setQuery(query)
    }
    return (
        <div className='flex'>
            <div className="flex-col w-full">
                <div className='grid grid-cols-1 w-full gap-2 sm:flex justify-start sm:pl-2 sm:py-3 p-5 border-b'>
                    <input type='search' className='w-full sm:w-3/6 md:w-2/6 lg:w-2/6 xl:w-1/6 px-5 py-2 border border-gray-400 rounded mr-5 focus:outline-none' onChange={e => setSearch(e.target.value) } placeholder='Search Name or Shop'/>
                    <button onClick={()=>submit(search)} className='px-5 py-2 border rounded bg-blue-400 font-medium hover:bg-blue-700 hover:text-white'>Search</button> 
                </div>
                    
                
                <div className='flex w-full'>
                    <Category searched={query}/>
                </div>
            </div>
        </div>
    )
}

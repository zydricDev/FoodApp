import React, { useState } from 'react'

import Category from '../homeFeatures/filters/Category'

export default function Mainhub() {
    const [search, setSearch] = useState()
    // <input type='text' onChange={e => setSearch(e.target.value) } placeholder='ARF ARF'/> 
    return (
        <div className='flex'>
                 
            <div className="flex-col w-full">
               
                <div className='flex w-full'>
                    <Category searched={search}/>
                </div>
            </div>
        </div>
    )
}

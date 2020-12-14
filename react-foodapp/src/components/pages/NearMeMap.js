import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ErrorNotice from '../misc/ErrorNotice'
import domain from '../../domain'
import Axios from 'axios'
import DisplayMap from '../mapFeatures/DisplayMap'

export default function NearMeMap() {
    const [query, setQuery] = useState()
    const [miles, setMiles] = useState(500)
    const [country, setCountry]= useState('usa')
    
    const [allNearby, setAllNearBy] = useState(null)
    const [error, setError] = useState()

    
    async function search(){
        try{
            const searchFor = {query, country, miles} 
            const results = await Axios.post(`${domain}/users/map`, searchFor)
            setAllNearBy(results.data)
            
        }catch(err){
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
        <>
            {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)}/>
            )} 

            <div className='relative'>
                <div className='absolute z-10 m-10 grid grid-cols-1 gap-1 bg-black-t-50 p-1 rounded'>
                    
                    <div className='flex gap-1'>
                        <input className='px-2 py-1 w-64 border border-gray-500 rounded focus:outline-none' type='search' placeholder='Search by address' onChange={e => setQuery(e.target.value)}/>
                        <select className='rounded focus:outline-none border-gray-500 p-1 text-gray-600' value={miles} onChange={e => setMiles(e.target.value)}>
                            <option value='500'>within miles</option>
                            <option value='5'>5 miles</option>
                            <option value='10'>10 miles</option>
                            <option value='20'>20 miles</option>
                            <option value='40'>40 miles</option>
                            <option value='80'>80 miles</option>
                            <option value='100'>100 miles</option>
                            <option value='200'>200 miles</option>
                            <option value='400'>400 miles</option>
                            <option value='600'>600 miles</option>
                            <option value='1000'>1000 miles</option>
                        </select>
                    </div>
                    <div className='flex gap-1'>
                        <input className='px-2 py-1 w-64 border border-gray-500 rounded focus:outline-none' type='search' placeholder='Enter Country (3-letters)' onChange={e => setCountry(e.target.value)}/>
                        <button className='bg-gray-200 px-3 rounded hover:bg-gray-400' onClick={search}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    
                    
                </div>
                
                <DisplayMap allNearby={allNearby} />

            </div>
        </>
    )
}

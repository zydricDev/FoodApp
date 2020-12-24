import React from 'react'
import EditStoreItems from '../storeFeatures/EditStoreItems'
import StoreReport from '../storeFeatures/StoreReport'

export default function MyStore() {
    let content = undefined

    content =
    <div className='w-full h-full flex-col'>
        <StoreReport />
        <EditStoreItems />
        
    </div> 
    

    return (
        content
    )
}

import React from 'react'

import Category from '../homeFeatures/filters/Category'

export default function Mainhub() {
    return (
        <div className='flex'>
            
            <div className="flex-col w-full">
                <div className='flex w-full'>
                    <Category/>
                </div>
            </div>
        </div>
    )
}

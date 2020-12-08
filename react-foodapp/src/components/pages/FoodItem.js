import React from 'react'
import { useParams } from 'react-router-dom'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import UserMenu from '../itemFeatures/UserMenu'
import UserInfo from '../itemFeatures/UserInfo'
import Comment from '../itemFeatures/Comment'

import domain from '../../domain'
import Loader from '../misc/Loader'

export default function FoodItem() {
    const { id } = useParams()
    const url = `${domain}/food/${id}`
    let product = useAxiosGet(url)
    let content = <Loader></Loader>

    if (product.error) {
        content = <Loader></Loader>
    }

    if (product.data) {
        content =
            <>
                <div className="p-10 lg:mx-40">
                    <div className='border border-gray-700 sm:flex sm:p-10 p-5 rounded shadow-sm'>
                        <div className="flex-col w-full mr-5">
                            <div className='h-full sm:p-5 p-2'>
                                <div className='flex border w-full items-center justify-between px-5 py-1 rounded'>
                                    <p className="font-medium text-3xl">{product.data.foodName}</p>
                                    <p className="font-medium text-2xl">${product.data.price}</p>
                                </div>
                                <p className="text-gray-500 py-5">By {product.data.userDisplayName}</p>
                                <div className='flex-col px-5 border rounded'>
                                    <p className="text-gray-500">{product.data.category}</p>
                                    <p className="text-gray-700 break-all">{product.data.desc}</p>
                                </div>
                            </div>
                        </div>
                        <img src={product.data.image} alt={product.data.foodName} className="object-cover box-content sm:w-1/2 sm:h-64" />
                    </div>
                    <UserMenu propUrl={product.data.userId}/>
                </div>
                <div className='bg-indigo-600 flex w-full my-10 justify-center'>
                    <UserInfo propUrl={product.data.userId}/>
                </div>
                <div className='flex w-full'>
                    <Comment propUsrId={product.data.userId}/>
                </div>
                
            </>
    }

    return (
        <div>
            {content}
            
        </div>
    )
}

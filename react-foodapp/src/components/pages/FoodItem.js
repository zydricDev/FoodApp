import React from 'react';
import { useParams } from 'react-router-dom';
import { useAxiosGet } from '../../Hooks/HttpRequest';
import UserMenu from '../itemFeatures/UserMenu';
import domain from '../../domain'

export default function FoodItem() {
    const { id } = useParams()
    const url = `${domain}/food/${id}`
    let product = useAxiosGet(url)
    let content = null

    if (product.error) {
        content = <p>There was an error</p>
    }

    if (product.data) {
        content =
            <div className="p-10">
                <div className='border border-gray-400 flex p-10 rounded'>
                    <div className="flex-col w-full mr-5">
                        <div className='h-full p-5'>
                            <div className='flex border w-full items-center justify-between px-5 py-1'>
                                <p className="font-medium text-3xl">{product.data.foodName}</p>
                                <p className="font-medium text-2xl">${product.data.price}</p>
                            </div>
                            <p className="text-gray-500 py-5">By {product.data.userDisplayName}</p>
                            <div className='flex-col px-5 py-2 border'>
                                <p className="text-gray-500">{product.data.category}</p>
                                <p className="text-gray-700 ">{product.data.desc}</p>
                            </div>
                        </div>
                    </div>
                    <img src={product.data.image} alt={product.data.foodName} className="object-cover box-content w-1/2 h-64" />
                </div>
                <UserMenu propUrl={product.data.userId}/>
            </div>
    }

    return (
        <div>
            {content}
            
        </div>
    )
}

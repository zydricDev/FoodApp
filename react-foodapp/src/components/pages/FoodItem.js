import React from 'react';
import {useParams} from 'react-router-dom';
import {useAxiosGet} from '../../Hooks/HttpRequest';

export default function FoodItem() {
    const { id } = useParams()
    const url = `http://localhost:4000/food/${id}`
    let product = useAxiosGet(url)
    let content = null
    
    if(product.error){
        content = <p>There was an error</p>
    }
    
    if (product.data) {
        content =
            <div className="flex justify-center p-3">
                <div className="flex-col">
                    <img src={product.data.image} className="px-5 py-10"></img>
                    <p className="px-5">Product: {product.data.foodName}</p>
                    <p className="px-5">Price: ${product.data.price}</p>
                    <p className="px-5">Seller: {product.data.userDisplayName}</p>
                    <p className="px-5 pb-5">Description: {product.data.desc}</p>
                </div>
            </div>
    }
      
    return (
        <div>
            {content}
        </div>
    )
}

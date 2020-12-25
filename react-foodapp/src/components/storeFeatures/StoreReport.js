import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Loader from '../misc/Loader'
import domain from '../../domain'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlushed } from '@fortawesome/free-solid-svg-icons'

export default function StoreReport(props) {
    let content = <Loader></Loader>
    let usr_id = props.usr_id
    const [report, setReport] = useState()

    useEffect(()=>{
        const load = async () =>{
            const result = await axios.get(`${domain}/receipt/ofStore/${usr_id}`, {
                headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
            })
            setReport(result)
        }
        load()
    },[usr_id])
    
   
    try{
        if(report.data){
            
            content = 
            <div className='p-5'>
                <div className='grid grid-cols-1 w-full gap-5 md:px-20 xl:px-64'>
                    {report.data.map((item, index)=> 
                    <div key={index} className='p-5 rounded bg-blue-500 text-white grid grid-cols-1 gap-2'>
                        <div className='flex justify-between '>
                            <p>ISSUED DATE</p>
                            <p>{Date(item.last_updated)}</p>
                        </div>
                        
                        <div className='flex justify-between border-t border-b py-5'>
                            <p>ORDER ISSUED BY CUSTOMER</p>
                            <p>ID#{item.client_id}</p>
                        </div>
                       
                        <div className='flex justify-between border border-white p-2 rounded bg-white text-gray-600'>
                            <p>SUM TOTAL</p>
                            <p>${item.total_price}</p>
                        </div>
                        <div className='flex justify-between border border-white p-2 rounded bg-white text-gray-600'>
                            <p>Order Qty</p>
                            <p>{item.quantity}</p>
                        </div>
                        <div className='flex justify-between border border-white p-2 rounded bg-white text-gray-600'>
                            <p>Delivery Distance</p>
                            <p>{item.distance} miles</p>
                        </div>
                        <div className='flex justify-between border border-white p-2 rounded bg-white text-gray-600'>
                            <p>Geo Coordinate</p>
                            <p>({item.client_geo_lat}, {item.client_geo_lng})</p>
                        </div>
                        <div className='flex justify-between py-5 border-t border-b'>
                            <p>ITEMS PURCHASED BY CUSTOMER</p>
                            <p>ID#{item.client_id}</p>
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            {item.items.map((product, number)=>
                            <div key={`${number},${product.seller_id}`}>
                                
                                <div className='p-2 bg-blue-400 rounded grid grid-cols-1 gap-2'>
                                    <div className='flex justify-between border-b'>
                                        <p>PRODUCT ID#</p>
                                        <p>{product.item_id}</p>
                                    </div>
  
                                    <div className='flex justify-between '>
                                        <p>PRODUCT PRICE</p>
                                        <p>${product.item_price}</p>
                                    </div>

                                    <div className='flex justify-between '>
                                        <p>QTY</p>
                                        <p>{product.quantity}</p>
                                    </div>

                                    <div className='flex justify-between border-b'>
                                        <p>SUMMED PRICE</p>
                                        <p>${(parseFloat(product.item_price) * parseInt(product.quantity)).toFixed(2)}</p>
                                    </div>

                                    <div className='flex justify-between '>
                                        <p>DATE OF PURCHASE</p>
                                        <p>{Date(product.entry_date)}</p>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                    )}
                </div>
                
            </div>
        }
        if(report.data.length === 0 || !report){
            content = 
            <div className='bg-gray-300 w-full h-screen text-center'>
                <div className='py-40 text-gray-600'>
                    <FontAwesomeIcon icon={faFlushed} className='text-5xl' />
                    <p className='my-2 font-semibold'>This section is empty because no purchases were made.</p>
                </div>
        </div>
        }
    }catch(err){
        content = <Loader></Loader>
    }
    
    
    return (
        content
    )
}

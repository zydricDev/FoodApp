import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Loader from '../misc/Loader'

export default function Cart(myProps) {
    const [myData, setMyData] = useState()
    const [counted, setCounted] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    let content = <Loader></Loader>
 
    useEffect(() => {
        const load = async () =>{
            const myCart = await Axios.get(myProps.userUrl, {
                headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
            })
            setMyData(myCart)
        
        }
        load()
    }, [myProps.userUrl])
    
    try{
        if(myData.data && myData.data.length === 0){
            content =
            <div>
                Empty
            </div>
        }
        if(myData.data && myData.data.length >= 1){
            if(!counted){
                let total = 0
                for(let i=0; i<myData.data.length; i++){
                    total += parseFloat(myData.data[i].itemPrice)*parseFloat(myData.data[i].quantity)
                }
                setCounted(true)
                setTotalPrice(total)
            }
            
            content = 
            <div className='w-full flex h-screen'>
                <div className='w-2/6'>
                    <div className='p-20 h-full'>
                        <div className='pt-5 pb-2 w-full text-2xl font-bold border-b border-black text-red-500'>
                            Food App
                        </div>
                        <div className='w-full grid grid-cols-1 gap-2'>
                            {myData.data.map((item, index)=>
                            <div key={index+'ext'} className='text-lg mt-2'>
                                <div className='flex justify-between gap-2'>
                                    <p>+${parseFloat(item.itemPrice)* parseFloat(item.quantity)}</p>
                                    <p>{item.itemName}</p>
                                </div>
                            </div>
                            )}
                            <div className='border-t border-black text-xl font-semibold mt-2'>
                                <p>Total: ${totalPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-4/6'>
                    <div className='border-l border-gray-400 shadow-md p-5 grid grid-cols-1 gap-5'>
                        {myData.data.map((item,index)=>
                        <div key={index} className='bg-blue-500 p-5 rounded flex items-center justify-between'>
                            <div className='text-white w-3/6 grid grid-cols-1 gap-2'>
                                <div>
                                    <p className='font-semibold'>#ID_{item.itemId}</p>
                                    <p>#Order_{item._id}</p>
                                </div>
                                <div className='border border-white rounded p-5'>
                                    <p className='font-bold text-xl'>{item.itemName}</p>
                                    <p>Price: ${item.itemPrice}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p className='border-t border-white mt-2 font-semibold'>Total: ${parseFloat(item.itemPrice)*parseFloat(item.quantity)}</p>
                                </div>
                                
                                <div className='border border-white rounded p-5'>
                                    <p>To: {item.buyerAddress}</p>
                                    <p>From: {item.sellerAddress}</p>
                                    <p>Estimate Delivery: {item.estDeliver}</p>
                                </div>
                                <div>
                                    <p>Buying from: {item.sellerName}, user#{item.sellerId}</p>
                                    <p>Added in {item.date.substring(0,10)} at {item.date.substring(11,item.date.length-5)}</p>
                                </div>
                                
                            
                            </div>
                            <img className='w-2/6 h-full object-cover' src={item.icon} alt={item.icon}/>
                            
                        </div>
                        
                        )}
                    </div>
                </div>
            </div>
        }
        

        
    }
    catch(err){
        <Loader></Loader>
    }
    return (
        content
    )
}

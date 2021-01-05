import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Loader from '../misc/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrimace } from '@fortawesome/free-solid-svg-icons'
import domain from '../../domain'

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
    
    const removeThis = async (itemid) =>{
        await Axios.delete(`${domain}/precheck/delete/${myProps.userId}/${itemid}`, {
            headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
        })
    }

    const submit = async () =>{
        
        await Axios.post(`${domain}/checkout/store/${myProps.userId}`, null, {
            headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
        })
    }

    try{
        if(myData.data && myData.data.length === 0){
            content =
            <div className='w-full h-screen bg-gray-300'>
                <div className='p-40 text-center text-gray-600'>
                    <FontAwesomeIcon icon={faGrimace} className='text-5xl' />
                    <p className='my-2 font-semibold'>Cart is empty. Check out some at the main page.</p>
                </div>
            </div>
        }
        if(myData.data && myData.data.length >= 1){
            if(!counted){
                let total = 0
                for(let i=0; i<myData.data.length; i++){
                    total += parseFloat(myData.data[i].itemPrice)*parseFloat(myData.data[i].quantity)
                }
                
                setCounted(true)
                setTotalPrice(total.toFixed(2))
            }
            
            content = 
            <div className='w-full grid grid-cols-1 sm:flex h-full'>
                <div className='sm:w-2/6'>
                    <form className='p-5 lg:p-10 h-full'>
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
                        <button className='bg-blue-500 py-2 px-5 rounded text-white hover:bg-blue-600 font-semibold my-5' onClick={submit}>Proceed to checkout</button>
                    </form>
                </div>
                <div className='sm:w-4/6'>
                    <form className='border-l border-b border-gray-400 shadow-md p-5 grid grid-cols-1 gap-5'>
                        {myData.data.map((item,index)=>
                        <div key={index} className='bg-blue-500 p-5 rounded grid grid-cols-1 gap-5 sm:gap-0 sm:flex items-center justify-between'>
                            <div className='text-white sm:w-3/6 grid grid-cols-1 gap-2'>
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
                                    <p>Distance: {item.distance} miles or {(parseFloat(item.distance)*1.609344).toFixed(4)} kilometers</p>
                                </div>
                                <div>
                                    <p>Buying from: {item.sellerName}, user#{item.sellerId}</p>
                                    <p>Added in {item.date.substring(0,10)} at {item.date.substring(11,item.date.length-5)}</p>
                                </div>
                                <button className='bg-red-500 hover:bg-red-600 rounded text-white text-lg font-semibold p-2' onClick={()=>{removeThis(item._id)}}>
                                    Remove
                                </button>
                            
                            </div>
                            <img className='sm:w-2/6 sm:h-full object-cover' src={item.icon} alt={item.icon}/>
                            
                        </div>
                        
                        )}
                    </form>
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

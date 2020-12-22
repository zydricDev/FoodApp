import React, { useState, useEffect, useContext } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import { useTransition, animated } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'
import domain from '../../domain'
import Loader from '../misc/Loader'
import UserContext from '../../context/UserContext'
import Axios from 'axios'
import ErrorNotice from '../misc/ErrorNotice'

export default function UserMenu(ownerId) {
    const userCred = useContext(UserContext)
    const [error, setError] = useState()
    const [buyer, setBuyer] = useState()
    const [loading, setLoading] = useState(false)
    const url = `${domain}/food/display/user/${ownerId.propUrl}`
    const seller = `${domain}/users/find/${ownerId.propUrl}`
    
    

    const [selectedItem, setSelectedItem] = useState({
        itemId: undefined,
        itemName: undefined,
        itemPrice: undefined,
        description: undefined,
        icon: undefined,
    })

    const [quantity, setQuantity] = useState(1)

    const [sellerState, setSellerState] = useState({
        sellerName: undefined,
        sellerId: undefined,
        sellerAddress: undefined,
        coor: undefined
    })

    const [buyerState, setBuyerState] = useState({
        buyerName: undefined,
        buyerId: undefined,
        buyerAddress: undefined,
        coor: undefined
    })

    
    const [shopMenu, setShopMenu] = useState(false) 
    let content = undefined

    useEffect(()=>{
        const loadInfo = () =>{
            if(userCred.userData.user){
                setBuyer(`${domain}/users/find/${userCred.userData.user.id}`)
            }
            
        }
        loadInfo()
    },[userCred])
    
    const userMenus = useAxiosGet(url)
    const sellerData = useAxiosGet(seller)
    const buyerData = useAxiosGet(buyer)
    
    const categoryList = useAxiosGet(`${domain}/category/display`)


    const menuTransitions = useTransition(shopMenu, null, {
        from: { opacity: 0, transform: 'translateX(-100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
    })

    const maskTransitions = useTransition(shopMenu, null, {
        from: { position: 'fixed', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    if (userMenus.error || !categoryList.data) {
        content = <Loader></Loader>
    }
    
    if(sellerData.data && !sellerState.sellerId){
        setSellerState({
            sellerName: sellerData.data.displayName,
            sellerId: sellerData.data.id,
            sellerAddress: `${sellerData.data.address}, ${sellerData.data.zipcode}`,
            lat: sellerData.data.lat,
            lng: sellerData.data.lng
        })
    }

    if(buyerData.data && !buyerState.buyerId){
        setBuyerState({
            buyerName: buyerData.data.displayName,
            buyerId: buyerData.data.id,
            buyerAddress: `${buyerData.data.address}, ${buyerData.data.zipcode}`,
            lat: buyerData.data.lat,
            lng: buyerData.data.lng
        })
    }

    async function submit(){
        try{
            if(selectedItem.itemId && sellerState.sellerId && buyerState.buyerId){
                setLoading(true)
                const itemId = selectedItem.itemId
                const itemName = selectedItem.itemName
                const itemPrice = selectedItem.itemPrice
                const buyerName = buyerState.buyerName
                const buyerId = buyerState.buyerId
                const buyerAddress = buyerState.buyerAddress
                const sellerName = sellerState.sellerName
                const sellerId = sellerState.sellerId
                const sellerAddress = sellerState.sellerAddress
                const icon = selectedItem.icon
                const sellerCoor = [sellerState.lat, sellerState.lng]
                const buyerCoor = [buyerState.lat, buyerState.lng]

                let query = {
                    itemId,
                    itemName,
                    itemPrice,
                    buyerName,
                    buyerId,
                    buyerAddress,
                    sellerName,
                    sellerId,
                    sellerAddress,
                    icon,
                    quantity,
                    sellerCoor,
                    buyerCoor
                }
                
                await Axios.post(`${domain}/precheck/store`, query, {
                    headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
                })
       
                setLoading(false)
                setShopMenu(false) 
                
            }
        }
        catch(err){
            setLoading(false)
            err.response.data.msg && setError(err.response.data.msg)
        }
    }


    if (userMenus.data && categoryList.data && sellerData.data) {
        try{
            content =
            <div>
                {maskTransitions.map(({ item, key, props }) =>
                    item &&
                    <animated.div
                        key={key}
                        style={props}
                        className="bg-black-t-50 fixed top-0 left-0 w-full h-full z-50"
                        onClick={() => {
                            setShopMenu(false)
                            setError()
                        }}
                       
                    >
                    </animated.div>
                )}

                {menuTransitions.map(({ item, key, props }) =>
                    item &&
                    <animated.div
                        key={key}
                        style={props}
                        className="fixed bg-white top-0 left-0 sm:w-1/3 w-4/6 h-full z-50 shadow"
                    >
                        <div className='p-5 grid grid-cols-1 gap-2'>
                            {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
                            <div className='relative'>
                                <img className='w-full h-64 object-cover rounded' src={selectedItem.icon} alt={selectedItem.icon}/>
                                <div className='flex-col gap-5 px-5 py-1 bg-gray-t-90 m-2 rounded absolute top-0 left-0 z-10'>
                                    <p className='font-semibold'>{selectedItem.itemName}</p>
                                    <p>${selectedItem.itemPrice}</p>
                                </div>
                            </div>
                            
                            {userCred.userData.user && 
                            <>
                                <div className='grid grid-cols-1 md:flex gap-2 w-full space-between'>
                                    <div className='flex w-auto gap-2'>
                                        <span>Qty</span>
                                        <input className='w-full sm:w-16 px-2 border border-gray-500 rounded' type='number' value={quantity} onChange={e => setQuantity(e.target.value)}/>
                                    </div>
                                    <div className='flex gap-2 text-white w-full'>
                                        <button className='rounded px-1 bg-blue-500 font-bold hover:bg-blue-600 w-full sm:w-10' 
                                        onClick={()=>{
                                            if(quantity < 20){
                                                setQuantity(quantity+1)
                                            }
                                            if(quantity > 20 || quantity < 0){
                                                setQuantity(20)
                                            }
                                        }}>+</button>

                                        <button className='rounded px-1 bg-blue-500 font-bold hover:bg-blue-600 w-full sm:w-10'  
                                        onClick={()=>{
                                            if(quantity > 1){
                                                setQuantity(quantity-1)
                                            }
                                            if(quantity > 20 || quantity < 0){
                                                setQuantity(20)
                                            }
                                        }}>-</button>
                                    </div>
                                </div>
                                
                                
                                {!loading ? 
                                    (<button className='hover:bg-blue-600 cursor-pointer h-10 mt-5 rounded bg-blue-500 text-white' onClick={submit}>Add to cart</button>)
                                    :
                                    (<Loader></Loader>)
                                }
                                
                            </>
                            }
                            <div className='grid grid-cols-1 w-full  p-5 lg:inline-flex gap-5 items-center text-white invisible bottom-0 lg:visible'>
                                <img className='w-40 h-40 object-cover rounded-full' src={sellerData.data.icon} alt={sellerData.data.icon}/>
                                <div className='bg-blue-500 w-full p-5 rounded'>
                                    <p className='text-2xl font-semibold'>{sellerState.sellerName}</p>
                                    <p>{sellerState.sellerAddress}</p>
                                    <p>Phone: ({sellerData.data.phone.substring(0, 3)})-{sellerData.data.phone.substring(3, 6)}-{sellerData.data.phone.substring(6, 10)}</p>
                                </div>
                            </div>
                        </div>
                        
                    </animated.div>
                )}
                
                <div className='mt-5'>
                    <div className='inline-flex items-center'>
                        <p className='text-2xl font-bold pl-5'>Top Menus</p>
                        <FontAwesomeIcon icon={faMedal} className='text-2xl text-yellow-500 ml-2' />
                    </div>

                    <div className='grid grid-cols-2 p-5 gap-5'>
                        {userMenus.data
                            .filter(item => item.feature)
                            .map((item, index) =>
                                <div key={index} className='border flex justify-between relative transition duration-500 hover:shadow-md hover:border-gray-500 rounded relative' 
                                onClick={()=>{
                                    setQuantity(1)
                                    setSelectedItem({
                                        itemId: item._id,
                                        itemName: item.foodName,
                                        itemPrice: item.price,
                                        description: item.desc,
                                        icon: item.image
                                    })
                                    setShopMenu(true)
            
                                }}>
                                    <div className='p-2 absolute bottom-0'>
                                        <div className='bg-gray-t-90 px-2 my-1 rounded'>
                                            <p className='font-bold'>{item.foodName}</p>
                                            <p className='font-bold'>${item.price}</p>
                                        </div>

                                    </div>

                                    <img className='object-cover w-full h-40' src={item.image} alt={item.foodName} />
                                </div>
                            )}
                    </div>

                    {categoryList.data.map((menuType, listIndex) =>
                        <div key={listIndex}>
                            {userMenus.data.find(item => item.category === menuType.newCategoryType) ? (
                                <>
                                    <p className='text-2xl font-bold px-5'>{menuType.newCategoryType}</p>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 p-5 gap-5'>
                                        {userMenus.data
                                            .filter(item => item.category === menuType.newCategoryType)
                                            .map((item, index) =>
                                                <div key={index} className='border flex justify-between relative transition duration-500 hover:shadow-md hover:border-gray-500 rounded' 
                                                onClick={()=>{
                                                    setQuantity(1)
                                                    setSelectedItem({
                                                        itemId: item._id,
                                                        itemName: item.foodName,
                                                        itemPrice: item.price,
                                                        description: item.desc,
                                                        icon: item.image
                                                    })
                                                    setShopMenu(true)
                                                }}>
                                                    <div className='p-2'>
                                                        <div className='inline-flex gap-3 items-center'>
                                                            <p className='font-bold'>{item.foodName}</p>

                                                            {item.feature && <FontAwesomeIcon icon={faMedal} className='text-md text-yellow-500' />}
                                                        </div>
                                                        <p className='text-gray-700 mt-3 break-all'>{item.desc}</p>
                                                    </div>
                                                    {item.feature ? (<p className='absolute right-0 mr-2 mt-2 bg-gray-t-90 py-2 px-4 rounded font-bold'>${item.price}</p>) : (<p className='right-0 mr-2 mt-2 rounded font-bold'>${item.price}</p>)}
                                                    {item.feature && <img className='object-cover w-40 h-40' src={item.image} alt={item.foodName} />}
                                                </div>
                                            )}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
        }
        catch(err){
            err.response.data.msg && setError(err.response.data.msg)
        }
        
        
    }




    return (
        <div>
            {content}
        </div>
    )
}

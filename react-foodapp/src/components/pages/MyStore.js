import React, { useState, useContext, useEffect } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import UserContext from '../../context/UserContext'
import Axios from 'axios'

import ErrorNotice from '../misc/ErrorNotice'

export default function MyStore() {
    const userCred = useContext(UserContext)
    let url = undefined
    
    let content = null
    
    const [newName, setName] = useState()
    const [newPrice, setPrice] = useState()
    const [newDesc, setDesc] = useState()
    const [newImage, setImage] = useState()
    const [newFeature, setFeature] = useState()
    const [newCategory, setCategory] = useState()

    const [editMode, setEditMode] = useState(false)
  
    const [error, setError] = useState()

    const [selectedId, setSelectId] = useState()
    const [selectedUrl, setSelectUrl] = useState()
    
    useEffect(()=>{
        setSelectUrl(`http://localhost:4000/food/${selectedId}`)
    },[selectedId])

    if (userCred.userData.user) {
        url = `http://localhost:4000/food/display/user/${userCred.userData.user.id}`
    } 

    let productList = useAxiosGet(url)
    let productSelected = useAxiosGet(selectedUrl)

    const selectedItem = (itemId) => {
        setName()
        setPrice()
        setDesc()
        setImage()
        setFeature()
        setCategory()
        setSelectId(itemId)

    }

    const editActive = () =>{
        if(selectedId){
            setEditMode(!editMode)
        }
    }

    const submit = async (item) => {
        if (productList.data && productSelected) {
            try {
                const newFood = { newName, newPrice, newDesc, newImage, newFeature, newCategory }
                await Axios.patch(`http://localhost:4000/food/edit/${item}`, newFood)
            } catch (err) {
                err.response.data.msg && setError(err.response.data.msg)
            }
        }

    }

    if (productList.error) {
        content = <p>Loading</p>
    }

    try {
        if (productList.data && productSelected) {
            
            content = 
            
            <div className='flex h-screen'>
                <div className='w-1/6 h-full p-5'>
                    <div className='p-5 grid grid-cols-1 gap-5 text-center border-gray-500 border rounded'>
                        <p className='font-bold text-xl'>My Products</p>
                        {productList.data.map((product, index) =>
                        <div key={index}>
                            <button onClick={() => { selectedItem(product._id) }} className='border rounded w-full hover:bg-blue-500'>
                                <p className='text-xl font-semibold'>{product.foodName}</p>
                            </button>
                        </div>
                        )}
                    </div>
                </div>
                
                <div className='w-full'>
                    {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
                    <div className='flex-col w-full'>
                        <div className='flex justify-center w-full'>
                            <img src={productSelected.data.image} className='w-4/6 h-64 object-cover mt-5' alt={productSelected.data.foodName}/>
                        </div>
                        <div className='flex justify-center'>
                            <div className='grid grid-cols-2 gap-5 mt-5 mx-5 w-full'>
                                {productSelected.data.feature ? 
                                    <div className='border p-5 border-gray-400 rounded inline-flex gap-5 justify-around'>
                                        <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none' onClick={editActive}>
                                            <p className='text-gray-500'>Item Featured Status</p>
                                            <p className='font-bold text-xl'>Active</p>
                                        </button>
                                        {editMode && 
                                            <div className='w-full'>
                                                <p className='text-gray-500 ml-5'>Feature Status</p>
                                                <select className='ml-5 w-5/6 focus:outline-none mb-1 bg-gray-300 rounded border border-black' value={newFeature} onChange={e => setFeature(e.target.value)}>
                                                    <option value='1'>Enable</option>
                                                    <option value='0'>Disable</option>
                                                </select>
                                            </div>
                                        }
                                    </div> : 
                                    <div className='border p-5 border-gray-400 rounded inline-flex gap-5 justify-around'>
                                        <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none' onClick={editActive}>
                                            <p className='text-gray-500'>Item Featured Status</p>
                                            <p className='font-bold text-xl'>Not Active</p>
                                        </button>
                                        {editMode && 
                                            <div className='w-full'>
                                                <p className='text-gray-500 ml-5'>Feature Status</p>
                                                <select className='ml-5 w-5/6 focus:outline-none mb-1 bg-gray-300 rounded border border-black' value={newFeature} onChange={e => setFeature(e.target.value)}>
                                                    <option value='0'>Disable</option>
                                                    <option value='1'>Enable</option>
                                                </select>
                                            </div>
                                        }
                                    </div>
                                }
                                <div className='border p-5 border-gray-400 rounded inline-flex gap-5 justify-around'>
                                    <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none' onClick={editActive}>
                                        <p className='text-gray-500'>Item Category</p>
                                        <p className='font-bold text-xl'>{productSelected.data.category}</p>
                                    </button>
                                    {editMode && 
                                        <div className='w-full'>
                                            <p className='text-gray-500 ml-5'>New Category</p>
                                            <select className='ml-5 w-5/6 focus:outline-none mb-1 bg-gray-300 rounded border border-black' value={newCategory} onChange={e => setCategory(e.target.value)}>
                                                <option>Current Setting --- {productSelected.data.category}</option>
                                                <option value='Uncategorized'>Uncategorized</option>
                                                <option value='Asian'>Asian</option>
                                                <option value='American'>American</option>
                                                <option value='Salads'>Salads</option>
                                                <option value='Sandwiches'>Sandwiches</option>
                                                <option value='Vegetarian'>Vegetarian</option>
                                                <option value='Healthy'>Healthy</option>
                                                <option value='Hamburger'>Hamburger</option>
                                                <option value='Ice Cream'>Ice Cream</option>
                                                <option value='Bakery'>Bakery</option>
                                                <option value='Japanese'>Japanese</option>
                                                <option value='Lunch'>Lunch</option>
                                                <option value='Deserts'>Deserts</option>
                                            </select>
                                        </div>
                                    }
                                </div>
                                <div className='border p-5 border-gray-400 rounded inline-flex gap-5 justify-around'>
                                    <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none'  onClick={editActive}>
                                        <p className='text-gray-500'>Item Name</p>
                                        <p className='font-bold text-xl'>{productSelected.data.foodName}</p>
                                    </button>
                                    {editMode && 
                                        <div className='w-full'>
                                            <p className='text-gray-500 ml-5'>New Name</p>
                                            <input className='ml-5 w-5/6 focus:outline-none bg-gray-300 px-1 rounded mb-1 border-black border' value={newName} type='text' placeholder='Enter new name' onChange={e => setName(e.target.value)}/>
                                        </div>
                                    }
                                </div>
                                
                                <div className='border p-5 border-gray-400 rounded inline-flex gap-5 justify-around'>
                                    <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none'  onClick={editActive}>
                                        <p className='text-gray-500'>Item Price</p>
                                        <p className='font-bold text-xl'>${productSelected.data.price}</p>
                                    </button>
                                    {editMode && 
                                        <div className='w-full'>
                                            <p className='text-gray-500 ml-5'>New Price</p>
                                            <input className='ml-5 w-5/6 focus:outline-none bg-gray-300 px-1 rounded mb-1 border-black border' value={newPrice} type='number' min='0' placeholder='Enter new price' onChange={e => setPrice(e.target.value)}/>
                                        </div>
                                    }
                                </div>
                                
                                <div className='border p-5 border-gray-400 rounded inline-flex gap-5 justify-around'>
                                    <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none'  onClick={editActive}>
                                        <p className='text-gray-500'>Item Description</p>
                                        <p className='font-bold text-xl'>{productSelected.data.desc}</p>
                                    </button>
                                    {editMode && 
                                        <div className='w-full'>
                                            <p className='text-gray-500 ml-5'>New Description</p>
                                            <input className='ml-5 w-5/6 focus:outline-none bg-gray-300 px-1 rounded mb-1 border-black border' value={newDesc} type='text' placeholder='Enter new description' onChange={e => setDesc(e.target.value)}/>
                                        </div>
                                    }
                                </div>

                                <div className='border p-5 border-gray-400 rounded inline-flex gap-5 justify-around'>
                                    <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none'  onClick={editActive}>
                                        <p className='text-gray-500'>Item Image</p>
                                        <div className='flex w-full justify-center'>
                                            <img src={productSelected.data.image} className='h-20 w-20 object-cover mb-1' alt={productSelected.data.foodName}/>
                                        </div>
                                        
                                    </button>
                                    {editMode && 
                                        <div className='w-full'>
                                            <p className='text-gray-500 ml-5'>New Image url</p>
                                            <input className='ml-5 w-5/6 focus:outline-none bg-gray-300 px-1 rounded mb-1 border-black border' value={newImage} type='text' placeholder='Enter new url' onChange={e => setImage(e.target.value)}/>
                                        </div>
                                    }
                                </div>
                                
                                
                            </div>
                            
                        </div>
                        <form className='w-full flex justify-center m-5' onSubmit={()=>submit(productSelected.data._id)}>
                            <input className='mt-2 hover:bg-blue-700 text-white rounded p-2 bg-blue-600 w-1/6' type='submit' value='Update Item'/>
                        </form>

                        
                    </div>
                   
                

                    

                </div>
            </div>
            

           

        }
    } catch (err) {
        content = <p>Loading</p>
    }


    return (
        <div>
            {content}
        </div>
    )
}


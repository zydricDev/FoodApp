import React, { useState, useContext, useEffect } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import UserContext from '../../context/UserContext'
import Axios from 'axios'

import ErrorNotice from '../misc/ErrorNotice'
import ForbiddenPage from '../misc/ForbiddenPage'
import Loader from '../misc/Loader'
import domain from '../../domain'

export default function EditStoreItems() {
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
    const [sortBy, setSortBy] = useState()


    const [error, setError] = useState()

    const [selectedId, setSelectId] = useState()
    const [selectedUrl, setSelectUrl] = useState()
    
    useEffect(()=>{
        setSelectUrl(`${domain}/food/${selectedId}`)
        
    },[selectedId, sortBy])

    if (userCred.userData.user) {
        url = `${domain}/food/display/user/${userCred.userData.user.id}`
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
        if(itemId !== 'null'){
            setSelectId(itemId)
        }
        
    }

    const editActive = () =>{
        if(selectedId){
            setEditMode(!editMode)
        }
    }

    const submit = async (item) => {
        if (productList.data && productSelected && userCred.userData.user) {
            try {
                const newFood = { newName, newPrice, newDesc, newImage, newFeature, newCategory }
                await Axios.patch(`${domain}/food/edit/${item}/${userCred.userData.user.id}`, newFood, {
                    headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
                })
            } catch (err) {
                err.response.data.msg && setError(err.response.data.msg)
            }
        }
    }


    const sorted = (a, b) => {
        if (sortBy === 'price-ascend') {
            return parseInt(a.price) - parseInt(b.price)
        }
        if(sortBy === 'price-descend'){
            if(parseInt(a.price) < parseInt(b.price)) { return 1; }
            if(parseInt(a.price) > parseInt(b.price)) { return -1; }
            return 0;
        }
        
        if(sortBy === 'name-ascend'){
            if(a.foodName < b.foodName) { return -1; }
            if(a.foodName > b.foodName) { return 1; }
            return 0;
        }
        if(sortBy === 'name-descend'){
            if(a.foodName < b.foodName) { return 1; }
            if(a.foodName > b.foodName) { return -1; }
            return 0;
        }
        if(sortBy === 'feature'){
            if(a.feature < b.feature) { return 1; }
            if(a.feature > b.feature) { return -1; }
            return 0;
        }

        if(sortBy === 'category-ascend'){
            if(a.category < b.category) { return -1; }
            if(a.category > b.category) { return 1; }
            return 0;
        }
        if(sortBy === 'category-descend'){
            if(a.category < b.category) { return 1; }
            if(a.category > b.category) { return -1; }
            return 0;
        }
        return
    }

    if (productList.error) {
        content = <Loader></Loader>
    }

    if(!userCred.userData.user){
        content = <ForbiddenPage></ForbiddenPage>
    }
    try {
        
        if (productList.data && productSelected) {
            
            content = 
            
            <div className='grid grid-cols-1 lg:flex lg:grid-cols-none h-full'>
                <div className='lg:w-2/6 xl:w-1/6 h-full p-5 border-b border-r-0 lg:border-b-0 border-gray-400'>
                    <div className='p-2 grid grid-cols-1 gap-3'>
                        <select className='border border-black rounded mb-5 bg-white focus:outline-none' value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            <option>--Sort by--</option>
                            <option value='feature'>Featured</option>
                            <option value='price-ascend'>Price (Highest)</option>
                            <option value='price-descend'>Price (Lowest)</option>
                            <option value='name-ascend'>Name (A-Z)</option>
                            <option value='name-descend'>Name (Z-A)</option>
                            <option value='category-ascend'>Category (A-Z)</option>
                            <option value='category-descend'>Category (Z-A)</option>
                        </select>
                        <p className='font-bold text-md'>My Products</p>

                        <select className='border border-black rounded mb-5 bg-white focus:outline-none' value={selectedId} onChange={e => selectedItem(e.target.value)}>
                            <option value='null'>--Default---</option>
                            {productList.data
                            .sort(sorted)
                            .map((product, index) =>
                            <option key={index} value={product._id}>
                                {product.foodName}
                            </option>
                            )}
                        </select>
                        
                    </div>
                </div>
                
                <div className='w-full sm:border-l border-gray-400'>
                    {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
                    <div className='flex-col w-full'>
                        <div className='flex justify-center w-full '>
                            <img src={productSelected.data.image} className='w-4/6 h-64 object-cover py-2 sm:py-5' alt={productSelected.data.foodName}/>
                        </div>
                        <div className='flex justify-center'>
                            <div className='grid xl:grid-cols-2 grid-cols-1 gap-5 mt-5 mx-5 w-full'>
                                {productSelected.data.feature ? 
                                    <div className='grid grid-cols-1 p-5 rounded lg:inline-flex gap-5 justify-around'>
                                        <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none' onClick={editActive}>
                                            <p className='text-gray-500'>Item Featured Status</p>
                                            <p>Active</p>
                                        </button>
                                        {editMode && 
                                            <div className='w-full'>
                                                <p className='text-gray-500 ml-5'>Feature Status</p>
                                                <select className='ml-5 w-5/6 focus:outline-none mb-1 bg-white rounded border border-black' value={newFeature} onChange={e => setFeature(e.target.value)}>
                                                    <option value='1'>Enable</option>
                                                    <option value='0'>Disable</option>
                                                </select>
                                            </div>
                                        }
                                    </div> : 
                                    <div className='grid grid-cols-1 p-5 rounded lg:inline-flex gap-5 justify-around'>
                                        <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none' onClick={editActive}>
                                            <p className='text-gray-500'>Item Featured Status</p>
                                            <p>Not Active</p>
                                        </button>
                                        {editMode && 
                                            <div className='w-full'>
                                                <p className='text-gray-500 ml-5'>Feature Status</p>
                                                <select className='ml-5 w-5/6 focus:outline-none mb-1 bg-white rounded border border-black' value={newFeature} onChange={e => setFeature(e.target.value)}>
                                                    <option value='0'>Disable</option>
                                                    <option value='1'>Enable</option>
                                                </select>
                                            </div>
                                        }
                                    </div>
                                }
                                <div className='grid grid-cols-1 p-5 rounded lg:inline-flex gap-5 justify-around'>
                                    <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none' onClick={editActive}>
                                        <p className='text-gray-500'>Item Category</p>
                                        <p>{productSelected.data.category}</p>
                                    </button>
                                    {editMode && 
                                        <div className='w-full'>
                                            <p className='text-gray-500 ml-5'>New Category</p>
                                            <select className='ml-5 w-5/6 focus:outline-none mb-1 bg-white rounded border border-black' value={newCategory} onChange={e => setCategory(e.target.value)}>
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
                                <div className='grid grid-cols-1 p-5 rounded lg:inline-flex gap-5 justify-around'>
                                    <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none'  onClick={editActive}>
                                        <p className='text-gray-500'>Item Name</p>
                                        <p>{productSelected.data.foodName}</p>
                                    </button>
                                    {editMode && 
                                        <div className='w-full'>
                                            <p className='text-gray-500 ml-5'>New Name</p>
                                            <input className='ml-5 w-5/6 focus:outline-none bg-white px-1 rounded mb-1 border-black border' type='text' placeholder='Enter new name' onChange={e => setName(e.target.value)}/>
                                        </div>
                                    }
                                </div>
                                
                                <div className='grid grid-cols-1 p-5 rounded lg:inline-flex gap-5 justify-around'>
                                    <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none'  onClick={editActive}>
                                        <p className='text-gray-500'>Item Price</p>
                                        {productSelected.data.price ? <p>${productSelected.data.price}</p> : <p></p>}
                                    </button>
                                    {editMode && 
                                        <div className='w-full'>
                                            <p className='text-gray-500 ml-5'>New Price</p>
                                            <input className='ml-5 w-5/6 focus:outline-none bg-white px-1 rounded mb-1 border-black border' type='number' min='0' step='0.01' placeholder='Enter new price' onChange={e => setPrice(e.target.value)}/>
                                        </div>
                                    }
                                </div>
                                
                                <div className='grid grid-cols-1 p-5 rounded lg:inline-flex gap-5 justify-around'>
                                    <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none'  onClick={editActive}>
                                        <p className='text-gray-500'>Item Description</p>
                                        <p>{productSelected.data.desc}</p>
                                    </button>
                                    {editMode && 
                                        <div className='w-full'>
                                            <p className='text-gray-500 ml-5'>New Description</p>
                                            <textarea className='ml-5 w-5/6 focus:outline-none bg-white px-1 rounded mb-1 border-black border resize-none' type='text' rows='5' placeholder='Enter new description' onChange={e => setDesc(e.target.value)}/>
                                        </div>
                                    }
                                </div>

                                <div className='grid grid-cols-1 p-5 rounded lg:inline-flex gap-5 justify-around'>
                                    <button className='w-full border border-gray-500 rounded hover:shadow-md hover:border-gray-600 duration-200 focus:outline-none'  onClick={editActive}>
                                        <p className='text-gray-500'>Item Image</p>
                                        <div className='flex w-full justify-center'>
                                            <img src={productSelected.data.image} className='h-20 w-20 sm:h-64 sm:w-64 object-cover mb-1' alt={productSelected.data.foodName}/>
                                        </div>
                                        
                                    </button>
                                    {editMode && 
                                        <div className='w-full'>
                                            <p className='text-gray-500 ml-5'>New Image url</p>
                                            <input className='ml-5 w-5/6 focus:outline-none bg-white px-1 rounded mb-1 border-black border' type='text' placeholder='Enter new url' onChange={e => setImage(e.target.value)}/>
                                        </div>
                                    }
                                </div>
                                
                                
                            </div>
                            
                        </div>
                        <form className='w-full flex justify-center py-5' onSubmit={()=>submit(productSelected.data._id)}>
                            <input className='mt-2 hover:bg-blue-700 text-white rounded px-10 sm:px-5 py-2 bg-blue-600 sm:w-1/6' type='submit' value='Update Item'/>
                        </form>                        
                    </div>
                </div>
            </div>
            

           

        }
    } catch (err) {
        content = <Loader></Loader>
    }


    return (
        <div>
            {content}
        </div>
    )
}


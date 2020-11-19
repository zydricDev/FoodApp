import React, { useState, useContext } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import UserContext from '../../context/UserContext'
import Axios from 'axios'

import ErrorNotice from '../misc/ErrorNotice'

export default function MyStore() {
    const userCred = useContext(UserContext)
    
    const url = `http://localhost:4000/food/display`

    let productList = useAxiosGet(url)
    let content = null
    const [editMode, setEditMode] = useState(false)

    const [newName, setName] = useState()
    const [newPrice, setPrice] = useState()
    const [newDesc, setDesc] = useState()
    const [newImage, setImage] = useState()
    
    const [error, setError] = useState()
    
    const canEdit = () => {
        setEditMode(!editMode)
    }

    const submit = async (item) => {
        
        try {
            const newFood = { newName, newPrice, newDesc, newImage }
            await Axios.patch(`http://localhost:4000/food/edit/${item}`, newFood)
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    if (productList.error) {
        content = <p>There was an error</p>
    }

    try {

        if (productList.data) {

            content =
                <div className="flex justify-center">
                    <div className="sm:flex-col md:grid grid-cols-3 gap-4">

                        {productList.data.map((product, index) => product.userId === userCred.userData.user.id ? (

                            <div key={index}>
                                <img className="h-64 w-full object-cover" src={product.image} alt={product.foodName}></img>
                                <div className='flex justify-between'>
                                    <div className='flex-col'>
                                        <div className='flex justify-between'>
                                            <label>Name:</label>
                                            <p>{product.foodName}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <label>Price:</label>
                                            <p>{product.price}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <label>Description:</label>
                                            <p>{product.desc}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <label>Seller:</label>
                                            <p>{product.userDisplayName}</p>
                                        </div>
                                    </div>
                                    <div className='flex-col'>
                                        {editMode && (
                                            <form onSubmit={()=> submit(product._id)}>
                                                {error && (<ErrorNotice message={error} clearError={() => setError(undefined)}/>)}
                                                <div className='flex justify-between'>
                                                    <label>Image url:</label>
                                                    <input className='bg-black-t-50 border-black p-1' type='text' onChange={e => setImage(e.target.value)} />
                                                </div>

                                                <div className='flex justify-between'>
                                                    <label>Name:</label>
                                                    <input className='bg-black-t-50 border-black p-1' type='text' onChange={e => setName(e.target.value)} />
                                                </div>

                                                <div className='flex justify-between'>
                                                    <label>Price:</label>
                                                    <input className='bg-black-t-50 border-black p-1' type='number' onChange={e => setPrice(e.target.value)} />
                                                </div>

                                                <div className='flex justify-between'>
                                                    <label>Description:</label>
                                                    <input className='bg-black-t-50 border-black p-1' type='text' onChange={e => setDesc(e.target.value)} />
                                                </div>
                                                
                                                <div className='flex justify-center'>
                                                    <input className='my-5 xl:text-xl hover:bg-black hover:text-white' type='submit' value='Update Item' />
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>

                            </div>
                        ) : (null)
                        )}

                    </div>
                </div>
        }
    } catch (err) {
        content = <p>Register PLZ</p>
    }


    return (
        <div>
            <button onClick={(canEdit)}>Edit</button>
            {content}
        </div>
    )
}

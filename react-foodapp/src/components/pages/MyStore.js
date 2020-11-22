import React, { useState, useContext } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import UserContext from '../../context/UserContext'
import Axios from 'axios'

import ErrorNotice from '../misc/ErrorNotice'

class editedFood extends React.Component {
    constructor(name, price, desc, image) {
        super()
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.image = image;
        this.edit = false;
    }
}

export default function MyStore() {
    const userCred = useContext(UserContext)
    let url = undefined

    let content = null
    let pageSection = null
    let foodValues = [];

    const [newName, setName] = useState()
    const [newPrice, setPrice] = useState()
    const [newDesc, setDesc] = useState()
    const [newImage, setImage] = useState()
    const [myIndex, setIndex] = useState()
    const [page, setPage] = useState(1)
    const [error, setError] = useState()

    

    if (userCred.userData.user) {
        url = `http://localhost:4000/food/display/${userCred.userData.user.id}?page=${page}&limit=9`
    } else {
        url = `http://localhost:4000/food/display?page=1&limit=9`
    }

    let productList = useAxiosGet(url)

    const canEdit = (i) => {
        if (i === myIndex) {
            setIndex(undefined)
        } else {
            setIndex(i)
        }
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
            productList.data.result.map((product) => {

                foodValues.push(new editedFood(
                    product.foodName,
                    product.price,
                    product.desc,
                    product.image
                ))

                return null;
            })
        }

        if (productList.data) {

            content =
                <div className="flex justify-center">
                    <div className="sm:flex-col md:grid grid-cols-3 gap-3 p-3">
                        {productList.data.result.map((product, index) =>
                            <div key={index}>

                                <img className="h-64 w-full object-cover" src={product.image} alt={product.foodName}></img>
                                <div className='flex justify-center p-3'>
                                    <button onClick={() => { canEdit(index) }}>Edit</button>
                                </div>

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

                                        {myIndex === index && (
                                            <form onSubmit={() => submit(product._id)}>

                                                {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
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

                                                <div className='flex justify-between'>
                                                    <label>Image url:</label>
                                                    <input className='bg-black-t-50 border-black p-1' type='text' onChange={e => setImage(e.target.value)} />
                                                </div>

                                                <div className='flex justify-center'>
                                                    <input className='my-5 xl:text-xl hover:bg-black hover:text-white' type='submit' value='Update Item' />
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            pageSection =
                <div className='flex justify-center'>
                    {productList.data.previous && (<button onClick={ () => {setPage(page - 1)}}>Prev</button>)}
                    {productList.data.next && (<button onClick={ () => {setPage(page + 1)}} className='ml-3'>Next</button>)}
                </div>

        }
    } catch (err) {
        content = <p>Register PLZ</p>
    }


    return (
        <div>
            {content}
            {pageSection}
        </div>
    )
}

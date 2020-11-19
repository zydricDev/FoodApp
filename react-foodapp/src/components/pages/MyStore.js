import React, {useState, useContext} from 'react'
import {useAxiosGet} from '../../Hooks/HttpRequest'
import UserContext from '../../context/UserContext'

export default function MyStore() {
    const userCred = useContext(UserContext)
    const url = `http://localhost:4000/food/display`
    let productList = useAxiosGet(url)
    let content = null
    const [editMode, setEditMode] = useState(false)
    
   
    const[name, setName] = useState()
    const[price, setPrice] = useState()
    const[desc, setDesc] = useState()
    const[image, setImage] = useState()
    
    const canEdit = () =>{
        setEditMode(!editMode)
    }

    const submit = async (e) =>{
        e.preventDefault()
        try{
            /**const newFood = {foodName, userDisplayName, userId, price, desc, image}

            await Axios.post('http://localhost:4000/food/register', newFood, {
                headers:{"auth-token": localStorage.getItem('auth-token')}
            })
            history.push('/')
            **/
        }catch(err){
            
        }
    }

    if(productList.error){
        content = <p>There was an error</p>
    }
    
    try{
        
        if (productList.data) {
    
            content =
                <div className="flex justify-center">
                    <div className="sm:flex-col md:grid grid-cols-3 gap-4">
                        
                        {productList.data.map((product,index) => product.userId === userCred.userData.user.id ? (
                            
                            <div key={index}>
                                <img src={product.image} alt={product.foodName}></img>
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
                                        <form>
                                            <div className='flex justify-between'>
                                                <label>Image url:</label>
                                                <input className='bg-black-t-50 border-black p-1' type='text' onChange={e => setImage(e.target.value)}/>
                                            </div>

                                            <div className='flex justify-between'>
                                                <label>Name:</label>
                                                <input className='bg-black-t-50 border-black p-1' type='text' onChange={e => setName(e.target.value)}/>
                                            </div>

                                            <div className='flex justify-between'>
                                                <label>Price:</label>
                                                <input className='bg-black-t-50 border-black p-1' type='number' onChange={e => setPrice(e.target.value)}/>
                                            </div>

                                            <div className='flex justify-between'>
                                                <label>Description:</label>
                                                <input className='bg-black-t-50 border-black p-1' type='text' onChange={e => setDesc(e.target.value)}/>
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
    }catch(err){
        content = <p>Register PLZ</p>
    }
    
      
    return (
        <div>
            <button onClick = {(canEdit)}>Edit</button>
            {content}
        </div>
    )
}

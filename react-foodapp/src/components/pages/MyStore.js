import React, {useContext} from 'react'
import {useAxiosGet} from '../../Hooks/HttpRequest'
import UserContext from '../../context/UserContext'

export default function MyStore() {
    const userCred = useContext(UserContext)
    const url = `http://localhost:4000/food/display`
    let productList = useAxiosGet(url)
    let content = null
    
    
    if(productList.error){
        content = <p>There was an error</p>
    }
    try{
        if (productList.data) {
            content =
                <div className="flex justify-center">
                    <div className="sm:flex-col md:grid grid-cols-3 gap-4">
                        {productList.data.map(product => product.userId === userCred.userData.user.id ? (
                            <div key={product._id}>
                                <img src={product.image} alt={product.foodName}></img>
                                <p>{product.foodName}</p>
                                <p>{product.price}</p>
                                <p>{product.desc}</p>
                                <p>{product.userDisplayName}</p>
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
            {content}
        </div>
    )
}

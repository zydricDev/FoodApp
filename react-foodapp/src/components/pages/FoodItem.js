import React from 'react'
import { useParams } from 'react-router-dom'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import UserMenu from '../itemFeatures/UserMenu'
import UserInfo from '../itemFeatures/UserInfo'
import UserInfoHeader from '../itemFeatures/UserInfoHeader'
import Comment from '../itemFeatures/Comment'

import domain from '../../domain'
import Loader from '../misc/Loader'

export default function FoodItem() {
    const { id } = useParams()
    const url = `${domain}/food/${id}`
    

    let product = useAxiosGet(url)
    let content = <Loader></Loader>

    if (product.error) {
        content = <Loader></Loader>
    }

    if (product.data) {
        content =
            <>
                <div className="w-full">
                    <UserInfoHeader propUrl={product.data.userId} propPic={product.data.image}/>
                    <div className='lg:px-40 xl:px-64'>
                        <UserMenu propUrl={product.data.userId}/>
                    </div>
                    
                </div>
                <div className='bg-indigo-600 flex w-full my-10 justify-center'>
                    <UserInfo propUrl={product.data.userId}/>
                </div>
                <div className='flex w-full'>
                    <Comment propUsrId={product.data.userId}/>
                </div>
                
            </>
    }

    return (
        <div>
            {content}
            
        </div>
    )
}

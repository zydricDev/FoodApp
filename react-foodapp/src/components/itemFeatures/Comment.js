import React from 'react'
import Loader from '../misc/Loader'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import domain from '../../domain'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Comment(userId) {
    const id = userId.propUsrId
    
    const allComments = useAxiosGet(`${domain}/comments/user/${id}`)
    

    let content = <Loader></Loader>


    

    if (allComments.error) {
        content = <Loader></Loader>
    }

    

    function sorted(a,b){
        return b.date.localeCompare(a.date);
    }

    try{
        if(allComments.data){
            content = 
            <div className='grid grid-cols-1 w-full gap-10'>
                {allComments.data
                .sort(sorted)
                .map((comment, index)=>
                    <div key={index}>
                        <div className='justify-center w-full flex'>
                            <div className='grid grid-cols-1 w-4/6 gap-3'>
                                <div className='flex w-full justify-between items-center'>
                                    <div className='flex items-center gap-5 font-medium'>
                                        <img className='w-12 h-12 object-cover rounded-full' src={comment.icon}/>
                                        <p>{comment.userDisplayName}</p>
                                    </div>
                                    <p className='text-gray-700'>{comment.date.slice(0,10)}</p>
                                </div>
                                <div className='flex w-full text-xl gap-1'>
                                    {comment.rating === '1' && <>
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-gray-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-gray-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-gray-500' />
                                    </>}
                                    {comment.rating === '2' && <>
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-gray-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-gray-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-gray-500' />
                                    </>}

                                    {comment.rating === '3' && <>
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-gray-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-gray-500' />
                                    </>}

                                    {comment.rating === '4' && <>
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-gray-500' />
                                    </>}

                                    {comment.rating === '5' && <>
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                        <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                    </>}
                                </div>
                                <div>
                                    <p>{comment.comment}</p>
                                </div>
                            
                            </div>
                            
                        </div>
                        
                    </div>

                )}
            </div>
        }
        

    }catch(err){
        content = <Loader></Loader>
    }
    
    
    return (
        content
    )
}

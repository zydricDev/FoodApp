import React, { useState, useContext } from 'react'
import Loader from '../misc/Loader'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import domain from '../../domain'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ErrorNotice from '../misc/ErrorNotice'
import UserContext from '../../context/UserContext'
import Axios from 'axios'

export default function Comment(propsId) {
    const recipientId = propsId.propUsrId
    const currentUser = useContext(UserContext)

    let userId = undefined
    let userDisplayName = undefined
    let icon = 'https://img.favpng.com/11/4/12/stock-photography-businessperson-can-stock-photo-royalty-free-png-favpng-pDHxH9z4e2thFTyW6QzDE4m6C.jpg'
    let url = undefined

    const allComments = useAxiosGet(`${domain}/comments/user/${recipientId}`)
    

    const [comment, setComment] = useState()
    const [rating, setRating] = useState(1)
    const [error, setError] = useState()

    if(currentUser.userData.user){
        userId = currentUser.userData.user.id
        userDisplayName = currentUser.userData.user.displayName
        url = `${domain}/users/find/${userId}`
    }
    
    const getUser = useAxiosGet(url)
    
    let content = <Loader></Loader>

    if (allComments.error || getUser.error) {
        content = <Loader></Loader>
    }
    const ratings = (value) =>{
        setRating(value)
    }
    

    const submit = async () =>{
        try{
            if(getUser.data){
                icon = getUser.data.icon
            }
            const newComment = {userId, recipientId, userDisplayName, icon, rating, comment}
            await Axios.post(`${domain}/comments/post`, newComment, {
                headers: { "auth-token": localStorage.getItem('auth-token') }
            })
            
        }catch(err){
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    function sorted(a, b) {
        return b.date.localeCompare(a.date);
    }

    try {
        if (allComments.data) {
            
            content =
                <div className='flex-col w-full'>
                    <div className='grid grid-cols-1 w-full gap-10'>
                        {allComments.data
                            .sort(sorted)
                            .map((comment, index) =>
                                <div key={index}>
                                    <div className='justify-center w-full flex'>
                                        <div className='grid grid-cols-1 w-4/6 gap-3'>
                                            <div className='flex w-full justify-between items-center'>
                                                <div className='flex items-center gap-5 font-medium'>
                                                    <img className='w-12 h-12 object-cover rounded-full' src={comment.icon} alt={comment.userDisplayName}/>
                                                    <p>{comment.userDisplayName}</p>
                                                </div>
                                                <p className='text-gray-700'>{comment.date.slice(0, 10)}</p>
                                            </div>
                                            <div className='flex w-full text-xl gap-1'>
                                                {comment.rating === '1' && <>
                                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500' />
                                                    <FontAwesomeIcon icon={faStar} className='text-gray-500' />
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
                                            <div className='break-words'>
                                                <p>{comment.comment}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                    <div className='flex justify-center'>
                        <div>
                            {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
                        </div>
                        
                    </div>
                    
                    {currentUser.userData.user && <div className='flex justify-center mt-20 mb-10'>
                        <div className='grid grid-cols-1 w-4/6 justify-center gap-5'>
                            <div className='flex items-center gap-2'>
                                <p>Rate:</p>
                                {rating === 1 && <>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(1)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-gray-500 cursor-pointer' onClick={()=>{ratings(2)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-gray-500 cursor-pointer' onClick={()=>{ratings(3)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-gray-500 cursor-pointer' onClick={()=>{ratings(4)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-gray-500 cursor-pointer' onClick={()=>{ratings(5)}}/>
                                </>}
                                {rating === 2 && <>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(1)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(2)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-gray-500 cursor-pointer' onClick={()=>{ratings(3)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-gray-500 cursor-pointer' onClick={()=>{ratings(4)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-gray-500 cursor-pointer' onClick={()=>{ratings(5)}}/>
                                </>}
                                {rating === 3 && <>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(1)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(2)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(3)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-gray-500 cursor-pointer' onClick={()=>{ratings(4)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-gray-500 cursor-pointer' onClick={()=>{ratings(5)}}/>
                                </>}
                                {rating === 4 && <>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(1)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(2)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(3)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(4)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-gray-500 cursor-pointer' onClick={()=>{ratings(5)}}/>
                                </>}
                                {rating === 5 && <>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(1)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(2)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(3)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(4)}}/>
                                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 cursor-pointer' onClick={()=>{ratings(5)}}/>
                                </>}
                            </div>
                            <textarea className='border border-gray-500 rounded p-1 focus:outline-none resize-none' rows='4' onChange={ e =>setComment(e.target.value)} placeholder='Comment on this shop and also rate them!'/>
                            <form className='flex justify-center w-full' onSubmit={submit}>
                                <input className='mt-2 bg-blue-500 text-xl px-5 py-1 rounded font-semibold text-white hover:bg-blue-700 cursor-pointer' type='submit' value='Submit'/>
                            </form>
                            
                        </div>
                    </div>}
                    
                </div>
        }


    } catch (err) {
        content = <Loader></Loader>
    }


    return (
        content
    )
}

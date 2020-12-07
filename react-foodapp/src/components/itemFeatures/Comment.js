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
    let icon = 'https://images.unsplash.com/photo-1457269449834-928af64c684d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'

    const allComments = useAxiosGet(`${domain}/comments/user/${recipientId}`)
    

    const [comment, setComment] = useState()
    const [rating, setRating] = useState(1)
    const [error, setError] = useState()

    if(currentUser.userData.user){
        userId = currentUser.userData.user.id
        userDisplayName = currentUser.userData.user.displayName
    }
    //const getUser = useAxiosGet(`${domain}/users/find/${userId}`)
    
    
    let content = <Loader></Loader>

    if (allComments.error) {
        content = <Loader></Loader>
    }
    const ratings = (value) =>{
        setRating(value)
    }
    

    const submit = async () =>{
        try{
            const newComment = {userId, recipientId, userDisplayName, icon, rating, comment}
            await Axios.post(`${domain}/comments/post`, newComment, {
                headers: { "auth-token": localStorage.getItem('auth-token') }
            })
            
        }catch(err){
            console.log(err.response.data.msg)
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
                    <div className='flex justify-center'>
                        <div>
                            {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
                        </div>
                        
                    </div>
                    
                    <div className='flex justify-center mt-20 mb-10'>
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
                            <textarea className='border border-gray-500 rounded p-1 focus:outline-none resize-none' rows='4' onChange={ e =>setComment(e.target.value)}/>
                            <form className='flex justify-center w-full' onSubmit={submit}>
                                <input className='w-1/6 mt-2 bg-blue-500 text-xl px-5 py-1 rounded font-semibold text-white hover:bg-blue-700 cursor-pointer' type='submit' value='Submit'/>
                            </form>
                            
                        </div>
                    </div>
                    
                </div>
        }


    } catch (err) {
        content = <Loader></Loader>
    }


    return (
        content
    )
}

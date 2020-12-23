import React from 'react'
import {useHistory} from 'react-router-dom'
import { useAxiosGet } from '../../Hooks/HttpRequest'

import domain from '../../domain'
import Loader from '../misc/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPhone, faAngleLeft, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'

export default function UserInfoHeader(propItems) {
    let usrId = propItems.propUrl
    let picSrc = propItems.propPic
    let content = <Loader></Loader>
    const history = useHistory()
    const goHome = () =>{history.push('/home')}
    const usrInfo = useAxiosGet(`${domain}/users/find/${usrId}`)
    const usrRating = useAxiosGet(`${domain}/comments/user/rating/${usrId}`)

    if (usrInfo.error || usrRating.error) {
        content = <Loader></Loader>
    }

    if (usrInfo.data && usrRating.data) {
        let ratings = usrRating.data.rating
        content =
            <div className='relative'>
                <div className='absolute top-0 right-0 mt-20 lg:px-40 xl:px-64 sm:px-40 z-10 '>
                    <img src={usrInfo.data.icon} alt={usrInfo.data.icon} className='mt-10 mr-5 w-20 h-20 object-cover rounded' />
                </div>
                <div className='w-full relative'>
                    <button className='ml-10 sm:ml-40 mt-5 absolute bg-white flex items-center rounded-full box-content w-10 h-10 justify-center focus:outline-none' onClick={goHome}>
                        <FontAwesomeIcon icon={faAngleLeft} className='text-blue-500 text-3xl mr-1 hover:text-blue-700' />
                    </button>
                    <img src={picSrc} alt={picSrc} className="object-cover box-content w-full h-40" />
                    
                </div>
                <div className='lg:px-40 xl:px-64 border-b border-gray-400'>
                    <div className='flex px-5 pb-3 w-full relative jusitfy-between overflow-hidden items-center'>
                        <div className='w-full'>
                            <div className='text-4xl font-bold'>
                                <p>{usrInfo.data.displayName}</p>
                            </div>

                            <div className='flex-col w-full'>
                                <div className='flex w-full gap-3'>
                                    <p>{usrInfo.data.address}, {usrInfo.data.zipcode}</p>
                                    <p>
                                        <FontAwesomeIcon icon={faPhone} className='text-md mx-1' />
                                ({usrInfo.data.phone.substring(0, 3)})-{usrInfo.data.phone.substring(3, 6)}-{usrInfo.data.phone.substring(6, 10)}
                                    </p>

                                </div>

                                <div className='flex gap-3 my-1'>
                                    <div className='flex gap-1'>
                                        {ratings === 'No ratings' ?
                                            <>
                                                <FontAwesomeIcon icon={faStar} className='text-gray-500 text-xl' />
                                                <FontAwesomeIcon icon={faStar} className='text-gray-500 text-xl' />
                                                <FontAwesomeIcon icon={faStar} className='text-gray-500 text-xl' />
                                                <FontAwesomeIcon icon={faStar} className='text-gray-500 text-xl' />
                                                <FontAwesomeIcon icon={faStar} className='text-gray-500 text-xl' />
                                            </>
                                            : null}
                                        {ratings >= 1 ? <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-xl' />: <FontAwesomeIcon icon={faStar} className='text-gray-500 text-xl' />}
                                        {(ratings > 1 && ratings < 2) ? <FontAwesomeIcon icon={faStarHalfAlt} className='text-yellow-500 text-xl' /> : ratings >= 2 ? <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-xl' /> : <FontAwesomeIcon icon={faStar} className='text-gray-500 text-xl' />}
                                        {(ratings > 2 && ratings < 3) ? <FontAwesomeIcon icon={faStarHalfAlt} className='text-yellow-500 text-xl' /> : ratings >= 3 ? <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-xl' /> : <FontAwesomeIcon icon={faStar} className='text-gray-500 text-xl' />}
                                        {(ratings > 3 && ratings < 4) ? <FontAwesomeIcon icon={faStarHalfAlt} className='text-yellow-500 text-xl' /> : ratings >= 4 ? <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-xl' /> : <FontAwesomeIcon icon={faStar} className='text-gray-500 text-xl' />}
                                        {(ratings > 4 && ratings < 5) ? <FontAwesomeIcon icon={faStarHalfAlt} className='text-yellow-500 text-xl' /> : ratings >= 5 ? <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-xl' /> : <FontAwesomeIcon icon={faStar} className='text-gray-500 text-xl' />}
                                    </div>
                                    <div className='flex text-sm text-gray-600'>
                                        <p>{usrRating.data.total} ratings</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
    }



    return (
        content
    )
}
/*







*/
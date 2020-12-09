import React from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import domain from '../../domain'
import Loader from '../misc/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'

export default function UserInfo(propUrl) {
    let usrId = propUrl.propUrl
    let content = <Loader></Loader>
    const usrInfo = useAxiosGet(`${domain}/users/find/${usrId}`)
    const usrRating = useAxiosGet(`${domain}/comments/user/rating/${usrId}`)

    if (usrInfo.error || usrRating.error) {
        content = <Loader></Loader>
    }

    if (usrInfo.data && usrRating.data) {
        let ratings = usrRating.data.rating
        content =
            <div className='px-5 lg:px-40 xl:px-64 py-5 w-full lg:flex items-center'>
                <div className='lg:w-3/6'>
                    <div className='lg:px-5 text-3xl font-medium text-white'>
                        <p>{usrInfo.data.displayName}</p>
                    </div>
                    <div className='grid grid-cols-1 lg:flex lg:justify-between lg:px-5 lg:items-center gap-3'>
                        <div className='lg:w-5/6'>
                            <p className='text-white break-all'>{usrInfo.data.address}, {usrInfo.data.zipcode}</p>
                            <p className='border-b border-t border-gray-400 py-2 text-white'>
                                Phone: ({usrInfo.data.phone.substring(0, 3)})-{usrInfo.data.phone.substring(3, 6)}-{usrInfo.data.phone.substring(6, 10)}
                            </p>
                        </div>
                        <div className='lg:w-5/6 lg:px-5'>
                            <img src={usrInfo.data.icon} alt={usrInfo.data.icon} className='w-full h-40 lg:w-40 object-cover' />
                        </div>
                    </div>
                </div>
                <div className='mt-5 lg:m-0 flex-col'>
                    <div className='mb-2 text-2xl text-white font-medium'>
                        <p>Reviews for {usrInfo.data.displayName}</p>
                    </div>
                    <div className='flex w-full gap-1'>
                        {ratings === 'No ratings' ?
                            <>
                                <FontAwesomeIcon icon={faStar} className='text-white text-xl' />
                                <FontAwesomeIcon icon={faStar} className='text-white text-xl' />
                                <FontAwesomeIcon icon={faStar} className='text-white text-xl' />
                                <FontAwesomeIcon icon={faStar} className='text-white text-xl' />
                                <FontAwesomeIcon icon={faStar} className='text-white text-xl' />
                            </>
                            : null}
                        {ratings >= 1 && <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-xl' />}
                        {(ratings > 1 && ratings < 2) ? <FontAwesomeIcon icon={faStarHalfAlt} className='text-yellow-500 text-xl' /> : ratings >= 2 ? <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-xl' /> : <FontAwesomeIcon icon={faStar} className='text-white text-xl' />}
                        {(ratings > 2 && ratings < 3) ? <FontAwesomeIcon icon={faStarHalfAlt} className='text-yellow-500 text-xl' /> : ratings >= 3 ? <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-xl' /> : <FontAwesomeIcon icon={faStar} className='text-white text-xl' />}
                        {(ratings > 3 && ratings < 4) ? <FontAwesomeIcon icon={faStarHalfAlt} className='text-yellow-500 text-xl' /> : ratings >= 4 ? <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-xl' /> : <FontAwesomeIcon icon={faStar} className='text-white text-xl' />}
                        {(ratings > 4 && ratings < 5) ? <FontAwesomeIcon icon={faStarHalfAlt} className='text-yellow-500 text-xl' /> : ratings >= 5 ? <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-xl' /> : <FontAwesomeIcon icon={faStar} className='text-white text-xl' />}
                    </div>
                    <div className='flex mt-2 text-sm text-white'>
                        <p>{usrRating.data.total} ratings</p>
                    </div>

                </div>
            </div>
    }



    return (
        content
    )
}

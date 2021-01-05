import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAxiosGet } from '../../Hooks/HttpRequest'
import ErrorNotice from '../misc/ErrorNotice'
import Axios from 'axios'
import domain from '../../domain'
import UserContext from '../../context/UserContext'
import Loader from '../misc/Loader'


export default function UserEdit() {
    const userData = useContext(UserContext)
    const history = useHistory()

    const [error, setError] = useState()
    const [userId, setUserId] = useState()

    const [accDetails, setAccDetails] = useState(true)


    const [email, setEmail] = useState()
    const [displayName, setName] = useState()
    const [icon, setIcon] = useState()
    const [address, setAddress] = useState()
    const [zipcode, setZipcode] = useState()
    const [phone, setPhone] = useState()
    const [country, setCountry] = useState() 


    const [editEmail, setEditEmail] = useState(false)
    const [editPhone, setEditPhone] = useState(false)
    const [editAddress, setEditAddress] = useState(false)
    const [editZip, setEditZip] = useState(false)
    const [editIcon, setEditIcon] = useState(false)
    const [editDisplayName, setEditDisplayName] = useState(false)
    const [editCountry, setEditCountry] = useState(false)

    let content = <Loader></Loader>
    let url = undefined
    useEffect(() => {
        if (userData.userData.user) {
            setUserId(userData.userData.user.id)
        }

    }, [userData])


    if (userId) {
        url = `${domain}/users/find/${userId}`
    }

    const currentData = useAxiosGet(url)

    const submit = async () => {
        try {
            const query = { displayName, icon, address, zipcode, phone, email, country}
            
            
            await Axios.patch(`${domain}/users/edit/${userId}`, query, {
                headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
            })
            
            await Axios.patch(`${domain}/food/edit/user/${userId}`, { displayName }, {
                headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
            }).catch(()=>{
                console.log("Current user doesn't have a registered item")
            })
            await Axios.patch(`${domain}/comments/user/update/${userId}`, { displayName, icon }, {
                headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
            }).catch(()=>{
                console.log("Current user has not made a comment")
            })
            

            history.push('/home')

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    if (currentData.error) {
        content = <Loader></Loader>
    }

    if (currentData.data) {
        content =
            <div className='bg-gray-300 h-screen'>
                {error && 
                <div className='flex w-full pt-5 justify-center'>
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                </div>}
                <div className='flex w-full justify-center'>

                    <div className='sm:flex grid grid-cols-1 w-full pt-10 sm:w-4/6'>
                        <div className='flex-col py-5 px-3 w-full sm:w-2/6'>
                            <button className='w-full' onClick={() => setAccDetails(!accDetails)}>
                                {accDetails ? <p className='py-3 px-5 w-full bg-gray-700 font-semibold text-left text-white'>Account Details</p> : <p className='py-3 px-5 w-full hover:bg-gray-500'>Account Details</p>}
                            </button>
                            <p className='py-3 px-5 hover:bg-gray-500 w-full'>TBA</p>
                            <p className='py-3 px-5 hover:bg-gray-500 w-full'>TBA</p>
                        </div>

                        {accDetails && <div className='w-full py-5 px-3 grid grid-cols-1 gap-2'>
                            <div className='w-full'>
                                <div className='border'>
                                    <div className='flex w-full justify-between border-b p-2 bg-blue-400 text-white font-semibold text-md'>
                                        <p>CONTACT INFO</p>
                                        {(email || phone) &&
                                            <button onClick={submit}>
                                                <p className='font-semibold px-5 rounded bg-red-500 hover:bg-red-600'>UPDATE</p>
                                            </button>
                                        }
                                    </div>
                                    <div className='grid sm:grid-cols-2 grid-cols-1 bg-blue-300'>
                                        <div className='p-2 text-sm'>
                                            {editEmail ?
                                                (<div className='flex'>
                                                    <p className='text-gray-600 mr-2'>Change email:</p>
                                                    <input type="email" onChange={e => { setEmail(e.target.value) }} className='px-2 bg-blue-500 rounded' />
                                                </div>)
                                                :
                                                (<div className='flex'>
                                                    <p className='text-gray-600 mr-2'>Email address:</p>
                                                    <p>{currentData.data.email}</p>
                                                </div>)
                                            }
                                            <button
                                                className='focus:outline-none'
                                                onClick={() => {
                                                    setEditEmail(!editEmail)
                                                    setEmail()
                                                }}>
                                                <p className='text-blue-500 hover:text-white'>Change my email address</p>
                                            </button>
                                        </div>

                                        <div className='p-2 text-sm'>
                                            <button
                                                className='focus:outline-none'
                                                onClick={() => {
                                                    setEditPhone(!editPhone)
                                                    setPhone()
                                                }}>

                                                <p className='text-blue-500 hover:text-white'>Manage your phone number</p>
                                            </button>
                                            <div className='flex'>
                                                <p className='text-gray-600 mr-2'>Phone:</p>
                                                {editPhone ?
                                                    <input min='0' type='number' onChange={e => { setPhone(e.target.value) }} className='px-2 bg-blue-500 rounded' />
                                                    :
                                                    <div className='flex'>
                                                        <p className='mr-1'>Ends in</p>
                                                        <p>{currentData.data.phone[8]}{currentData.data.phone[9]}</p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full'>
                                <div className='border'>
                                    <div className='flex w-full justify-between border-b p-2 bg-blue-400 text-white font-semibold text-md'>
                                        <p>ADDRESS INFO</p>
                                        {(address || zipcode || country) &&
                                            <button onClick={submit}>
                                                <p className='font-semibold px-5 rounded bg-red-500 hover:bg-red-600'>UPDATE</p>
                                            </button>
                                        }
                                    </div>
                                    <div className='grid sm:grid-cols-2 grid-cols-1 bg-blue-300'>
                                        <div className='p-2 text-sm'>
                                            {editAddress ?
                                                (<div className='flex'>
                                                    <p className='text-gray-600 mr-2'>Change address:</p>
                                                    <input type='text' onChange={e => { setAddress(e.target.value) }} className='px-2 bg-blue-500 rounded' />
                                                </div>)
                                                :
                                                (<div className='flex'>
                                                    <p className='text-gray-600 mr-2'>Address:</p>
                                                    <p>{currentData.data.address}</p>
                                                </div>)
                                            }
                                            <button
                                                className='focus:outline-none'
                                                onClick={() => {
                                                    setEditAddress(!editAddress)
                                                    setAddress()
                                                }}>
                                                <p className='text-blue-500 hover:text-white'>Change my address</p>
                                            </button>
                                        </div>

                                        <div className='p-2 text-sm'>
                                            <div className='flex'>
                                                <p className='text-gray-600 mr-2'>Country:</p>
                                                {editCountry ?
                                                    <input type='text' onChange={e => { setCountry(e.target.value) }} className='px-2 bg-blue-500 rounded' />
                                                    :
                                                    <div className='flex'>
                                                        <p className='mr-1'>{currentData.data.country}</p>
                                                    </div>
                                                }
                                            </div>
                                            <button
                                                className='focus:outline-none'
                                                onClick={() => {
                                                    setEditCountry(!editCountry)
                                                    setCountry()
                                                }}>
                                                <p className='text-blue-500 hover:text-white'>Change country</p>
                                            </button>
                                        </div>
                                        
                                        <div className='p-2 text-sm'>
                                            <div className='flex'>
                                                <p className='text-gray-600 mr-2'>Zipcode:</p>
                                                {editZip ?
                                                    <input min='0' type='number' onChange={e => { setZipcode(e.target.value) }} className='px-2 bg-blue-500 rounded' />
                                                    :
                                                    <div className='flex'>
                                                        <p className='mr-1'>{currentData.data.zipcode}</p>
                                                    </div>
                                                }
                                            </div>
                                            <button
                                                className='focus:outline-none'
                                                onClick={() => {
                                                    setEditZip(!editZip)
                                                    setZipcode()
                                                }}>
                                                <p className='text-blue-500 hover:text-white'>Change my zipcode</p>
                                            </button>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className='w-full'>
                                <div className='border'>
                                    <div className='flex w-full justify-between border-b p-2 bg-blue-400 text-white font-semibold text-md'>
                                        <p>USER PROFILE</p>
                                        {(displayName || icon) &&
                                            <button onClick={submit}>
                                                <p className='font-semibold px-5 rounded bg-red-500 hover:bg-red-600'>UPDATE</p>
                                            </button>
                                        }
                                    </div>
                                    <div className='grid sm:grid-cols-2 grid-cols-1 bg-blue-300'>
                                        <div className='p-2 text-sm'>
                                            {editIcon ?
                                                (<div className='flex'>
                                                    <p className='text-gray-600 mr-2'>Change Icon (url):</p>
                                                    <input type='text' onChange={e => { setIcon(e.target.value) }} className='px-2 bg-blue-500 rounded' />
                                                </div>)
                                                :
                                                (<div className='flex'>
                                                    <img className='h-32 w-32 rounded-full object-cover' src={currentData.data.icon} alt={currentData.data.displayName} />
                                                </div>)
                                            }
                                            <button
                                                className='focus:outline-none'
                                                onClick={() => {
                                                    setEditIcon(!editIcon)
                                                    setIcon()
                                                }}>
                                                <p className='text-blue-500 hover:text-white'>Change my icon</p>
                                            </button>
                                        </div>

                                        <div className='p-2 text-sm'>
                                            <div className='flex'>
                                                {editDisplayName ? <p className='text-gray-600 mr-2'>Change display name:</p> : <p className='text-gray-800 mr-2'>Display name:</p>}
                                                {editDisplayName ?
                                                    <input type='text' onChange={e => { setName(e.target.value) }} className='px-2 bg-blue-500 rounded' />
                                                    :
                                                    <div className='flex'>
                                                        <p className='mr-1'>{currentData.data.displayName}</p>
                                                    </div>
                                                }
                                            </div>
                                            <button
                                                className='focus:outline-none'
                                                onClick={() => {
                                                    setEditDisplayName(!editDisplayName)
                                                    setName()
                                                }}>
                                                <p className='text-blue-500 hover:text-white'>Change my display name</p>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}



                    </div>
                </div>
            </div>
    }


    return (
        content
    )
}



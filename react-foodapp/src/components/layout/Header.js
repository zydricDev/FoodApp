import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import AuthOptions from '../auth/AuthOptions'
import LoggedInOptions from './LoggedInOptions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useTransition, animated } from 'react-spring'
import UserContext from '../../context/UserContext';


export default function Header() {
    let location = useLocation()
    let content = null
    const [windowWidth, setWindowWidth] = useState()
    const [showMenu, setShowMenu] = useState(false)
    const {userData, setUserData} = useContext(UserContext)
    const windowLimit = 700
    
    const history = useHistory();
    
    
    useEffect(() => {
        setWindowWidth(window.innerWidth)
        if (windowWidth > windowLimit && showMenu === true) {
            setShowMenu(false)
        }
        return () => {
            window.removeEventListener('resize', null)
        }

    }, [windowWidth, showMenu, userData])

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth)
    })

    const logout = () => {

        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
        
    }

    const menuTransitions = useTransition(showMenu, null, {
        from: { opacity: 0, transform: 'translateX(-100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
    })

    const maskTransitions = useTransition(showMenu, null, {
        from: {position: 'absolute', opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0},
    })

    if (location.pathname !== '/Landing') {
        content =
            <header className='flex justify-between border-b shadow-sm'>
                <div className='flex'>
                    <Link to='/'>
                        <h1 className='w-full sm:text-4xl py-5 text-red-500 hover:text-red-600 font-bold ml-5'>A FOOD APP</h1>
                    </Link>
                    <LoggedInOptions />
                </div>
                <div className='flex'>
                    {windowWidth > windowLimit ? <AuthOptions /> :
                        <button className='py-5 mr-5 focus:outline-none' onClick={() => { setShowMenu(true) }}>
                            <FontAwesomeIcon icon={faBars} className='text-3xl' />
                        </button>
                    }
                </div>

            {maskTransitions.map(({ item, key, props }) =>
                item &&
                <animated.div
                    key={key}
                    style={props}
                    className="bg-black-t-50 fixed top-0 left-0 w-full h-full z-50"
                    onClick={() => setShowMenu(false)}
                >
                </animated.div>
            )}

            {menuTransitions.map(({ item, key, props }) =>
                item &&
                <animated.div
                    key={key}
                    style={props}
                    className="fixed bg-white top-0 left-0 w-4/6 h-full z-50 shadow"
                >
                    <p className='text-3xl font-bold text-red-500 p-5'>Food app</p>
                    {
                        userData.user ? 
                        <button onClick={logout} 
                        className='text-left border-b border-gray-300 w-full bg-white py-2 hover:bg-blue-300 duration-200 text-xl'><p className='ml-5'>Logout</p></button>
                        :
                        <button onClick={() => history.push('/login')} 
                        className='text-left border-b border-gray-300 w-full bg-white py-2 hover:bg-blue-300 duration-200 text-xl'><p className='ml-5'>Sign in</p></button>
                    }

                    
                    
                    
                        
                    
                </animated.div>
            )}


            </header>
    } else {
        content = <></>
    }

    return (
        content
    )
}


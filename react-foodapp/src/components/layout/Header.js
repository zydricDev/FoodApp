import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthOptions from '../auth/AuthOptions'
import LoggedInOptions from './LoggedInOptions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useTransition, animated } from 'react-spring'

import HeaderOptions from '../mobileOptions/HeaderOptions'

export default function Header() {
    let location = useLocation()
    let content = null
    const [windowWidth, setWindowWidth] = useState()
    const [showMenu, setShowMenu] = useState(false)

    const windowLimit = 770


    useEffect(() => {
        setWindowWidth(window.innerWidth)
        if (windowWidth > windowLimit && showMenu === true) {
            setShowMenu(false)
        }
        return () => {
            window.removeEventListener('resize', null)
        }

    }, [windowWidth, showMenu])

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth)
    })



    const menuTransitions = useTransition(showMenu, null, {
        from: { opacity: 0, transform: 'translateX(-100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
    })

    const maskTransitions = useTransition(showMenu, null, {
        from: { position: 'fixed', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
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
                        <HeaderOptions />

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


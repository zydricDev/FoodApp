import React from 'react'

export default function Footer() {

    let content = undefined
    

    content = 
    <div className='w-full h-full bg-blue-500 text-white'>
        <div className='pt-5 px-5 sm:px-40 text-xl font-semibold'>
            <p>🍲 Hello! Welcome to my test-site for my Food App! 🍲</p>
        </div>
        <div className='w-full px-5 sm:px-40 pt-5'>
            <div className='border-t py-5'>
                <p>This site was coded and created by Zydric --- <a className='text-black font-semibold hover:text-white' href='https://github.com/zydricDev' rel="noreferrer" target='_blank'>https://github.com/zydricDev</a></p>
                
                <p>This site will continuously be re-worked, patched, and updated.</p>
                <p>❤️ Made by using React.js ❤️</p>
            </div>
        <div className='pt-5 flex gap-2 items-center'>
            <a href='https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=zydricw@gmail.com' rel="noreferrer" target='_blank'>
                <p className='text-black hover:text-white'>📧 zydricw@gmail.com 📧</p>
            </a>
        </div>
        </div>
        <div className='w-full p-5 sm:px-40 py-5'>
            <p className='border-t p-5'>© 2020 zydricDev All rights reserved.</p>
        </div>
    </div>

    return (
        content
    )
}

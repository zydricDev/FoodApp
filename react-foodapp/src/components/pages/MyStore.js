import React, {useState, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDollar, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import EditStoreItems from '../storeFeatures/EditStoreItems'
import StoreReport from '../storeFeatures/StoreReport'
import UserContext from '../../context/UserContext'
import ForbiddenPage from '../misc/ForbiddenPage'
import Analytics from '../storeFeatures/Analytics'


export default function MyStore() {
    let content = <ForbiddenPage></ForbiddenPage>
    
    const [view, setView] = useState('report')
    const user = useContext(UserContext)

    if(user.userData.user){
        content =
        <div className='w-full h-full flex-col'>
            <div className='w-full grid grid-cols-1 sm:flex p-5 gap-5 border-b border-gray-400 items-center bg-gray-200 '>
             
                <button className='bg-blue-500 rounded px-5 py-2 hover:bg-blue-600 text-white font-semibold' onClick={()=>setView('report')}>Store Report</button>
                <button className='bg-blue-500 rounded px-5 py-2 hover:bg-blue-600 text-white font-semibold' onClick={()=>setView('edit_items')}>Edit My Items</button>
                <button className='bg-blue-500 rounded px-5 py-2 hover:bg-blue-600 text-white font-semibold' onClick={()=>setView('analytics')}>View Analytics</button>
            </div>
    
            {view === 'report' &&
            <div className='w-full h-full border-b border-gray-400'>
                <div className='p-5 border-b border-gray-400 text-2xl font-bold flex items-center gap-2 text-blue-700'>
                    <p>Store Report</p>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                </div>
                
                <StoreReport usr_id={user.userData.user.id}/>
            </div>
            }
    
            {view === 'edit_items' && 
            <div>
                <div className='p-5 border-b border-gray-400 text-2xl font-bold flex items-center gap-2 text-blue-700'>
                    <p>Edit Store</p>
                    <FontAwesomeIcon icon={faEdit}/>
                </div>
                
                <EditStoreItems />
            </div>
            }

            {view === 'analytics' && 
            <div>
                <div className='p-5 border-b border-gray-400 text-2xl font-bold flex items-center gap-2 text-blue-700'>
                    <p>Analytics</p>
                    <FontAwesomeIcon icon={faCommentDollar}/>
                </div>

                
                <Analytics usr_id={user.userData.user.id}/>
            </div>
            }
            
        </div> 
    }
    
    

    return (
        content
    )
}

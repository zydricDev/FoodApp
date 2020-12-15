import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import Loader from '../misc/Loader'



export default function DisplayMap(props) {
    const [selected, setSelected] = useState(false)

    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)

    const [viewPort, setViewPort] = useState({
        latitude: lat,
        longitude: lng,
        width: '100%',
        height: '100vh',
        zoom: 2

    })
    

    const [data, setData] = useState({
        id: undefined,
        address: undefined,
        icon: undefined,
        name: undefined,
        phone: undefined,
        zipcode: undefined
    })

    let content = <Loader></Loader>
    if(!props.allNearby){
        content = 
        <>
            <ReactMapGL
                {...viewPort}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
            
                onViewportChange={viewPort =>{
                    setViewPort(viewPort)
                }}
                
            >
            </ReactMapGL>     
        </>
    }
    

    if(props.allNearby){
        
        content = 
        <>
            <ReactMapGL
                {...viewPort}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle={process.env.REACT_APP_MAPBOX_STYLE}

                
                onViewportChange={viewPort =>{
                    setViewPort(viewPort)
                }}
                
            >
                <Marker latitude={parseFloat(props.allNearby.origin.latitude)} longitude={parseFloat(props.allNearby.origin.longitude)} offsetLeft={-10} offsetTop={-35}>
                    <img src='https://www.flaticon.com/svg/static/icons/svg/1673/1673318.svg' alt='origin' className='w-10 h-10'/>
                </Marker>
                
                {props.allNearby.areaSearch.map((item, index)=>(
                    <Marker key={index} latitude={parseFloat(item.lat)} longitude={parseFloat(item.lng)} offsetLeft={-10} offsetTop={-35}>
                        <button 
                            onClick={()=>{
                                setSelected(!selected)
                                setData({
                                    id: item.id,
                                    address: item.address,
                                    icon: item.icon,
                                    name: item.name,
                                    phone: item.phone,
                                    zipcode: item.zipcode
                                })
                                setLat(item.lat)
                                setLng(item.lng)
                            }} 
                            className='focus:outline-none'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg' alt={item.id}/>
                        </button>
                    </Marker>
                ))}

                {selected && 
                <Popup latitude={parseFloat(lat)} longitude={parseFloat(lng)} onClose={()=>{setSelected(false)}} offsetLeft={0} offsetTop={-25}>
                    <div className='px-5 text-center w-64'>
                        <img src={data.icon} className='w-full h-20 object-cover' alt={data.icon}/>
                        <p className='font-medium text-xl'>{data.name}</p>
                        <p className='font-medium'>{data.address}</p>
                        <p className='font-medium'>Phone: ({data.phone.substring(0, 3)})-{data.phone.substring(3, 6)}-{data.phone.substring(6, 10)}</p>
                    </div>
                </Popup>}

            </ReactMapGL>     
        </>
       
    }
    
    
    return (
        content
    )
}

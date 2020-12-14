import React, { useRef, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import Loader from '../misc/Loader'


export default function MapDisplay(props) {
    const address = useRef(props.address)
    const name = useRef(props.name)
    const phone = useRef(props.phone)
    const icon = useRef(props.icon)
    const [selected, setSelected] = useState(false)

    let content = <Loader></Loader>
    const [viewPort, setViewPort] = useState({
        latitude: parseFloat(props.latitude),
        longitude: parseFloat(props.longitude),
        width: '100%',
        height: '30vh',
        zoom: 14

    })
    
    
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
                <Marker latitude={parseFloat(props.latitude)} longitude={parseFloat(props.longitude)} offsetLeft={-10} offsetTop={-35}>
                        <button onClick={()=>{setSelected(!selected)}} className='focus:outline-none'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg' alt={name.current}/>
                        </button>
                </Marker>
                    
                
                
                {selected && 
                <Popup latitude={parseFloat(props.latitude)} longitude={parseFloat(props.longitude)} onClose={()=>{setSelected(false)}} offsetLeft={0} offsetTop={-25}>
                    <div className='px-5 text-center w-40'>
                        <img src={icon.current} className='w-full h-20 object-cover' alt={name.current}/>
                        <p className='font-medium text-xl'>{name.current}</p>
                        <p className='font-medium'>{address.current}</p>
                        <p className='font-medium'>{phone.current}</p>
                    </div>
                </Popup>}
                </ReactMapGL>     
            </>

            


    return (
        content
    )
}




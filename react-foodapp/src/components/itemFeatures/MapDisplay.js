import React, { useEffect, useRef, useState } from 'react'
import { useAxiosGet } from '../../Hooks/HttpRequest'
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
        latitude: undefined,
        longitude: undefined,
        width: '100vw',
        height: '10vh',
        zoom: 14

    })
    const coor = useAxiosGet(props.url)
    
    if(coor.error){
        content = <Loader></Loader>
    }
    useEffect(()=>{
        if(coor.data){
            if(!coor.data.msg){
                const loadData = () =>{
                    setViewPort({
                        latitude: coor.data.coordinates.lat,
                        longitude: coor.data.coordinates.lng,
                        width: '100%',
                        height: '30vh',
                        zoom: 14
                    })
                }
                loadData()
            }
            
        }
 
    },[coor.data])
    
    if(coor.data){
        if(!coor.data.msg){
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
                <button onClick={()=>{setSelected(!selected)}}>
                    <Marker latitude={coor.data.coordinates.lat} longitude={coor.data.coordinates.lng} offsetLeft={-10} offsetTop={-35}>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg' alt={name.current}/>
                    </Marker>
                </button>
                
                {selected && 
                <Popup latitude={coor.data.coordinates.lat} longitude={coor.data.coordinates.lng} onClose={()=>{setSelected(false)}} offsetLeft={20}>
                    <div className='px-5 text-center w-40'>
                        <img src={icon.current} className='w-full h-20 object-cover' alt={name.current}/>
                        <p className='font-medium text-xl'>{name.current}</p>
                        <p className='font-medium'>{address.current}</p>
                        <p className='font-medium'>{phone.current}</p>
                    </div>
                </Popup>}
                </ReactMapGL>     
            </>
        }else{
            content = null
        }
        
    }

    return (
        content
    )
}




/*
mapboxgl.accessToken = mapboxtoken


export default function MapDisplay(props) {
    const address = useRef(props.address)
    const name = useRef(props.name)
    const phone = useRef(props.phone)
    const icon = useRef(props.icon)
    const [mount, setMount] = useState(false)
    let content = <Loader></Loader>

    useEffect(() => {
        setMount(true)
        let source = axios.CancelToken.source();
        const loadMap = async () =>{
            try{
                await axios.get(`${props.url}/${address.current}`, {
                    cancelToken: source.token
                }).then(res => {
                    const location = res.data;
                    if(location.msg){
                        setMount(false)
                    }else{
                        const map = new mapboxgl.Map({
                            container: document.getElementById('mapContainer'),
                            style: 'mapbox://styles/zdeveloper/ckijpming072e17pdmesr9mle',
                            center: [location.coordinates.lng, location.coordinates.lat],
                            zoom: 14
                        });
    
                        var el = document.createElement('img');
                        el.className = 'z-50';
                        el.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg'
    
                        new mapboxgl.Marker(el)
                        .setLngLat([location.coordinates.lng, location.coordinates.lat])
                        .setPopup(new mapboxgl.Popup({ offset: 25 })
                        .setHTML(`
                                <div class='text-center'>
                                    <img src=${icon.current}>
                                    <p class='text-xl p-1'>${name.current}</p>
                                    <p>Phone: (${phone.current.substring(0, 3)})-${phone.current.substring(3, 6)}-${phone.current.substring(6, 10)}</p>
                                    <p>${address.current}</p>
                                </div>
                        `))
                        .addTo(map);
                    }
                    
                    
                })
        
            }catch(err){
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                }else{
                    throw err
                } 
                
            }
            
        }
        loadMap()


        return () => {
            setMount(false)
            source.cancel('Unmounted')
        }
    }, [props])

   
    if(mount){
        content = <div id='mapContainer' className='w-full py-40' />
    }else{
        content = null
    }
    

    return (
        content
    )
}

*/


import React, { useEffect, useRef, useState } from 'react'

import mapboxgl from 'mapbox-gl'
import mapboxtoken from '../../mapboxtoken'
import axios from 'axios'
import Loader from '../misc/Loader'

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
                .catch(err =>{
                    if (axios.isCancel(err)) {
                        console.log('Request canceled', err.message);
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
    }, [props.url])

   
    if(mount){
        content = <div id='mapContainer' className='w-full py-40' />
    }else{
        content = null
    }
    

    return (
        content
    )
}


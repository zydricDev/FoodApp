import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import mapboxtoken from '../../mapboxtoken';
import axios from 'axios';
import domain from '../../domain'

mapboxgl.accessToken = mapboxtoken

export default class MapDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: undefined,
            lat: undefined,
            zoom: 14,
            name: 'thing 1',
            desc: 'thing 2',
            img: 'https://images.unsplash.com/photo-1607435654282-1803871a92fe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        };
    }

    state = {
        location: [] 
    }
    componentDidMount() {
        axios.get(`${domain}/map/display/9137 81st st, NY`)
        .then(res => {
            const location = res.data;
            this.setState({ 
                lng: location.coordinates.lng,
                lat: location.coordinates.lat
            });

            const map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/zdeveloper/ckijpming072e17pdmesr9mle',
                center: [this.state.lng, this.state.lat],
                zoom: this.state.zoom
            });
    
            map.on('move', () => {
                this.setState({
                    lng: map.getCenter().lng.toFixed(4),
                    lat: map.getCenter().lat.toFixed(4),
                    zoom: map.getZoom().toFixed(2)
                });
            });

            
            var el = document.createElement('img');
            el.className = 'z-50';
            el.src = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg'
           
            
            new mapboxgl.Marker(el)
                .setLngLat([this.state.lng, this.state.lat])
                .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                    <div class='text-center'>
                        <img src=${this.state.img}/>
                        <p class='text-xl p-1'>${this.state.name}</p>
                        <p>${this.state.desc}</p>
                    </div>
                `))
                .addTo(map);
        })
    
    }
    render() {    
        return (
            <div className='flex-col relative'>
                <div className='inline-block absolute top-0 right-0 left-0 bottom-0 m-12 z-10 p-5'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='absolute top-0 right-0 left-0 bottom-0 h-screen z-0' />
            </div>
        )
    }
}


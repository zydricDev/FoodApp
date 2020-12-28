import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2';
import Loader from '../misc/Loader'


import domain from '../../domain'
export default function Analytics(props) {
    let content = <Loader></Loader>
    let usr_id = props.usr_id

    const [myData, setData] = useState()

    useEffect(()=>{
        const load = async () =>{
            const result = await axios.get(`${domain}/analyze/popular/${usr_id}`, {
                headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
            })
            setData(result)
        }
        load()
    },[usr_id])

    try{
        if(myData.data){
            
            const data={
                labels: myData.data.qtySold.xAxis,
                datasets:[{
                    label: myData.data.qtySold.label,
                    backgroundColor: 'rgb(227, 32, 32, 0.5)',
                    borderColor: 'rgb(187, 21, 21)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgb(187, 21, 21, 0.7)',
                    hoverBorderColor: 'rgb(187, 21, 21)',
                    barPercentage: 0.4,
                    data: myData.data.qtySold.yAxis
                    
                }]
            }
                
            content = 
            <div>
                
                <Bar 
                    data= {data} 
                    options={{
                        scales: {
                          yAxes: [{
                            ticks: {
                              beginAtZero: true
                            }
                          }]
                        }
                    }}
                    
                />
            </div>
        }

    }catch(err){
        content = <Loader></Loader>
    }
    
    return (
        content
    )
}

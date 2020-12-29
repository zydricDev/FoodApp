import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2';
import Loader from '../misc/Loader'


import domain from '../../domain'
export default function Analytics(props) {
    let content = <Loader></Loader>
    let usr_id = props.usr_id

    const [myData, setData] = useState()
    const [year, setYear] = useState(0)
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
                labels: myData.data.qtySold.dataset[year].x,
                datasets:[{
                    label: myData.data.qtySold.dataset[year].year,
                    backgroundColor: 'rgb(227, 32, 32, 0.5)',
                    borderColor: 'rgb(187, 21, 21)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgb(187, 21, 21, 0.7)',
                    hoverBorderColor: 'rgb(187, 21, 21)',
                    barPercentage: 0.4,
                    data: myData.data.qtySold.dataset[year].y
                }]
            }
                
            content = 
            <div>
                <div className='flex w-full p-5 border-b border-gray-400 text-2xl font-bold text-gray-500 gap-5 items-center'>
                    <p>History from Year:</p>
                    {myData.data.qtySold.dataset
                    .sort((a,b)=>{
                        return parseInt(a.year) - parseInt(b.year)
                    })  
                    .map((item, index) => 
                        <button className='bg-blue-500 text-white text-lg font-semibold px-5 py-2 rounded' onClick={()=>{setYear(index)}}>{item.year}</button>
                    
                    )}
                    
                
                </div>
                
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

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Bar, Line, } from 'react-chartjs-2';
import Loader from '../misc/Loader'


import domain from '../../domain'
export default function Analytics(props) {
    let content = <Loader></Loader>
    let usr_id = props.usr_id
    let comparison_data = undefined

    const [myData, setData] = useState()
    const [compareData, setCompareData] = useState()
    const [canCompare, setCanCompare] = useState(false)

    const [availableYears, setAvailableYears] = useState()
    const [year1, setYear1] = useState('2020')
    const [year2, setYear2] = useState('2021')

    const [year, setYear] = useState(0)
    
    useEffect(()=>{
        const load = async () =>{
            const result = await axios.get(`${domain}/analyze/popular/${usr_id}`, {
                headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
            })
            setData(result)

            const availableYearResult = await axios.get(`${domain}/analyze/comparison/available/${usr_id}`, {
                headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
            })
            setAvailableYears(availableYearResult)

            const comparisonResult = await axios.get(`${domain}/analyze/comparison/${usr_id}?year1=${year1}&year2=${year2}`, {
                headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
            }).catch(
               setCanCompare(false)
            )
            if(comparisonResult){
                setCompareData(comparisonResult)
                setCanCompare(true)
            }
            
        }
        load()
    },[usr_id, year1, year2])

    try{
        if(myData.data){
            
            const quantity_data={
                labels: myData.data.qtySold.dataset[year].x,
                datasets:[{
                    label: myData.data.qtySold.dataset[year].label,
                    backgroundColor: 'rgb(227, 32, 32, 0.5)',
                    borderColor: 'rgb(187, 21, 21)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgb(187, 21, 21, 0.7)',
                    hoverBorderColor: 'rgb(187, 21, 21)',
                    barPercentage: 0.4,
                    data: myData.data.qtySold.dataset[year].y
                }]
            }

            const revenue_data = {
                labels: myData.data.totalRevenue.dataset[year].x,
                datasets:[{
                    label: myData.data.totalRevenue.dataset[year].label,
                    backgroundColor: 'rgb(33, 101, 202, 0.5)',
                    borderColor: 'rgb(33, 74, 202)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgb(33, 37, 202, 0.7)',
                    hoverBorderColor: 'rgb(33, 84, 202)',
                    barPercentage: 0.4,
                    data: myData.data.totalRevenue.dataset[year].y
                }]
            }

            if(canCompare){
                comparison_data = {
                    labels: compareData.data.comparisonSet.dataset[0].x,
                    datasets:[{
                        label: compareData.data.comparisonSet.dataset[0].label,
                        backgroundColor: 'rgb(33, 101, 202, 0.5)',
                        borderColor: 'rgb(33, 74, 202)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgb(33, 37, 202, 0.7)',
                        hoverBorderColor: 'rgb(33, 84, 202)',
                        barPercentage: 0.4,
                        data: compareData.data.comparisonSet.dataset[0].y
                    },
                    {
                        label: compareData.data.comparisonSet.dataset[1].label,
                        backgroundColor: 'rgb(227, 32, 32, 0.5)',
                        borderColor: 'rgb(187, 21, 21)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgb(187, 21, 21, 0.7)',
                        hoverBorderColor: 'rgb(187, 21, 21)',
                        barPercentage: 0.4,
                        data: compareData.data.comparisonSet.dataset[1].y
                    },
                    {
                        label: compareData.data.averageLabel,
                        type:'line',
                        backgroundColor: 'rgb(33, 101, 202, 0.5)',
                        borderColor: 'rgb(33, 74, 202)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgb(33, 37, 202, 0.7)',
                        hoverBorderColor: 'rgb(33, 84, 202)',
                        barPercentage: 0.4,
                        data: compareData.data.averageSet
                    }]
                }
            }
            
                
            content = 
            <div>
                <div className='flex w-full p-5 border-b border-gray-400 text-2xl font-bold text-gray-500 gap-5 items-center'>
                    <p>Purchases from Year:</p>
                    {myData.data.qtySold.dataset
                    .sort((a,b)=>{
                        return parseInt(a.year) - parseInt(b.year)
                    })  
                    .map((item, index) => 
                        <button key={index} className='bg-blue-500 text-white text-lg font-semibold px-5 py-2 rounded' onClick={()=>{setYear(index)}}>{item.year}</button>
                    
                    )}
                    
                
                </div>
                <div className='grid grid-cols-1 gap-5'>
                    <div>
                        <Bar 
                            data={quantity_data}
                            width={10}
                            height={2} 
                            options={{
                                scales: {
                                yAxes: [{
                                    ticks: {
                                    beginAtZero: true
                                    },

                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Quantity'
                                    }
                                }]
                                }
                            }} 
                        />
                    </div>
                    <div>
                        <Line
                            data={revenue_data}
                            width={10}
                            height={2}
                            options={{
                                scales: {
                                
                                yAxes: [{
                                    ticks: {
                                        callback: function(value, index, values) {
                                            return '$' + value.toFixed(2);
                                        }
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Revenue in $ units'
                                    }
                                }]
                                }
                            }} 
                        />
                        <div>
                            <p>{myData.data.totalRevenue.dataset[year].totalRevenue}</p>
                        </div>
                    </div>
                    {(canCompare) ?
                    <div>
                        <div className='flex items-center'>
                            <select value={year1} onChange={e => setYear1(e.target.value)}>
                            {availableYears.data.map((item, index) =>
                                <option key={index} value={item}>{item}</option>    
                            )}
                            </select>
                            <select value={year2} onChange={e => setYear2(e.target.value)}>
                            {availableYears.data.map((item, index) =>
                                <option key={index} value={item}>{item}</option>    
                            )}
                            </select>
                        </div>
                        <Bar 
                            data={comparison_data}
                            width={10}
                            height={2} 
                            options={{
                                scales: {
                                
                                yAxes: [{
                                    ticks: {
                                        callback: function(value, index, values) {
                                            return '$' + value.toFixed(2);
                                        }
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Revenue in $ units'
                                    }
                                }]
                                }
                            }}    
                        />
                    </div>
                    :
                    null
                    }
                </div>
                
                
            </div>
        }

    }catch(err){
        content = <Loader></Loader>
    }
    
    return (
        content
    )
}

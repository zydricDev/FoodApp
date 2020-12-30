import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import axios from 'axios'
import ComparisonChart from './AnalyticsCharts/ComparisonChart'
import YearlyChart from './AnalyticsCharts/YearlyChart'
import Loader from '../misc/Loader'
import NoDataPage from '../misc/NoDataPage'
import domain from '../../domain'

export default function Analytics(props) {
    let content = <Loader></Loader>
    let usr_id = props.usr_id
    let comparison_data = undefined
    const history = useHistory()

    const [myData, setData] = useState()
    const [compareData, setCompareData] = useState()
    const [canCompare, setCanCompare] = useState(false)

    const [availableYears, setAvailableYears] = useState()
    const [year1, setYear1] = useState('2020')
    const [year2, setYear2] = useState('2021')

    const [year, setYear] = useState(0)
    
    useEffect(()=>{
        const load = async () =>{

            const availableYearResult = await axios.get(`${domain}/analyze/comparison/available/${usr_id}`, {
                headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
            })
           
            setAvailableYears(availableYearResult)

            const result = await axios.get(`${domain}/analyze/yearly/${usr_id}`, {
                headers: { "zdevsite.usrtkn": localStorage.getItem('zdevsite.usrtkn') }
            })
            setData(result)

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
    },[usr_id, year1, year2, history])

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
                        backgroundColor: 'rgb(113, 5, 193, 0.5)',
                        borderColor: 'rgb(93, 2, 149)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgb(113, 5, 193, 0.7)',
                        hoverBorderColor: 'rgb(75, 1, 120)',
                        barPercentage: 0.4,
                        data: compareData.data.averageSet
                    }]
                }
            }
            
                
            content = 
            <div className='grid grid-cols-1 gap-20 '>
                <div>
                    <div className='flex w-full p-5 font-bold gap-5 items-center text-gray-600'>
                        <p>Analyze for year</p>
                        {myData.data.qtySold.dataset
                        .sort((a,b)=>{
                            return parseInt(a.year) - parseInt(b.year)
                        })  
                        .map((item, index) => 
                            <button key={index} className='bg-blue-500 font-semibold px-5 py-2 rounded text-white hover:bg-blue-600' onClick={()=>{setYear(index)}}>{item.year}</button>
                        )}
                    </div>
                    <YearlyChart qtyData={quantity_data} revenueData={revenue_data} total={myData.data.totalRevenue.dataset[year].totalRevenue} totalQty={myData.data.qtySold.dataset[year].total_quantity}/>
                </div>
                <div className=''>
                    <p className='p-5  border-t border-gray-400 font-bold text-gray-600'>Revenue comparison between {year1} and {year2}</p>
                    {(canCompare) ? 
                    <>
                        <div className='flex items-center w-full'>
                            <div className='flex px-5 py-2 items-center gap-2'>
                                <p>Compare Year</p>
                                <select className='border border-black p-2 rounded' value={year1} onChange={e => setYear1(e.target.value)}>
                                    {availableYears.data.map((item, index) =>
                                        <option key={index} value={item}>{item}</option>    
                                    )}
                                </select>
                            </div>
                            <div className='flex px-5 py-2 items-center gap-2'>
                                <p>with year</p>
                                <select className='border border-black p-2 rounded' value={year2} onChange={e => setYear2(e.target.value)}>
                                    {availableYears.data.map((item, index) =>
                                        <option key={index} value={item}>{item}</option>    
                                    )}
                                </select>
                            </div>
                                
                        </div>
                    <ComparisonChart data={comparison_data} rawData={compareData.data.comparisonSet.dataset}/>
                    </> : null}
                </div>
                
                
            </div>
        }

    }catch(err){
        
        if(!availableYears && !myData){
            content = <NoDataPage reason={'No items were sold to make an analysis'}></NoDataPage>
        }
        if(availableYears || myData){
            content = <Loader></Loader>
        }
        
        
    }
    
    return (
        content
    )
}

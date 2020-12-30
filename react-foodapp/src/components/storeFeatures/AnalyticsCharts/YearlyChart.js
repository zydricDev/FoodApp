import React from 'react'
import Loader from '../../misc/Loader'
import { HorizontalBar, Line, } from 'react-chartjs-2';

export default function YearlyChart(props) {

    

    const quantity_data = props.qtyData
    const revenue_data = props.revenueData
    const totalRevenue = props.total
    const totalQuantity = props.totalQty
    let content = <Loader></Loader>
    


    try {
        content =
            <div>
                <div className='px-5'>
                    <HorizontalBar
                        data={quantity_data}
                        width={10}
                        height={5}
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
                <div className='flex w-full py-2 sm:p-5 text-white'>
                    <div className='bg-blue-500 rounded p-5 grid grid-cols-1 gap-2 w-full'>
                        <div className='grid grid-cols-1 sm:flex gap-2'>
                            <p>Total Quantity</p>
                            <p className='bg-white rounded px-2 text-gray-700'>{totalQuantity}</p>
                        </div>
                        
                    </div>
                </div>
                </div>
                
                <div className='px-5'>
                    <Line
                        data={revenue_data}
                        width={10}
                        height={5}
                        options={{

                            scales: {
                                yAxes: [{
                                    ticks: {
                                        callback: function (value, index, values) {
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
                    <div className='flex w-full py-2 sm:p-5 bg-white text-white'>
                        <div className='bg-blue-500 rounded p-5 grid grid-cols-1 gap-2 w-full'>
                            <div className='grid grid-cols-1 sm:flex gap-2'>
                                <p>Total Revenue Earned</p>
                                <p className='bg-white rounded px-2 text-gray-700'>${totalRevenue}</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
    }
    catch(err){
        content = <Loader></Loader>
    }
    return (
        content
    )
}

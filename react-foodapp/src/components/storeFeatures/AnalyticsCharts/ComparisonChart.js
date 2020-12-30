import React from 'react'
import { Bar } from 'react-chartjs-2';
import Loader from '../../misc/Loader'

export default function ComparisonChart(props) {
    const comparison_data = props.data
    const raw_data = props.rawData
    let content = <Loader></Loader>


    try {
        content =
            <div className='px-5'>
                <Bar
                    data={comparison_data}
                    width={10}
                    height={5}
                    options={{
                        elements: {
                            line: {
                                tension: 0
                            }
                        },
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
                <div className='flex w-full p-5 bg-white text-white'>
                    <div className='bg-blue-500 rounded p-5 sm:grid grid-cols-1 sm:grid-cols-3 gap-2 w-full'>
                        <div className='grid grid-cols-1 sm:flex gap-2'>
                            <p>Revenue made in {raw_data[0].year}</p>
                            <p className='bg-white rounded px-2 text-gray-700'>${raw_data[0].totalRevenue}</p>
                        </div>
                        <div className='grid grid-cols-1 sm:flex gap-2'>
                            <p>Revenue made in {raw_data[1].year}</p>
                            <p className='bg-white rounded px-2 text-gray-700'>${raw_data[1].totalRevenue}</p>
                        </div>
                        <div className='grid grid-cols-1 sm:flex gap-2'>
                            <p>Average Revenue made in ({raw_data[0].year} & {raw_data[1].year})</p>
                            <p className='bg-white rounded px-2 text-gray-700'>${(((parseFloat(raw_data[0].totalRevenue) + parseFloat(raw_data[1].totalRevenue))/2)).toFixed(2)}</p>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
    } catch (err) {
        <Loader></Loader>
    }
    return (
        content
    )
}

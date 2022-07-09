import React, { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2'
import { useSelector } from "react-redux";
ChartJS.register(...registerables);
const Chart = () => {
    
    const state = useSelector((state)=>state);
    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])

    

    const reading = state.reading['data']
    
    const update = () => {
        var temp = new Map();
        for(var i=0; i<reading.length; i++) {
            var value = reading[i]['span']
            var label = reading[i]['turned_on'].substr(0, 10)
            console.log(label, value)
            if(temp.has(label)) temp.set(label, temp.get(label)+value)
            else temp.set(label, value)
        }
        
        temp = new Map([...temp.entries()].sort());

        var t_l = []
        var t_d = []
        temp.forEach (function(value, key) {
            t_l.push(key);
            t_d.push(value);
        })

        setLabels(t_l);
        setData(t_d);
    }

    useEffect(() => {
        update()
    }, [reading])
    

    return (
        <>
        <div style={{margin: '5% 25%'}}>
            <Bar
                datasetIdKey='id'
                data={{
                    labels: labels,
                    datasets: [{
                    label: 'TOTAL RUNNING HOURS',
                    data: data,
                    fill: false,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.4)'
                    ],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    }]
                }}
            />
        </div>
        
        <div style={{margin: '5%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
    
            <div>
                <Doughnut 
                    data = {{
                        labels: [
                        'Red',
                        'Blue',
                        'Yellow'
                        ],
                        datasets: [{
                        label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                        }],
                    }}
                />
            </div>
                
            <div>
                <Doughnut 
                    data = {{
                        labels: [
                        'Red',
                        'Blue',
                        'Yellow'
                        ],
                        datasets: [{
                        label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                        }],
                    }}
                />
            </div>

            <div>
                <Doughnut 
                    data = {{
                        labels: [
                        'Red',
                        'Blue',
                        'Yellow'
                        ],
                        datasets: [{
                        label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                        }],
                    }}
                />
            </div>
            
        </div>
        </>
    )
}

export default Chart;
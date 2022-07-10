import React, { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { useSelector } from "react-redux";
import { parse } from "date-fns";
ChartJS.register(...registerables);
const Chart = () => {
    
    const state = useSelector((state)=>state);
    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])
    const [crt, setCrt] = useState([])
    const [volt, setVolt] = useState([])
    const [runningHours, setRunningHours] = useState(0);
    const [remainingHours, setRemainingHours] = useState(0);

    const [totalPowerConsumption, setTotalPowerConsumption] = useState(0); 

    const reading = state.reading['data']
    
    const update = () => {
        var temp = new Map();
        var vi = new Map();
        var time_period = 0;
        var power_consumed = 0;
        for(var i=0; i<reading.length; i++) {
            var value = parseFloat(reading[i]['span'])
            var label = reading[i]['turned_on'].substr(0, 10)

            var crt = parseFloat(reading[i]['current'])
            var volt = parseFloat(reading[i]['voltage'])
            crt = crt.toFixed(2)
            volt = volt.toFixed(2)

            if(!vi.has(crt)) vi.set(crt, volt)
            else vi.set(crt, vi.get(crt)+volt)

            if(temp.has(label)) temp.set(label, temp.get(label)+value)
            else temp.set(label, value)
            
            time_period += value

            power_consumed += parseFloat(reading[i]['power'])*value;
        }
        
        temp = new Map([...temp.entries()].sort());
        vi = new Map([...vi.entries()].sort());

        var t_l = []
        var t_d = []
        temp.forEach (function(value, key) {
            t_l.push(key);
            t_d.push(value);
        })

        var t_c = []
        var t_v = []
        vi.forEach (function(value, key) {
            t_c.push(key);
            t_v.push(value);
        })

        time_period = time_period.toFixed(2);

        var total_period = parseFloat((state.time['max']-state.time['min'])/3600000);
        total_period = total_period.toFixed(2);


        power_consumed = power_consumed.toFixed(2)

        setTotalPowerConsumption(power_consumed)

        setRunningHours(time_period);
        setRemainingHours(total_period-time_period)

        setCrt(t_c);
        setVolt(t_v);

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
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    },]
                }}
                options={ {
                    scales: {
                        yAxes: {
                            title: {
                                display: true,
                                text: 'Running Hours',
                                font: {
                                    size: 15
                                }
                            },
                            ticks: {
                                precision: 0
                            }
                        },
                        xAxes: {
                            title: {
                                display: true,
                                text: 'Date Time',
                                font: {
                                    size: 15
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                        }
                    }
                }}
            />
        </div>

        <div style={{margin: '5% 25%'}}>
            <Line
                datasetIdKey='id'
                data={{
                    labels: crt,
                    datasets: [{
                      label: 'V vs I',
                      data: volt,
                      fill: false,
                      borderColor: 'rgb(75, 192, 192)',
                      tension: 0.1
                    }]
                  }}
                  options={ {
                    scales: {
                        yAxes: {
                            title: {
                                display: true,
                                text: 'Voltage',
                                font: {
                                    size: 15
                                }
                            },
                            ticks: {
                                precision: 0
                            }
                        },
                        xAxes: {
                            title: {
                                display: true,
                                text: 'Current',
                                font: {
                                    size: 15
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                        }
                    }
                }}
            />
        </div>
        
        <div style={{margin: '5%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
    
            <div>
                <Doughnut 
                    data = {{
                        labels: [
                        'Device hr (On)',
                        'Device hr (Off)',
                        ],
                        datasets: [{
                        label: 'On vs Off',
                        data: [runningHours, remainingHours],
                        backgroundColor: [
                            '#9EB23B',
                            '#E8AA42'
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
                        '',
                        'Watts',
                        ],
                        datasets: [{
                        label: 'Total Power Consumed',
                        data: [totalPowerConsumption/5, totalPowerConsumption],
                        backgroundColor: [
                            '#F0EBE3',
                            '#C689C6',
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
                        '',
                        'Units',
                        ],
                        datasets: [{
                        label: 'Total Units',
                        data: [totalPowerConsumption/250, totalPowerConsumption/1000],
                        backgroundColor: [
                            '#F0EBE3',
                            '#937DC2',
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
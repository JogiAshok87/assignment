import React, { useState, useEffect } from 'react';

import Chart from 'chart.js/auto';
import { SiBitcoinsv } from "react-icons/si";
import {BsInfoCircle} from 'react-icons/bs';
import MetaMaskIntegration from '../MetaMaskIntegration'
import './index.css';


const Home = () => {
    
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [populationData, setPopulationData] = useState([]);

    /*Fetching poupulation data from API to display in graph*/ 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const labels = data.data.map(entry => entry.Year);
                const population = data.data.map(entry => entry.Population);
                const chartData = {
                    labels: labels,
                    datasets: [{
                        label: 'Population',
                        data: population,
                        borderColor: 'green',
                        tension: 0.4,
                        fill: false
                    }]
                };
                setPopulationData(chartData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const ctx = document.getElementById('population-chart');
        if (ctx && populationData.labels && populationData.labels.length > 0) {
            Chart.getChart(ctx)?.destroy();
            new Chart(ctx, {
                type: 'line',
                data: populationData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: false,
                            suggestedMin: 300000000, 
                            ticks: {
                                callback: function(value, index, values) {
                                    return value.toLocaleString(); 
                                }
                            },
                            title: {
                                display: true,
                                text: 'Population'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Year'
                            }
                        }
                    }
                }
            });
        }
    }, [populationData]);

    /*Fetching data from API for crypto currency*/
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPrices(data.bpi);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    

   
   
    return (
        <div className="Home-container">
            <div className='header-part'>
                <div className='headings'>
                    <h1>Hello, <span>Brookly Simmons</span></h1>
                    <p>Welcome to <span>Spot trading</span></p>
                </div>
                <button className='btn'>Start Trading</button>
            </div>

            {/* Market Overview in graph*/}
            <div className='market-Overview-card'>
                <div className='market-overview-header-part'>
                    <h1>Market Overview</h1>
                    <p>NDST EPT WPCT RET WET</p>
                </div>
                <hr />
                <div className='graph-bg'>
                   <h2 className='graph-heading'>Population Data in Different Nations in Different years</h2>
                    <canvas id="population-chart" width="600" height="200"></canvas>
                </div>


             {/* crypto currency display constainer */}
            <h1 className='crypto-container-heading'>Assets</h1>
            <div className="crypto-container">
                
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    Object.keys(prices).map((currency) => (
                    <div className="crypto-card" key={currency}>
                        <h2><SiBitcoinsv className='btc'/>{currency}</h2>
                        <p className="description">{prices[currency].description}</p>
                        
                        <p dangerouslySetInnerHTML={{ __html: `${prices[currency].rate} ${prices[currency].symbol}` }}></p>

                        <div className='prices-container'>
                            <BsInfoCircle className='info'/>
                            <button type='button' className='trade-btn'>Trade</button>
                        </div>
                    </div>
                    ))
                )}
            </div>
            <MetaMaskIntegration />
        </div>
    </div>
    );
};

export default Home;

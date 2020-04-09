import React, { Fragment } from 'react';
import Axios from 'axios';
import Loader from './Loader';
import {Bar, Line, Pie, Doughnut} from 'react-chartjs-2';
import '../style.css';
import { Component } from 'react';
import Media from 'react-media';


class Chart extends Component{

    constructor(props){
        super(props);

        this.state = {
            chartData:{
                labels: ['USA', 'Italy', 'France', 'Germany', 'Spain'],
                datasets:[
                    {
                        label: 'Confirmed',
                        data:[
                            400000, 100000, 100000, 70000, 120000
                        ],
                        backgroundColor: ['rgba(255, 32, 32, .7)', 'rgba(32, 255, 32, .7)', 'rgba(32, 32, 255, .7)', 'rgba(255, 82, 65, .7)', 'rgba(255, 255, 32, .7)']
                    }
                ]
            },

            totalConfirmed: 0,
            totalRecovered: 0,
            totalDeaths: 0,
            loading: true,
            countries: [],

            globalPieData:{
                labels: ['Active', 'Recovered', 'Deaths'],
                datasets:[
                    {
                        label: 'Global Cases',
                        data:[
                            100, 30, 5
                        ],
                        backgroundColor: ['rgba(90, 189, 202, 0.603)', 'rgba(81, 161, 44, 0.603)', 'rgba(223, 71, 71, .9)']
                    }
                ]
            },

            totalLineChart:{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                datasets: [
                  {
                    label: '2020 COVID-19 Cases',
                    borderColor: '#caf9cf',
                    data: [65, 59, 80, 81],
                    fill: false,

                  }
                ]
              }
            
        }
    }

    componentDidMount(){
        this.getData();
    }

    async getData() {
        const resApi = await Axios.get("https://covid19.mathdro.id/api");
        const USConfirmed = await Axios.get("https://covid19.mathdro.id/api/countries/US");
        const italyConfirmed = await Axios.get("https://covid19.mathdro.id/api/countries/italy");
        const franceConfirmed = await Axios.get("https://covid19.mathdro.id/api/countries/france");
        const germanyConfirmed = await Axios.get("https://covid19.mathdro.id/api/countries/germany");
        const spainConfirmed = await Axios.get("https://covid19.mathdro.id/api/countries/spain");

        //Bar chart for US, Italy, France, Germany, and Spain
        this.state.chartData.datasets[0].data[0] = USConfirmed.data.confirmed.value;
        this.state.chartData.datasets[0].data[1] = italyConfirmed.data.confirmed.value;
        this.state.chartData.datasets[0].data[2] = franceConfirmed.data.confirmed.value;
        this.state.chartData.datasets[0].data[3] = germanyConfirmed.data.confirmed.value;
        this.state.chartData.datasets[0].data[4] = spainConfirmed.data.confirmed.value;

        //Global Pie Chart for recovered, active, and dead
        this.state.globalPieData.datasets[0].data[1] = resApi.data.recovered.value;
        this.state.globalPieData.datasets[0].data[2] = resApi.data.deaths.value;
        this.state.globalPieData.datasets[0].data[0] = resApi.data.confirmed.value - (this.state.globalPieData.datasets[0].data[1] + this.state.globalPieData.datasets[0].data[2]);

        this.setState({
            // countries: countries,
            loading: false
        });

    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }

    render(){
        return(
            <div className="chart">

                <div>
                        <Media queries={{ small: { maxWidth: 900 } }}>
                        {matches =>
                            matches.small ? ( //less than
                            
                                <div>
                                <Pie
                                    data={this.state.globalPieData}
                                    width={10}
                                    height={10}
                                    options={{ maintainAspectRatio: true, 
                                            title:{
                                                display: this.props.displayTitle,
                                                text: 'Global Cases',
                                                fontSize: 25,
                                                fontColor: 'white'
                                            },
                                            legend:{
                                                display: this.props.displayLegend,
                                                position: 'bottom'
                                            }
                                }}
                                />
                                <br/>
                                <Bar
                                    data={this.state.chartData}
                                    width={50}
                                    height={40}
                                    options={{ maintainAspectRatio: true, 
                                            title:{
                                                display: this.props.displayTitle,
                                                text: 'Top Countries With Confirmed Cases',
                                                fontSize: 25,
                                                fontColor: 'white'
                                            },
                                            legend:{
                                                display: false,
                                                position: this.props.legendPosition
                                            }
                                }}
                                />
                                <br/>
                                </div>

                            ) : ( //Greater than
                                <div>
                                <Pie
                                    data={this.state.globalPieData}
                                    // width={10}
                                    // height={10}
                                    options={{ maintainAspectRatio: true, 
                                            title:{
                                                display: this.props.displayTitle,
                                                text: 'Global Cases',
                                                fontSize: 25,
                                                fontColor: 'white'
                                            },
                                            legend:{
                                                display: this.props.displayLegend,
                                                position: this.props.legendPosition
                                            }
                                }}
                                />
                                <br/>
                                <Bar
                                    data={this.state.chartData}
                                    // width={50}
                                    // height={50}
                                    options={{ maintainAspectRatio: true, 
                                            title:{
                                                display: this.props.displayTitle,
                                                text: 'Top Countries With Confirmed Cases',
                                                fontSize: 25,
                                                fontColor: 'white'
                                            },
                                            legend:{
                                                display: false,
                                                position: this.props.legendPosition
                                            }
                                }}
                                />
                                <br/>
                                </div>
                            )
                        }
                        </Media>
                    </div>

                {/*<Pie
                    data={this.state.globalPieData}
                    // width={10}
                    // height={10}
                    options={{ maintainAspectRatio: true, 
                              title:{
                                  display: this.props.displayTitle,
                                  text: 'Global Cases',
                                  fontSize: 25,
                                  fontColor: 'white'
                              },
                              legend:{
                                  display: this.props.displayLegend,
                                  position: this.props.legendPosition
                              }
                }}
                />
                <br/>
                <Bar
                    data={this.state.chartData}
                    // width={50}
                    // height={50}
                    options={{ maintainAspectRatio: true, 
                              title:{
                                  display: this.props.displayTitle,
                                  text: 'Top Countries With Confirmed Cases',
                                  fontSize: 25,
                                  fontColor: 'white'
                              },
                              legend:{
                                  display: false,
                                  position: this.props.legendPosition
                              }
                }}
                />
                <br/>
                 <Line
                    data={this.state.totalLineChart}
                    // width={600}
                    // height={250}
                    options={{ maintainAspectRatio: true, 
                              title:{
                                  display: this.props.displayTitle,
                                  text: '2020 COVID-19 Cases',
                                  fontSize: 25,
                                  fontColor: 'white'
                              },
                              legend:{
                                  display: this.props.displayLegend,
                                  position: 'top'
                              },

                }}
                />
                <br/> */}
                
            </div>
        )
    }
}

export default Chart;
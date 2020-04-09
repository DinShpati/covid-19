import React from 'react';
import Axios from 'axios';
import Loader from './Loader';
import Chart from './Charts'
import '../style.css';

export default class App extends React.Component {

    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: [],
        countriesConfirmed: [],
        countriesRecovered: [],
        countriesDeaths: [],
        top10Countries: [],
        top10Confirmed: [],
        loading: true
    }

    async componentDidMount(){
        this.getData();
        this.getCountryData();
    }

    async getData(){
        const resApi = await Axios.get("https://covid19.mathdro.id/api");
        const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
        const countries = [];
        for(var i = 0; i < resCountries.data.countries.length; i++){
            
            countries.push(resCountries.data.countries[i].name);
        }

        this.setState({
            confirmed: resApi.data.confirmed.value,
            recovered: resApi.data.recovered.value,
            deaths: resApi.data.deaths.value,
            countries: countries
        });

        //set loader to false/stop
        this.setState({
            loading: false
        });
    }

    async getCountryData(){

        const countriesConfirmed = [];
        const countriesRecovered = [];
        const countriesDeaths = [];

        for(var i = 0; i < 179; i++){
            try{
                const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${this.state.countries[i]}`);
                countriesConfirmed.push(res.data.confirmed.value);
                countriesRecovered.push(res.data.recovered.value);
                countriesDeaths.push(res.data.deaths.value);
                
            }catch(err){
                if(err.response.status === 404){
                        countriesConfirmed.push("NaN");
                        countriesConfirmed.push("NaN");
                        countriesConfirmed.push("NaN");
                }
            }
        }

        this.setState({
            countriesConfirmed: countriesConfirmed,
            countriesRecovered: countriesRecovered,
            countriesDeaths: countriesDeaths
        });

        //Getting top 10
        const confirmedCases = [];
        confirmedCases.push(...countriesConfirmed);
        confirmedCases.sort(function(a, b){return a-b});

        let length = confirmedCases.length;
        let top10 = confirmedCases.slice(Math.max(length - 10, 0))
        const countryPosition = [];

        for(let i = 0; i < this.state.countriesConfirmed.length; i++){
            let current = this.state.countriesConfirmed[i];
            for(let j = 0; j < top10.length; j++){
                if(current === top10[j]){
                    countryPosition.push(i);
                }
            }
        }

        this.setState({
            top10Countries: countryPosition//,
            // top10Confirmed: top10
        });

        
    }

    renderCountryOptions(){

        // var top10 = new Array(2);
        // top10[0] = this.state.top10Countries;
        // top10[1] = this.state.top10Confirmed;
        // top10.sort(function(a,b){
        //     return a[1] - b[1];
        // });

        var top10 = []
        top10 = this.state.top10Countries;

        var top10Names = [];
        var top10Confirmed = [];
        //var orderedPositions = [];
        
        var returnStuff = [];
        
        for(let i = 0; i < top10.length; i++){
            console.log(top10[i]);
            top10Names.push(this.state.countries[top10[i]]);
            top10Confirmed.push(this.state.countriesConfirmed[top10[i]]);
        }

        // for(let i = 0; i < this.state.countriesConfirmed.length; i++){
        //     for(let j = 0; j < top10.length; j++){
        //         if(this.state.countriesConfirmed[i] > top10Confirmed[j]){
        //             console.log(this.state.countriesConfirmed[i] + " > " + top10Confirmed[j]);
        //             console.log(i);
        //         }
        //     }
        // }

        return returnStuff;

    }

    //returnStuff.push(<li className="top10" key={i}>{ this.state.countries[top10[i]] }</li>);

    isLoading(){
        if (this.state.loading) {return <Loader />}
    } 

    render(){
        return (
                <div className="container">
                    {this.isLoading()}
                    <h1 className="mainHeader"><img src="https://p3cdn4static.sharpschool.com/UserFiles/Servers/Server_1051846/Image/News/coronavirus.png" alt="." style={{maxWidth: '50px'}}/>Stats</h1>

                    <div className="container3">
                        <img src="https://covid19.mathdro.id/api/og" alt="graph" className="graphImage"/>
                        <hr/>
                        <ul className="top10Container">
                            {/* <h2>More comming soon!</h2> */}
                            <br/>
                            <Chart />  
                        </ul>
                    </div>
                </div>
        );
    }
}
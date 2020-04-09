import React from 'react';
import Axios from 'axios';
import Loader from './Loader';
import '../style.css';
const data2 = require('../states.json');


export default class App extends React.Component {

    constructor(props){
        super(props);

        this.getCountryData = this.getCountryData.bind(this);
    }

    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: [],
        loading: true
    }

    async componentDidMount(){
        this.getData();
        // this.getCords();
    }

    // async getCords(){
    //     const countrylong = [];
    //     const countrylat = [];

    //     for(var i = 0; i < this.state.countries.length; i++){
            
    //         var currentCountry = this.state.countries[i];
    //         const res = await Axios.get("https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&country=" + currentCountry);

    //         countrylong.push(res.locations[0].coordinates.longitude);
    //         countrylat.push(res.locations[0].coordinates.latitude);
    //     }

    //     this.setState({
    //         countrylong: countrylong,
    //         countrylat: countrylat

    //     });
        
    // }


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

        this.setState({
            loading: false
        });
    }

    async getCountryData(e){

        var option = e.target.value;

        if(e.target.value === "Worldwide"){
            return this.getData();
        }

        try{
            const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
            this.setState({
                confirmed: res.data.confirmed.value,
                recovered: res.data.recovered.value,
                deaths: res.data.deaths.value
            });
        }catch(err){
            if(err.response.status === 404){
                this.setState({
                    confirmed: "No Data Available",
                    recovered: "No Data Available",
                    deaths: "No Data Available"
                });
            }
        }

            for(var i = 0; i < data2.length; i++){
                this.setState({
                    loading: true
                });
                var obj = data2[i];

                if(option == obj.name){

                    const res = await Axios.get(`https://covid19.mathdro.id/api/countries/US/confirmed/`);
                    let totalConfirmed = 0;
                    let totalRecovered = 0;
                    let totalDeaths = 0;

                    for(let i =0; i < res.data.length; i++){
                        if(res.data[i].provinceState == option){
                            totalConfirmed += res.data[i].confirmed;
                            totalRecovered += res.data[i].recovered;
                            totalDeaths += res.data[i].deaths;
                            console.log(res.data[i].confirmed);
                        }
                    }

                    if(totalConfirmed == 0){
                        totalConfirmed = 'No Data Available';
                    }else if(totalDeaths == 0){
                        totalDeaths = 'No Data Available';
                    }else if(totalRecovered == 0){
                        totalRecovered = 'No Data Available';
                    }

                    this.setState({
                        confirmed: totalConfirmed,
                        recovered: totalRecovered,
                        deaths: totalDeaths
                    });

                }
                this.setState({
                    loading: false
                });
            }
    }

    renderCountryOptions(){
        return this.state.countries.map((country, i) => {
        return <option key={i}>{ country }</option>
        });
    }

    renderStatesOptions(){
        return data2.map((dataz, i) => {
        return <option key={i}>{ dataz.name }</option>
        });
    }

    isLoading(){
        if (this.state.loading) {return <Loader />}
    }   

    render(){
        return (
                <div className="container">
                    {this.isLoading()}
                    <h1 className="mainHeader"><img src="https://p3cdn4static.sharpschool.com/UserFiles/Servers/Server_1051846/Image/News/coronavirus.png" alt="." style={{maxWidth: '50px'}}/>Covid-19 Tracker</h1>

                    <select name="" className="dropDown" onChange={this.getCountryData}>
                        <option value="Worldwide">Worldwide</option>
                        <option value="US">USA</option>
                        {this.renderCountryOptions()}
                        <option value="worldwide" class='usaSelection'>Search USA States</option>
                        {this.renderStatesOptions()}
                    </select>
                    <div className="flex">
                        <div className="box confirmed">
                            <h3>Confirmed cases:</h3>
                            <h4>{this.state.confirmed}</h4>
                        </div>
                        <div className="box active">
                            <h3>Active cases:</h3>
                            <h4>{this.state.confirmed - (this.state.recovered + this.state.deaths)}</h4>
                        </div>
                        <div className="box recovered">
                            <h3>Recovered cases:</h3>
                            <h4>{this.state.recovered}</h4>
                        </div>
                        <div className="box deaths">
                            <h3>Deaths cases:</h3>
                            <h4>{this.state.deaths}</h4>
                        </div>
                    </div>
                </div>
        );
    }
}
import React from 'react';
import Axios from 'axios';
import Loader from './Loader';
import '../style.css';

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
    }

    renderCountryOptions(){
        return this.state.countries.map((country, i) => {
        return <option key={i}>{ country }</option>
        });
    }

    isLoading(){
        if (this.state.loading) {return <Loader />}
    }   

    render(){
        return (
                <div className="container">
                    {this.isLoading()}
                    <h1 className="mainHeader">Covid-19 Tracker</h1>

                    <select name="" className="dropDown" onChange={this.getCountryData}>
                        <option value="Worldwide">Worldwide</option>
                        <option value="US">USA</option>
                        {this.renderCountryOptions()}
                    </select>
                    <div className="flex">
                        <div className="box confirmed">
                            <h3>Confirmed cases:</h3>
                            <h4>{this.state.confirmed}</h4>
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
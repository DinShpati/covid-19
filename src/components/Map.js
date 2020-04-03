import React from 'react';
import Axios from 'axios';
import Loader from './Loader';
import mapboxgl from 'mapbox-gl';
import '../style.css';

const data2 = require('../countries.json');

mapboxgl.accessToken = 'pk.eyJ1IjoiZGluc2hwYXRpIiwiYSI6ImNqamRmMmVmNzN2ODQza3I1OWRnbDR0ODIifQ.ah5q68mTKeffMEh8C2zNYQ';

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function hasOneDayPassed(){
  // get today's date. eg: "7/37/2007"
  var date = new Date().toLocaleDateString() - 1;

  // if there's a date in localstorage and it's equal to the above: 
  // inferring a day has yet to pass since both dates are equal.
  if( localStorage.yourapp_date === date ) 
      return false;

  // this portion of logic occurs when a day has passed
  localStorage.yourapp_date = date;
  return true;
}

export default class Map extends React.Component {

    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: [],
        lng: 5,
        lat: 34,
        zoom: 1.2,
        center: [0, 20],
        countrylong: [],
        countrylat: [],
        colorArr: [],
        countryCordList: [],
        loading: true
    }

    async componentDidMount(){
        this.getData();
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

        //initsilizing the map and getting cordinates
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: this.state.center,
            zoom: this.state.zoom
        });
        const countrylong = [];
        const countrylat = [];
        const countryCordList = [];
        for(var j = 0; j < this.state.countries.length; j++){
            var inputValue = this.state.countries[j];
            for(var l = 0; l < data2.length; l++){
                if(inputValue === data2[l].name){
                    countrylong.push(data2[l].latlng[1]);
                    countrylat.push(data2[l].latlng[0]);
                    countryCordList.push(this.state.countries[j]);
                }
            }
            
        }
        
        this.setState({
            countrylong: countrylong,
            countrylat: countrylat,
            countryCordList: countryCordList
            
        });

        //run once a day
        if(hasOneDayPassed()){
        const colorArr = [];
        for(let i = 0; i < this.state.countrylong.length; i++){

            await fetch(`https://covid19.mathdro.id/api/countries/${this.state.countryCordList[i]}`).then(
                response => response.json()).then(
                    data =>{
                    try{
                        
                        const confirmed = data.confirmed.value;

                        if(confirmed === null || confirmed === undefined){
                            colorArr.push('grey');
                        }else{

                            if(confirmed >= 200000){
                                colorArr.push('#d422cb');
                            }else if(confirmed >= 100000){
                                colorArr.push('#f43d46');
                            }else if(confirmed >= 50000){
                                colorArr.push('#da7a3c');
                            }else if(confirmed >= 10000){
                                colorArr.push('#cac633');
                            }else if(confirmed >= 1000){
                                colorArr.push('#44a2c2');
                            }else{
                                colorArr.push('grey');
                            }
                        }
                    }catch(err){
                        console.log(err);
                        colorArr.push('grey');
                    }
                    }
                );

                await timer(600);
        }
        this.setState({
            colorArr: colorArr
        });

    }

        const colorArrConfirmed = this.state.colorArr
        //const colorArrConfirmed = ["grey","grey","grey","grey","grey","grey","grey","grey","grey","#cac633","grey","grey","grey","grey","grey","grey","#cac633","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","#da7a3c","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","#da7a3c","grey","grey","grey","#da7a3c","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","#cac633","grey","grey","grey","#f43d46","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","#cac633","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","grey","#f43d46","grey","grey","grey","grey","#cac633","grey","grey","grey","grey","grey","grey","grey","grey","#cac633","#f43d46","grey","grey","grey","#cac633","grey","grey","grey","grey","grey","grey","grey"];

        for(var k = 0; k < this.state.countrylong.length; k++){
            
            new mapboxgl.Marker({
                color: colorArrConfirmed[k]
            })
            .setLngLat([this.state.countrylong[k], this.state.countrylat[k]])
            .addTo(map);
        }
        console.log(this.state.colorArr[0]);
        console.log(this.state.colorArr);

        this.setState({
            loading: false
        });
    }

    async getColors(){

        if(!hasOneDayPassed()){return false}

        //use the buttom to get data 
        const colorArr = [];
        for(let i = 0; i < this.state.countrylong.length; i++){

            fetch(`https://covid19.mathdro.id/api/countries/${this.state.countryCordList[i]}`).then(
                response => response.json()).then(
                    data =>{
                    try{
                        
                        const confirmed = data.confirmed.value;
                        console.log(confirmed);

                        if(confirmed === null || confirmed === undefined){
                            colorArr.push('grey');
                        }else{

                            if(confirmed >= 200000){
                                colorArr.push('#d422cb');
                            }else if(confirmed >= 100000){
                                colorArr.push('#f43d46');
                            }else if(confirmed >= 50000){
                                colorArr.push('#da7a3c');
                            }else if(confirmed >= 10000){
                                colorArr.push('#cac633');
                            }else if(confirmed >= 1000){
                                colorArr.push('#44a2c2');
                            }else{
                                colorArr.push('grey');
                            }
                        }
                    }catch(err){
                        console.log(err);
                    }
                    }
                );
                await timer(1000);
        }
        this.setState({
            colorArr: colorArr
        });
    }

    isLoading(){
        if (this.state.loading) {return <Loader />}
    }  

    render(){
        return(
            <div className="container">
                <h1 className="mainHeader">Covid-19 Map</h1>
                <br/>
                {this.isLoading()}
                <div className="container2">

                <div className="outcome">
                <div className="mapKeyContainer">
                    <h4 className="mapTitle">Number of infected people:</h4>
                    <br/>
                    <div className="keyHolder">
                    <div className="mapKeys">
                            <div className="color"></div><h4 className="numOfPeople"> > 200,000</h4>
                        </div>
                        <div className="mapKeys">
                            <div className="color1"></div><h4 className="numOfPeople"> > 100,000</h4>
                        </div>
                        <div className="mapKeys">
                            <div className="color2"></div><h4 className="numOfPeople"> > 50,000</h4>
                        </div>
                        <div className="mapKeys">
                            <div className="color3"></div><h4 className="numOfPeople"> > 10,000</h4>
                        </div>
                        <div className="mapKeys">
                            <div className="color5"></div><h4 className="numOfPeople"> > 1,000</h4>
                        </div>
                        <div className="mapKeys">
                            <div className="color4"></div><h4 className="numOfPeople"> &#60; 999</h4>
                        </div>
                    </div>
                </div>
                </div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />

                </div>
                
            </div>
        );
    }

}
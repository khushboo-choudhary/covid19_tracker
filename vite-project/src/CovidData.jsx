import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line,Bar } from "react-chartjs-2";
import moment from 'moment';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function CovidData() {
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState([]);
  const [userInput, setUserInput] = useState("");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Covid 19 Tracker',
      },
    },
  };
  

  useEffect(() => {
    const fetchCovid = async () => {
      const res = await axios.get("https://api.covid19api.com/summary");
      const value = await res.data.Countries;
      console.log(value);
      setData(value);
    };
    fetchCovid();
  }, []);


  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = (props) => {
    props.preventDefault();
    
    for (var i = 0; i < data.length; i++) {
  
      if (data[i].Country.toLowerCase() == userInput) {
       
        console.log(data[i]);
        setFetch(data[i]);
       
      }
       else if(userInput==="") {
        
        alert("search box should not be empty && valid country name");
        return;
      }
     
    }
  };
  // console.log((fetch.Date).tolocaleString());
  
var val = fetch.Date;
val = moment(val).utc().format('DD-MM-YYYY')
console.log(val);

  
  return (
    <>
    <div className="covidData">
      <h1>COVID-19 CASES COUNTRY WISE</h1>
      <div className="covidData__input">
        <form onSubmit={handleSubmit}>
          County name : &nbsp;
          <input onChange={handleSearch} placeholder="Enter Country Name" />&nbsp;
          <button type="submit">Search</button>
        </form>
      
      </div>

      <div className="covidData__results">
        <p>Country Name : {fetch.Country} </p>

        <p>Cases : {fetch.TotalConfirmed}</p>

        <p>Deaths : {fetch.TotalDeaths}</p>

        <p>Recovered : {fetch.TotalRecovered}</p>

        <p>Cases Today : {fetch.NewConfirmed}</p>

        <p>Deaths Today : {fetch.NewDeaths}</p>

        <p>Recovered Today : {fetch.NewRecovered}</p>
        <p>Date: {val}</p>

      </div>
     
      { 
       
    data ? (
    
        <Line options={options} id="barchart"
       
          data={{
            labels: data.map((data) => data.Country
            
            ),
            datasets: [
              {
                data: data.map((data) =>
                 (moment(data.Date).utc().format('DD-MM-YYYY'))),
                label: "Date",
                borderColor: "maroon",
                backgroundColor: "green",
                fill: true,
               
              },
              {
                data: data.map((data) => data.NewConfirmed),
                label: "Today Infected",
                borderColor: "rgb(241, 84, 18)",
                backgroundColor: "rgb(241, 84, 18)",
                fill: true,
              },
              {
                data: data.map((data) => data.NewDeaths),
                label: "Today Deaths",
                borderColor: "red",
                backgroundColor: "rgb(255, 0, 0)",
                fill: true,
              },
              {
                data: data.map((data) => data.NewRecovered),
                label: "Today Recovered",
                borderColor: "rgb(62, 0, 255)",
                backgroundColor: "rgb(62, 0, 255)",
                fill: true,
              },
              {
                data: data.map((data) => data.TotalConfirmed),
                label: "Total Confirmed",
                borderColor: "rgb(30, 95, 116)",
                backgroundColor: "rgb(30, 95, 116)",
                fill: true,
              },
              {
                data: data.map((data) => data.TotalDeaths),
                label: "Total Deaths",
                borderColor: "brown",
                backgroundColor: "brown",
                fill: true,
              },
              {
                data: data.map((data) => data.TotalRecovered),
                label: "Total Recovered",
                borderColor: "rgb(255, 0, 117)",
                backgroundColor: "rgb(255, 0, 117)",
                fill: true,
              },
             
            ],
           
          }}
        />
      ) : null
      };
      
       
 
    
    </div>
    </>
  );
}

export default CovidData;

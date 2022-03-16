import React from "react";
import "./App.css";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import Infobox from "./Infobox";
import Map from "./Map";
import Table from "./Table";
import { CardContent, Card } from "@mui/material";
import { sortData } from "./data";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css"
import { PrettyStat } from './data';

function App() {
  // https://disease.sh/v3/covid-19/countries
  // countries
  const [countries, setCountries] = useState([]);
  // country
  const [country, setCountry] = useState("World Wide");
  // country Info
  const [countryInfo, setCountryInfo] = useState({})

  // tabledata
  const [tableData, setTableData] = useState([])

  let [mapCenter, setMapCenter] = useState([34.88746, -40.4796]);

  let [mapZoom, setMapZoom] = useState(3);

  const [mapCountries, setMapCountries] = useState([])

  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    // fetch all data
    if (window.innerWidth < 768) {
      alert("You Can't See An Essential Map😒")
    }
    const fetchUrl = async () => {
      fetch("https://disease.sh/v3/covid-19/all")

        .then(res => res.json())
        .then(data => {

          setCountryInfo(data);
        })
    }
    fetchUrl();
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))

          const sortedData = sortData(data);
          console.log("sortedData>>>>>", sortedData)

          setMapCountries(data);
          setTableData(sortedData)
          setCountries(countries);
        })
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    console.log("Country Code", countryCode);

    const url = countryCode === "World Wide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`


    const a = await fetch(url)
      .then(res => res.json())
      .then(data => {

        setCountry(countryCode);

        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);

        console.log("mapZoom>>>", mapZoom)
        console.log("mapCenter>>>>", mapCenter)
      })

  }

  console.log("Country Info>>>", countryInfo)

  return (
    <div className="app">

      <div className="app__header">
        <h1>Covid-19 Trackcer</h1>
        <FormControl className="app__dropdown">
          <Select
            label="Country"
            onChange={onCountryChange}
            value={country}
          >
            <MenuItem value="World Wide">World Wide</MenuItem>
            {countries.map((country, index) => {
              return (
                <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>

      <App_Stats>
        <Infobox
          onClick={e => setCasesType('cases')}
          title={"Coronavirus Cases"}
          cases={PrettyStat(countryInfo.todayCases)} total=
          {PrettyStat(countryInfo.cases)}
        />

        <Infobox
          title={"Recovered"}
          onClick={e => setCasesType('recovered')}
          cases={PrettyStat(countryInfo.todayRecovered)
          }
          total={PrettyStat(countryInfo.recovered)}
        />

        <Infobox
          title={"Deaths"}
          onClick={e => setCasesType('deaths')}
          cases={PrettyStat(countryInfo.todayDeaths)} total={PrettyStat(countryInfo.deaths)}
        />
      </App_Stats>


      <App__Body>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
        <Card className="cardContext">
          <CardContent>

            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />

            <h3 className="title">
              WorldWide new {casesType}
            </h3>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </App__Body>
    </div>
  );
}

const FormControl = styled.div`
  width:350px;
  border: 1px solid black;
`;

const Select = styled.select`
  padding: 10px 15px;
  font-size: 17px;
  width: 100%;
`;

const MenuItem = styled.option`
  padding: 10px;
`;

const App_Stats = styled.div`
  display:flex;
  justify-content: space-between;
  align-items:center;
  flex-wrap: wrap;

  @media (max-width:768px) {
    flex-direction: column;
    
    .infobox__items{
      margin:10px 0 !important;
      width:60%;
    }
  }

  @media screen and (max-width:450px){
    .infobox__items{
      width:100% !important;
    }
  }
`;

const App__Body = styled.div`
  margin-top:50px;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap:wrap;

  .map__box{
    flex:0.7;
  }

  .cardContext{
    flex:0.3;
  }

  .title{
    margin:20px 0;
  }
  .none{
    display:none !important;
  }
  @media screen and (max-width:768px){
    flex-direction: column;
    .map__box{
     display: none;
    }
    .cardContext{
      width:100%;
    }
  }
`;

export default App;

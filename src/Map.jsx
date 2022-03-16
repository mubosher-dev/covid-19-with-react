import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import ChangeView from './ChangeView';
import { showDataOnMap } from './data'

function Map({ countries, casesType, center, zoom }) {

  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
  };

  console.log("casesType", casesType);

  return (
    <Maps className="map__box">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* {countries.map((country, index) => (
          <Circle
            key={index}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            fillOpacity={0.4}
            radius={
              Math.random() * countries.length * 2000
            }
          >
            <Popup>
              <div className="info-container">
                <div
                  className="info-flag"
                >
                  <img src={country.countryInfo.flag} alt="" />
                </div>
                <div className="info-name">{country.country}</div>
                <div className="info-confirmed">
                  Cases: {numeral(country.cases).format("0,0")}
                </div>
                <div className="info-recovered">
                  Recovered: {numeral(country.recovered).format("0,0")}
                </div>
                <div className="info-deaths">
                  Deaths: {numeral(country.deaths).format("0,0")}
                </div>
              </div>
            </Popup>
          </Circle>
        ))} */}
        {showDataOnMap(countries,casesType)}
      </MapContainer>
    </Maps>
  );
}

const Maps = styled.div`
  height:720px !important;
  padding: 1rem;
  width:100%;
  border-radius: 20px;
  background: #fff;
  margin: 0 20px;
  box-shadow:0 0 8px -4px rgba(0, 0, 0, 0.5 );

 .leaflet-container {
  height: 100%;
  border-radius: 12px;
}

.info-flag img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.info-name {
  font-size: 20px;
  font-weight: bold;
  color: #555;
}

.info-container {
  width: 150px;
}

.info-flag {
  height: 80px;
  width: 100%;
  background-size: cover;
  border-radius: 8px;
}

.info-confirmed,
.info-recovered,
.info-deaths {
  font-size: 16px;
  margin-top: 5px;
}

  @media screen and (max-width:768px){
    width:100%;
  }
`;

export default Map
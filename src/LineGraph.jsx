import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import styled from "styled-components"
import numeral from "numeral";

const options = {
    legend: [{
        display: false,
    }],
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

ChartJS.register(...registerables);

function LineGraph({ casesType }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                    console.log(chartData);
                });
        };

        fetchData();
    }, [casesType]);

    return (
        <>
            {data?.length > 0 && (
                <Wrap className="cases__line">
                    <Line
                        data={{
                            datasets: [
                                {
                                    label: "Covid-19",
                                    backgroundColor: "linear-gradient(to right, #20f08b, #07dfb1)",
                                    borderColor: "#CC1034",
                                    data: data,
                                },
                            ],
                        }}
                        options={options}
                    />
                </Wrap>
            )}
        </>
    );
}

const Wrap = styled.div`
    padding:10px;
    height:270px
`;

export default LineGraph;
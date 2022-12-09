
import React, { useState, useEffect } from "react";
import { API_URL_TRAININGCUSTOMER } from "../Constants";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function DisplayData() {
    const [trainingData, setTrainingData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    //function for fetching data and converting it to a trainingdata
    const loadData = () => {
        // Initialize the displayData array
        const displayData = [];
        fetch(API_URL_TRAININGCUSTOMER)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Something went wrong when fetching the data");
                }
            })
            .then(data => {
                data.forEach(training => {
                    //check if the object already exists in the displaydata using index
                    const index = displayData.findIndex(obj => obj.activity === training.activity);
                    //if it exists increase it's duration
                    if (index > -1 && training.activity) {
                        displayData[index].duration += training.duration;
                    } else {
                        //otherwise push the whole object tto the array
                        displayData.push({
                            activity: training.activity,
                            duration: training.duration
                        });
                    }
                });
                setTrainingData(displayData);
            })
            .catch(err => console.error(err))
    };




    return (
        <ResponsiveContainer width="100%" aspect={3}>
            <BarChart
                width={500}
                height={300}
                data={trainingData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
}


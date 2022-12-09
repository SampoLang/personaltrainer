
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { API_URL_TRAININGCUSTOMER } from "../Constants";
export default function BigCalendar() {

    const localizer = momentLocalizer(moment);
    const [trainingList, setTrainingList] = useState([]);
    //Fetch trainings on load and convert them into calendar events
    useEffect(() => {
        loadData()

    }, []);

    //function for fetching data and converting it to a traininglist
    const loadData = () => {
        fetch(API_URL_TRAININGCUSTOMER)
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert("Something went wrong when fetching the data");
            })
            .then(data => {
                return setTrainingList(
                    data.map((training) => ({
                        title: training.activity + " / " + training.customer.firstname + " " + training.customer.lastname,
                        start: moment(training.date),
                        end: moment(training.date).add(training.duration, "m").toDate()
                    }))
                )
            })
            .catch(err => console.error(err))
    }
    return (
        <div className="ag-theme-material" style={{ height: 650, width: "90%", margin: "auto" }}>
            <Calendar localizer={localizer} events={trainingList} startAccessor="start" endAccessor="end" style={{ height: 800, margin: "50px" }} />
        </div>
    );
}
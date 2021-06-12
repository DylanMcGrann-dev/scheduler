import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview} from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  //sets the day state
  const setDay = day => setState({ ...state, day });
  
  //gets data from an api
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((all) => {
      //sets state with data from api
      // console.log(Object.values(all[1].data));
      setState(prev => ({...prev, days:all[0].data, appointments:Object.values(all[1].data), interviewers:Object.values(all[2].data) }));
    }
    )
  }, [])
  //dailyApps variable is set to the array returned by getAppointmentsForDay function
  const dailyApps = getAppointmentsForDay(state, state.day);

  const allAppointments = dailyApps.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return(
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview} 
        />
    )})
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {allAppointments}
      </section>
    </main>
  );
}

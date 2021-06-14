import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewsForDay} from "helpers/selectors";
// import useVisualMode from "hooks/useVisualMode";


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
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data }));
    }
    )
  }, []);

  //updates state with new interview data on selected appointment
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});
  
  }

  //deletes interview on selected appointment
  const deleteInterview = (id) => {
    //find what appointment is selected and
    //set interview to null
    const appointment = { 
      ...state.appointments[id],
      interview: null
    }
    //update state
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    setState(prev => ({...prev, appointments}));
  };

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
        interviewers={getInterviewsForDay(state, state.day)}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
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
        {/* <Appointment time={"5pm"} key={'last'} /> */}
      </section>
    </main>
  );
}

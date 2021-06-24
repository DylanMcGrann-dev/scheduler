import React from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewsForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";



export default function Application(props) {
  const {
    updateSpots,
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();


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
        updateSpots={updateSpots}
        />
        
    )});
  
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

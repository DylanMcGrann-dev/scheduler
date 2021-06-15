import { useState, useEffect } from "react";
import axios from "axios";

export default function () {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        //sets state with data from api
        // console.log(Object.values(all[1].data));
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      }
      )
  }, []);

  //sets the day state
  const setDay = day => setState({ ...state, day });
  //update spots count based on how any interviews are null in the appointments array of the day
  const updateSpots = (delta) => {
    let wantedDay = {};
    let spotCount = 0;
    for (const selectedDay of state.days) {
      if (selectedDay.name === state.day){
        wantedDay = selectedDay;
        console.log("wantedDay:",wantedDay);
      }
    }
    wantedDay.spots += delta;
    const days = [...state.days, wantedDay];
    setState(prev => ({...prev, days}));


    // for (const app of wantedDay.appointments) {
    //   // console.log("app:", app);
    //   console.log("app:",state.appointments[app].interview);
    //   if (!state.appointments[app].interview) {
    //     spotCount++;
    //   }
    // }
    console.log("spotCount:",spotCount);
    console.log("should be 2nd");
  }

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState(prev => ({ ...prev, appointments }));
    console.log("should be 1st");
  }

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
    setState(prev => ({ ...prev, appointments }));
  };
  return { setDay, bookInterview, deleteInterview, state, updateSpots }
}

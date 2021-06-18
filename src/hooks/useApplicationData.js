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
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      }
      )
  }, []);

  //sets the day state
  const setDay = day => setState({ ...state, day });
  //update spots count based on how any interviews are null in the appointments array of the day
  const updateSpots = (delta) => {

    const dayIndex = state.days.findIndex((day) => day.name === state.day);
    // if day.appointment already exists then don't update spots
    const day = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots + delta
    }
    const days = [...state.days]
    days.splice(dayIndex, 1, day);
    return days;

  }
  //updates sate with given id and interview 
  const bookInterview = (id, interview) => {
    if (!state.appointments[id].interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = updateSpots(-1);
      setState(prev => ({ ...prev, appointments, days }));
    } 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => ({ ...prev, appointments }));
  }

  //removes interview data from state and database
  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const days = updateSpots(1);
    setState(prev => ({ ...prev, appointments, days }));
  };
  return { setDay, bookInterview, deleteInterview, state, updateSpots }
}

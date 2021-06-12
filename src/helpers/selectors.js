const getAppointmentsForDay = function(allState, day) {
  let appointmentsForDay = [];
  let selectedDay = {};
  
  if (allState.days.length < 1) {
    return [];
  }

  for (const x of allState.days) {
    if (x.name === day) {
      selectedDay = x;
    }
  }

  if (selectedDay.appointments === undefined) {
    return [];
  } else {
    for (const interview of selectedDay.appointments) {
      for (const app in allState.appointments) {
        if (interview == app) {
          appointmentsForDay.push(allState.appointments[app]);
        } 
      }
    }
  }

  return appointmentsForDay;
}

// const state = {
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   },
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   }
// };

const getInterview = function(state, interview) {
  if (interview === null) {
    return null;
  } 
  const id = interview.interviewer;
  const interviewer = state.interviewers[id];
  const result = {...interview, interviewer}
  return result;
}
// console.log(getInterview(state, state.appointments["3"].interview))
export {getAppointmentsForDay, getInterview}

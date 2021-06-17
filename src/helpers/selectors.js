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


const getInterviewsForDay = function(allState, day) {
  let interviewsForDay = [];
  let selectedDay = {};
  
  if (allState.days.length < 1) {
    return [];
  }

  for (const x of allState.days) {
    if (x.name === day) {
      selectedDay = x;
    }
  }

  if (selectedDay.interviewers === undefined) {
    return [];
  } else {
    for (const interview of selectedDay.interviewers) {
      for (const int in allState.interviewers) {
        if (interview == int) {
          interviewsForDay.push(allState.interviewers[int]);
        } 
      }
    }
  }

  return interviewsForDay;
}

const getInterview = function(state, interview) {
  if (interview === null) {
    return null;
  } 
  const id = interview.interviewer;
  // console.log("interview:",interview);
  // console.log("state:",state);
  const interviewer = state.interviewers[id];
  const result = {...interview, interviewer}
  return result;
}
export {getAppointmentsForDay, getInterview, getInterviewsForDay}

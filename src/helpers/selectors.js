export default function getAppointmentsForDay(allState, day) {
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

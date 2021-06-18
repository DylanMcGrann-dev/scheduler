import DayListItem from "components/DayListItem";
import React from "react";

export default function DayList(props) {

  const listOfDays = props.days && props.days ? props.days.map((day) => (<DayListItem 
    key={day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}  />))
    :null;

  return (
  <ul>{listOfDays}</ul>);
}
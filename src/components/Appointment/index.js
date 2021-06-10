import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {
  const toShowOrNot = function(interview) {
    return (interview ? <Show interviewer={props.interview.interviewer.name} student={props.interview.student}></Show> : <Empty/>)
  }
  // console.log("student",props.interview.interviewer.name);   
  return (
    <article className="appointment">
      <Fragment>
        <Header time={props.time} />
        {toShowOrNot(props.interview)}
      </Fragment>
    </article>
      
  );
};
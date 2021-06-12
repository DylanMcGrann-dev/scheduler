import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import getInterviewsForDay from "helpers/selectors";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //if props.interview truthy, render show. if not render Empty 
  const toShowOrNot = function (interview) {
    return (interview ? <Show interviewer={props.interview.interviewer.name} student={props.interview.student}></Show> : <Empty />)
  }

  const showing =
    (mode === SHOW && (
      <Show
        key={props.interview.interviewer.id}
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
      />
    ))

  const muchEmpty = (mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />)

  const creation = (mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)}/>)

  return (
    <article className="appointment">
      <Fragment>
        <Header time={props.time} />
        {muchEmpty}
        {showing}
        {creation}
      </Fragment>
    </article>

  );
};
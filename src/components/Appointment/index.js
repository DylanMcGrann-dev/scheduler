import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "components/Appointment/Confirm";

export default function Appointment(props) {
  // console.log(props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  //function that transitions what is being displayed
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  //transitions to DELETE and calls deleteInterview function
  const onDelete = () => {
    transition(CONFIRM);
  }

  const confirmation = (id) => {
    transition(DELETING);
    props.deleteInterview(id);
    transition(EMPTY);
  } 

  const confirm = (
    mode === CONFIRM && (
      <Confirm onCancel={back} interviewer={props.interview.interviewer} onConfirm={confirmation} />
    )
  );

  const muchEmpty = (
    mode === EMPTY && (
      <Empty 
        onAdd={() => transition(CREATE)}
      /> 
    )
  );

  const deleting = (
    mode === DELETING && (
      <Status message={"deleting"}/>
    )
  )

  const saving = (
    mode === SAVING && (
      <Status message={"saving"}/>
    )
  )

  const showing = (
    mode === SHOW && (
      <Show
        // key={props.interview.interviewer.id}
        // id={props.interview.interviewer.id}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={onDelete} 
        onEdit={transition(EDIT)}
      />
    )
  );

  const editing = (
    mode === EDIT && (
      <Form
        interviewers={props.interviewers}
        onCancel={() => back(EMPTY)}
        bookInterview={props.bookInterview}
        onSave={save}
      /> 
    )
  );

  const creation = (
    mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={() => back(EMPTY)}
        bookInterview={props.bookInterview}
        onSave={save}
      /> 
    )
  );

  return (
    <article className="appointment">
      <Fragment>
        <Header time={props.time} />
        {muchEmpty}
        {showing}
        {creation}
        {saving}
        {confirm}
      </Fragment>
    </article>

  );
};
import React, { Fragment } from "react";
import axios from "axios";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //function that transitions what is being displayed
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // updates database and state with new interview data 
  const save = (name, interviewer) => {
    const interview = {
      student: name,  
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview);

    axios.put(`/api/appointments/${props.id}`, {interview: interview})
    .then(response => {
      transition(SHOW);
      })
      .catch(error => {
        transition(ERROR_SAVE, true);
      });
  }

  //transitions to DELETE and calls deleteInterview function
  const onDelete = () => {
    transition(CONFIRM);
  }

  //when a users confirms the deletion of a interview this 
  //function is called and removes the interview data from the database and state
  const confirmation = (id) => {
    transition(DELETING);
    axios.delete(`/api/appointments/${id}`)
    .then(response => {
      props.deleteInterview(id);
      transition(EMPTY);
    })
    .catch(error => {
      transition(ERROR_DELETE, true);
    });
  }

  const editInterview = (name, interviewer) => {
    transition(EDIT);
  }

  const confirm = (
    mode === CONFIRM && (
      <Confirm onCancel={back} id={props.id} onConfirm={confirmation} />
    )
  );

  const error_delete = (
    mode === ERROR_DELETE && (
      <Error onClose={back} message={"something went wrong with deleting"}/>
    )
  )

  const error_save = (
    mode === ERROR_SAVE && (
      <Error onClose={() => transition(CREATE)} message={"something went wrong with saving"} />
    )
  )

  const muchEmpty = (
    mode === EMPTY && (
      <Empty
        onAdd={() => transition(CREATE)}
      />
    )
  );

  const deleting = (
    mode === DELETING && (
      <Status message={"deleting"} />
    )
  )

  const saving = (
    mode === SAVING && (
      <Status message={"saving"} />
    )
  )

  const showing = (
    mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={onDelete}
        onEdit={editInterview}
      />
    )
  );

  const editing = (
    mode === EDIT && (
      <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
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
    <article className="appointment" data-testid="appointment">
      <Fragment>
        <Header time={props.time} />
        {muchEmpty}
        {showing}
        {deleting}
        {creation}
        {saving}
        {error_delete}
        {error_save}
        {confirm}
        {editing}
      </Fragment>
    </article>

  );
};
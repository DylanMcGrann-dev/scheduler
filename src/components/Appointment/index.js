import React, { Fragment } from "react";
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
  // console.log(props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR = "ERROR";

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
    const promise = new Promise((resolve, reject) => {
      resolve(props.bookInterview(props.id, interview))
      .reject(error => console.log("couldn't reach server:",error));
    })
    promise.then(result => {
      transition(SHOW);
    })
    .catch(error => {
      transition(ERROR);
      console.log("something went wrong with saving:", error);
    })
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

  const editInterview = (name, interviewer) => {

    // console.log("props.student:",props.student);
    transition(EDIT);

  }

  const confirm = (
    mode === CONFIRM && (
      <Confirm onCancel={back} id={props.id} onConfirm={confirmation} />
    )
  );

  const error = (
    mode === ERROR && (
      <Error />
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

  console.log("props.interview:", props.interview);
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
    <article className="appointment">
      <Fragment>
        <Header time={props.time} />
        {muchEmpty}
        {showing}
        {creation}
        {saving}
        {confirm}
        {editing}
      </Fragment>
    </article>

  );
};
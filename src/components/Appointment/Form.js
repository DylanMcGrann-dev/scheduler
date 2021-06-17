import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from "react";
import "components/Appointment/styles.scss";
// import { action } from "@storybook/addon-actions/dist/preview";

//---PROPS
// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function

// interviewers:Array
// onSave:Function
// onCancel:Function

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const nameHandler = function (event) {
    setName(event.target.value)
  };
  
  const interviewHandler = function(event) {
    setInterviewer(event);
  };

  const reset = function() {
    setName("");
    setInterviewer(null);
  };

  const cancel = function() {
    reset();
    props.onCancel()
  }

  function validate(name, interviewer) {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } 
    setError("");
    props.onSave(name, interviewer);
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={nameHandler}
            data-testid={"student-name-input"}
          />
        <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={interviewHandler} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => {validate(name, interviewer)}}>Save</Button>
        </section>
      </section>
    </main>
  );
};

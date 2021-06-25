import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from "react";
import "components/Appointment/styles.scss";

//---PROPS
// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function

// interviewers:Array
// onSave:Function
// onCancel:Function

// the form is where the user creates a interview to be booked.
export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // sets the name as the value typed in the input
  const nameHandler = function (event) {
    setName(event.target.value)
  };
  
  //sets the interviewer upon a click event 
  const interviewHandler = function(event) {
    setInterviewer(event);
  };

  const reset = function() {
    setName("");
    setInterviewer(null);
  };

  // when the user clicks on cancel the form is reset to empty 
  const cancel = function() {
    reset();
    props.onCancel()
  }

  // ensures the user has filled all required input, if not an error message will be displayed
  function validate(name, interviewer) {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } 
    if (!interviewer) {
    setError("Please select an interviewer")
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

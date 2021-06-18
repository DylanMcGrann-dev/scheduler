import React from "react";
import "components/Appointment/styles.scss";
import Button from "components/Button";

// confirm widow is prompted when a user clicks the delete button,
// so the user can verify they want to delete the interview
export default function Confirm(props) {

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={() => props.onConfirm(props.id)}>Confirm</Button>
      </section>
    </main>
  );
};
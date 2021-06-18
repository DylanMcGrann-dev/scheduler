import React from "react";
import "components/Appointment/styles.scss";

// the view displayed when there is no interview booked in an appointment
export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        onClick={props.onAdd}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
};
import "components/interviewerListItem.scss";
import React from "react";
import classNames from "classnames";
// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection


export default function InterviewerListItem (props) {


  const SelectedItem = classNames(
    "interviewers__item",
    {" interviewers__item--selected" : props.selected}
  );
  const SelectedImage = classNames(
    "interviewers__item-image",
    {" interviewers__item--selected-image" : props.selected}
  );
  const FormatName = function(prop) {
    if (prop) {
      return props.name;
    }
  }
  return (
    <li className={SelectedItem} onClick={props.setInterviewer}>
      <img
        className={SelectedImage}
        src={props.avatar}
        alt={props.name}
      />
      {FormatName(props.selected)}
    </li>
  )
};

import PropTypes from 'prop-types';
import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss"
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

export default function InterviewerList(props) { 
  
  const interviewerList = props.interviewers.map(interviewer => <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={interviewer.id === props.interviewer}
    setInterviewer={(event) => props.setInterviewer(interviewer.id)} />);

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
};
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
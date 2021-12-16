import React from "react";
import PropTypes from "prop-types";

//Import other Component
import InterviewerListItem from "./InterviewerListItem";
//Import styling
import "components/InterviewerList.scss";

/** Displays the list of InterviewerListItem components */
const InterviewerList = (props) => {
  const { interviewers, onChange, value } = props;

  // an array of InterviewerListItems Components
  const parsedInterviewer = interviewers.map((interviewerObj) => (
    <InterviewerListItem
      key={interviewerObj.id}
      name={interviewerObj.name}
      avatar={interviewerObj.avatar}
      selected={interviewerObj.id === value}
      setInterviewer={() => onChange(interviewerObj.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewer}</ul>
    </section>
  );
};

// checks if props is valid based on below requirements
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;

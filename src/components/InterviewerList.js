import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss";

const InterviewerList = ({interviewers, onChange, value}) => {

  // console.log("interviewers--->", interviewers)

  const parsedInterviewer = interviewers.map((interviewerObj) =>
    <InterviewerListItem 
      key = {interviewerObj.id}
      name = {interviewerObj.name}
      avatar= {interviewerObj.avatar}
      selected= {interviewerObj.id === value}
      setInterviewer={() => onChange(interviewerObj.id)}
    />
  )


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewer}
      </ul>
    </section>
  )
}

export default InterviewerList

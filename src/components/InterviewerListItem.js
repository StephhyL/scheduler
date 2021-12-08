import React from "react";
import "components/InterviewerListItem.scss"
import className from 'classnames'

const InterviewerListItem = ({id, name, avatar, setInterviewer, selected}) => {

  let interviewClass = className(
    "interviewers__item",
    {"interviewers__item--selected": selected}
    );

  const setInterviewerClick = (id) => {
    return setInterviewer(id);
  }

  return (
    <li className={interviewClass} onClick={() => setInterviewerClick(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}

export default InterviewerListItem

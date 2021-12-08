import React from "react";
import "components/InterviewerListItem.scss"

const InterviewerListItem = ({id, name, avatar, setInterviewer}) => {

  const setInterviewerClick = (id) => {
    return setInterviewer(id);
  }

  return (
    <li className="interviewes__item" onClick={setInterviewerClick(id)}>
      <img
        className="interviewes__item-image"
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  )
}

export default InterviewerListItem

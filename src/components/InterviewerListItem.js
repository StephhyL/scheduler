import React from "react";
import "components/InterviewerListItem.scss";
import className from 'classnames';

const InterviewerListItem = ({name, avatar, setInterviewer, selected}) => {

  let interviewClass = className(
    "interviewers__item",
    {"interviewers__item--selected": selected}
    );

  return (
    <li className={interviewClass} onClick={setInterviewer}>
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

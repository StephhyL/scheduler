import React from "react";
import "components/InterviewerListItem.scss";
import className from "classnames";

/** Displays the avatar and name of the interviewers depending on class */
const InterviewerListItem = (props) => {
  const { name, avatar, setInterviewer, selected } = props;

  // assigns different classes based on incoming props. Classes associated with styling.
  const interviewClass = className("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;

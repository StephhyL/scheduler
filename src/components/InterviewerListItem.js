import React from "react";
import "components/InterviewerListItem.scss"

const InterviewerListItem = () => {
  return (
    <li className="interviewes__item">
      <img
        className="interviewes__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  )
}

export default InterviewerListItem

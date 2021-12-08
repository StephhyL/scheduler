import React from "react";
import className from "classnames";
import "components/DayListItem.scss"

const DayListItem = (props) => {

  let dayClass = className(
    "day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full":props.spots === 0,}
    )

  const formatSpots = (numOfSpots) => {
    if (numOfSpots === 0) {
      return "no spots remaining";
    } else if (numOfSpots === 1) {
      return "1 spot remaining";
    } else {
      return `${numOfSpots} spots remaining`
    }
  }


  return (
    <div>
      <li className={dayClass} onClick={()=>props.setDay(props.name)}>
        <h2 className="text--regular">{props.name}</h2>
        <h3 className="text--light">{formatSpots(props.spots)}</h3>
      </li>
    </div>
  )
}

export default DayListItem

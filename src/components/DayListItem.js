import React from "react";
import className from "classnames";
import "components/DayListItem.scss"

const DayListItem = ({name, spots, setDay, selected}) => {


  let dayClass = className(
    "day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full":spots === 0,}
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
      <li className={dayClass} onClick={()=>setDay(name)}>
        <h2 className="text--regular">{name}</h2>
        <h3 className="text--light">{formatSpots(spots)}</h3>
      </li>
    </div>
  )
}

export default DayListItem


import React from "react";
import DayListItem from "./DayListItem";

const DayList = ({days, day, setDay}) => {

  const parsedDays = days.map((dayObj) => <DayListItem 
      key={dayObj.id}
      name={dayObj.name}
      spots={dayObj.spots}
      selected={dayObj.name === day}
      setDay={setDay}
      // setDay= {day => console.log(day)}
      />)

  console.log("parsedDays----->,", parsedDays)

  return (
    <ul>
      {parsedDays}
    </ul>
  )
}

export default DayList

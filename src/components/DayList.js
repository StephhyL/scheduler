import React from "react";
// Import other Component
import DayListItem from "./DayListItem";

/** Displays the list of DayListItem components */
const DayList = (props) => {
  const { days, value, onChange } = props;

  // an array of DayListItem Components
  const parsedDays = days.map((dayObj) => {
    return (
      <DayListItem
        key={dayObj.id}
        name={dayObj.name}
        spots={dayObj.spots}
        selected={dayObj.name === value}
        setDay={onChange}
      />
    );
  });

  return <ul>{parsedDays}</ul>;
};

export default DayList;

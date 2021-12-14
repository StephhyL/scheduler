import React from "react";
import DayListItem from "./DayListItem";

const DayList = ({ days, value, onChange }) => {
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

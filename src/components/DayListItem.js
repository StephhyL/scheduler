import React from "react";
import className from "classnames";
import "components/DayListItem.scss";

/** Displays the name of the day and spots available, when Component clicked, sets Day to name */
const DayListItem = (props) => {
  const { name, spots, setDay, selected } = props;

  // assigns different classes based on incoming props. Classes associated with styling.
  const dayClass = className("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  /** returns different message depending on number of spots remaining */
  const formatSpots = (numOfSpots) => {
    if (numOfSpots === 0) {
      return "no spots remaining";
    } else if (numOfSpots === 1) {
      return "1 spot remaining";
    } else {
      return `${numOfSpots} spots remaining`;
    }
  };

  return (
    <div>
      <li className={dayClass} onClick={() => setDay(name)} data-testid="day">
        <h2 className="text--regular">{name}</h2>
        <h3 className="text--light">{formatSpots(spots)}</h3>
      </li>
    </div>
  );
};

export default DayListItem;

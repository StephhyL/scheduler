import React from "react";
//import other Components
import DayList from "./DayList";
import Appointment from "./Appointment";
//import hooks and selectors
import { useApplicationData } from "hooks/useApplicationData";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
//import stylesheet
import "components/Application.scss";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  //holds return value of getInterviewersForDay fcn which is an array with interviewer objects for a specific day
  const interviewers = getInterviewersForDay(state, state.day);
  //holds return value of getApppontmentsForDay fcn which is an array with appointment objects for a specific day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // creates a new array by mapping over dailyAppointments to return JSX that can be used to render Appointment Components
  const parsedAppointment = dailyAppointments.map((appointmentObj) => {
    // holds return value of getInterview fcn which is an object where interviewers key contains id, name, avatar
    const interview = getInterview(state, appointmentObj.interview);

    return (
      <Appointment
        key={appointmentObj.id}
        id={appointmentObj.id}
        time={appointmentObj.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      {/** Right side of the viewport: displays logo, and the list of days*/}
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* Renders the list of days to be displayed */}
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      {/* Right side of the viewport: displays the schedule of appointments for specified day*/}
      <section className="schedule">
        {/* variable that contains Appointment Components for a specified day*/}
        {parsedAppointment}
        {/* If day has a value/selected, render Appointment with key='last', else display an instruction message (at first render of webpage) */}
        {state.day ? (
          <Appointment key="last" time="5pm" />
        ) : (
          "Please start by selecting a day to book an appointment!"
        )}
      </section>
    </main>
  );
}

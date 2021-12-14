import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { useApplicationData } from "hooks/useApplicationData";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";

import "components/Application.scss";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const parsedAppointment = dailyAppointments.map((appointmentObj) => {
    const interview = getInterview(state, appointmentObj.interview);
    // console.log("state", state)
    // console.log("interview---> ", interview);
    // console.log("appointmentObj.interview", appointmentObj.interview)

    return (
      <Appointment
        key={appointmentObj.id}
        id={appointmentObj.id}
        time={appointmentObj.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        // {...appointmentObj}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

import React, {useState, useEffect} from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";

import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {},
    interviewers: {}
  })
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  let dailyAppointments = [];


  const setDay = (day) => {
    // console.log("day---->", day)
    // console.log("state before set---->", state);
    setState({...state, day})
    // console.log("day in setDay----->", day);
    // console.log("state after---->", state.day);
  }

  useEffect(() => {
    const urlDays = `/api/days`;
    const urlAppointments = `/api/appointments`
    const urlInterviewers = `/api/interviewers`

    const promise1 = axios.get(urlDays);
    const promise2 = axios.get(urlAppointments);
    const promise3 = axios.get(urlInterviewers)

    const promiseArr = [promise1, promise2, promise3]

    Promise.all(promiseArr)
      .then((all)=> {
        // console.log("promise1--->", all[0].data);
        // console.log("promise2--->", all[1].data);
        // console.log("promise3--->", all[2].data);
        // const [first, second] = all;
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data}))
      })


    // axios.get(urlDays)
    //   .then((response) => {
    //     console.log("response.data----->", response.data);
    //     setDays(response.data);
    //   })
  }, [])

  dailyAppointments = getAppointmentsForDay(state, state.day)

  const parsedAppointment = dailyAppointments.map(appointmentObj => {
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
      // {...appointmentObj} 
      />)
  })


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
          <DayList 
            days={state.days}
            value={state.day}
            onChange={setDay} //********* */
          />
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

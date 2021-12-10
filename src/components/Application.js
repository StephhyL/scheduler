import React, {useState, useEffect} from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
// import "components/Appointment"

import "components/Application.scss";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm"
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82.png"
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.png"
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm"
//   }
// ]


export default function Application(props) {
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {}
  })
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  let dailyAppointments = [];

  const setDay = day => setState(prev => ({...prev, day}))
  // const setDays = days => setState(prev => ({...prev, days}))

  // const days = [
  //   {
  //     id:1, 
  //     name: "Monday",
  //     spots:2
  //   },
  //   {
  //     id:2, 
  //     name: "Tuesday",
  //     spots:5
  //   },
  //   {
  //     id:3, 
  //     name: "Wednesday",
  //     spots:0
  //   }
  // ];

  // const updateDate = (day) => {
  //   setDay(day)
  // }

  useEffect(() => {
    let urlDays = `/api/days`;
    let urlAppointments = `/api/appointments`

    let promise1 = axios.get(urlDays);
    let promise2 = axios.get(urlAppointments);

    let promiseArr = [promise1, promise2]

    Promise.all(promiseArr)
      .then((all)=> {
        console.log("promise1--->", all[0].data);
        console.log("promise2--->", all[1].data);
        // const [first, second] = all;
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
      })


    // axios.get(urlDays)
    //   .then((response) => {
    //     console.log("response.data----->", response.data);
    //     setDays(response.data);
    //   })
  }, [])

  dailyAppointments = getAppointmentsForDay(state, state.day)

  const parsedAppointment = dailyAppointments.map(appointmentObj => {
    return <Appointment key={appointmentObj.id} {...appointmentObj}/>
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

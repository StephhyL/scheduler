import { useState, useEffect } from "react";
import axios from "axios";

/**Hook responsible for inital render of page and subsequent renderings. Responsible for passing data to other components*/
export const useApplicationData = () => {
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {},
    interviewers: {},
  });

  /**
   * replaces the interview content at a specific appointment (id) and then updates the appointment list with the updated appointment created (sets new state)
   */
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const urlAppt = `api/appointments/${id}`;

    return axios.put(urlAppt, { interview: interview }).then(() => {
      setState({ ...state, appointments });
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const urlDeleteAppt = `api/appointments/${id}`;
    return axios.delete(urlDeleteAppt).then(() => {
      setState({ ...state, appointments });
    });
  };

  const setDay = (day) => {
    setState({ ...state, day });
  };

  useEffect(() => {
    const urlDays = `/api/days`;
    const urlAppointments = `/api/appointments`;
    const urlInterviewers = `/api/interviewers`;

    const promise1 = axios.get(urlDays);
    const promise2 = axios.get(urlAppointments);
    const promise3 = axios.get(urlInterviewers);

    const promiseArr = [promise1, promise2, promise3];

    Promise.all(promiseArr).then((all) => {
      // console.log("promise1--->", all[0].data);
      // console.log("promise2--->", all[1].data);
      // console.log("promise3--->", all[2].data);
      // const [first, second] = all;
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });

    console.log("in use effect!");
    // axios.get(urlDays)
    //   .then((response) => {
    //     console.log("response.data----->", response.data);
    //     setDays(response.data);
    //   })
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

import { useState, useEffect } from "react";
import axios from "axios";

/** Hook returns an object with state, setDay, bookInterview, and cancelInterview. Also renders inital page*/
export const useApplicationData = () => {
  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {},
    interviewers: {},
  });

  /** Returns a number of available appt spots given state, list of appts */
  const getAvailSpots = (state, appointments) => {
    // an array with object where object day name matches state day
    const targetObjInArr = state.days.filter((day) => day.name === state.day);
    // an array with appointment id
    const dayApptIdArr = targetObjInArr[0].appointments;
    // the length of an array where corresponding appt's interview is null
    const AvailSpots = dayApptIdArr.filter(
      (apptId) => !appointments[apptId].interview
    ).length;

    return AvailSpots;
  };

  /**
   * Returns a promise that sets new state: replaces the interview content at a specific appointment (id), updates the appt list and remaining interview spots
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

    const days = [...state.days];
    const dayIndex = state.days.findIndex((day) =>
      day.appointments.includes(id)
    );
    const spots = getAvailSpots(state, appointments);
    const newDay = {
      ...days[dayIndex],
      spots,
    };

    days[dayIndex] = newDay;

    // makes an axios request to server to update information, then sets state
    const urlAppt = `api/appointments/${id}`;
    return axios.put(urlAppt, { interview: interview }).then(() => {
      setState({ ...state, appointments, days });
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

    const days = [...state.days];
    const dayIndex = state.days.findIndex((day) =>
      day.appointments.includes(id)
    );
    const spots = getAvailSpots(state, appointments);
    const newDay = {
      ...days[dayIndex],
      spots,
    };

    days[dayIndex] = newDay;

    // makes an axios request to server to delete information, then sets state
    const urlDeleteAppt = `api/appointments/${id}`;
    return axios.delete(urlDeleteAppt).then(() => {
      setState({ ...state, appointments, days });
    });
  };

  const setDay = (day) => {
    setState({ ...state, day });
  };

  // upon first render, make axios requests to get inital data, and sets state
  useEffect(() => {
    const urlDays = `/api/days`;
    const urlAppointments = `/api/appointments`;
    const urlInterviewers = `/api/interviewers`;

    const promise1 = axios.get(urlDays);
    const promise2 = axios.get(urlAppointments);
    const promise3 = axios.get(urlInterviewers);

    const promiseArr = [promise1, promise2, promise3];

    Promise.all(promiseArr).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

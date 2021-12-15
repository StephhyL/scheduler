/** returns an array with appointment objects for a given state and day*/
export const getAppointmentsForDay = (state, day) => {
  // get an array with the day object where each day matches the target day
  const filteredState = state.days.filter((dayObj) => dayObj.name === day);

  if (!state.days.length || !filteredState.length) {
    return [];
  }

  // grab the appt id array of from the day object in the filteredState array
  const apptIdArrForDay = filteredState[0].appointments;
  // a new array with appt objects that correspond to the appt ids
  const apptArrForDay = apptIdArrForDay.map(
    (element) => state.appointments[element]
  );

  return apptArrForDay;
};

/** returns an array with interviewer objects for a given state and day */
export const getInterviewersForDay = (state, day) => {
  // get an array with the day object where each day matches the target day
  const filteredState = state.days.filter((dayObj) => dayObj.name === day);

  if (!state.days.length || !filteredState.length) {
    return [];
  }

  // grab the interviewers id array of from the day object in the filteredState array
  const interviewersIdArrForDay = filteredState[0].interviewers;
  // a new array with appt objects that correspond to the interviewers ids
  const interviewersArrForDay = interviewersIdArrForDay.map(
    (element) => state.interviewers[element]
  );

  return interviewersArrForDay;
};

/** given a state and interview, returns an object with the interview where the interviewer key's value now includes the interviewer's name, id, avatar*/
export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const newInterview = {
    ...interview,
    interviewer: state.interviewers[interviewerId],
  };

  return newInterview;
};

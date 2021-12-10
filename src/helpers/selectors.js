export const getAppointmentsForDay = (state, day) => {

  const filteredState = state.days.filter(dayObj => dayObj.name === day); 
  // console.log("filtered State---->", filteredState);

  if (!state.days.length || !filteredState.length) {
    // console.log("state---->", state)
    return [];
  }

  const apptIdArrForDay = filteredState[0].appointments // array of appointments [1,2,3]

  // console.log("apptIdArrForDay---------->", apptIdArrForDay)

  const apptArrForDay = apptIdArrForDay.map((element) => state.appointments[element])

  // console.log(apptArrForDay);
  // console.log("state---->", state)
  return apptArrForDay;
};

export const getInterview = (state, interview) => {
  
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer; // 2

  // interview.interviewer = state.interviewers[interviewerId];
  // ***WRONG

  let newInterview = {...interview, interviewer: state.interviewers[interviewerId]}

  return newInterview;

  // console.log("state--->", state);
  // console.log("interviewerId--->", interviewerId);
  // console.log("interview.interviewer--->", interview.interviewer);

  // let newInterview = {...interview, interviewer: interview.interviewer}
  // console.log("newInterview...", newInterview)

  // return newInterview;
};
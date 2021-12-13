import React from 'react'
import './styles.scss'
import Header from './Header'
import Empty from './Empty'
import Show from './Show'
import useVisualMode from 'hooks/useVisualMode'
import Form from './Form'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = ({id, time, interview, interviewers, bookInterview}) => {

  const {mode, transition, back} = useVisualMode(interview? SHOW : EMPTY)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview);
    transition(SHOW)
  };
  
  return (
    <article className="appointment">
      {time && <Header time={time}/>}
      {mode === EMPTY && (
       <Empty 
        onAdd={() => {transition(CREATE)}}
       />)}
      {mode === SHOW && (
        <Show 
          student={interview.student} 
          interviewer={interview.interviewer.name}
          />) }
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          onCancel = {()=>{back()}}
          onSave = {save}
        />
      )}
    </article>
  )
}

export default Appointment

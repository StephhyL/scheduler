import React from 'react'
import './styles.scss'
import Header from './Header'
import Empty from './Empty'
import Show from './Show'
import useVisualMode from 'hooks/useVisualMode'
import Form from './Form'
import Status from './Status'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";

const Appointment = ({id, time, interview, interviewers, bookInterview}) => {

  const {mode, transition, back} = useVisualMode(interview? SHOW : EMPTY)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    bookInterview(id, interview);
    transition(SHOW);
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
      {mode === SAVE && (
        <Status message="Saving!!!"/>
      )
      }
    </article>
  )
}

export default Appointment

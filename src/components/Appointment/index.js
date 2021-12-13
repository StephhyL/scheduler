import React from 'react'
import './styles.scss'
import Header from './Header'
import Empty from './Empty'
import Show from './Show'
import useVisualMode from 'hooks/useVisualMode'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

const Appointment = ({id, time, interview, interviewers, bookInterview, cancelInterview}) => {

  const {mode, transition, back} = useVisualMode(interview? SHOW : EMPTY)

  console.log('mode--->', mode)
  console.log('interview--->', interview)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    console.log("interview---->", interview)
    bookInterview(id, interview);
    transition(SHOW);
  };
  
  const remove = () => {
    transition(DELETE); // replace with delete later
    console.log("id coming into remove function ---->", id)
    cancelInterview(id);
    transition(EMPTY);
  }

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
          onDelete={()=> {transition(CONFIRM)}}
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
      {mode === DELETE && (
        <Status message="Deleting"/>
      )
      }
      {mode === CONFIRM && (
        <Confirm 
        message="Are you sure you would like to delete?"
        onCancel={()=>{back()}}
        onConfirm={remove}
        />
      )
      }
    </article>
  )
}

export default Appointment

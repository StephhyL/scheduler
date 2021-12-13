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
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

const Appointment = ({id, time, interview, interviewers, bookInterview, cancelInterview}) => {

  const {mode, transition, back} = useVisualMode(interview? SHOW : EMPTY)

  // console.log('mode--->', mode)
  // console.log('interview--->', interview)

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(()=>{
        transition(SHOW);
      })
  };
  console.log("mode2--->", mode)
  
  const remove = () => {
    transition(DELETE); // replace with delete later
    console.log("id coming into remove function ---->", id)
    cancelInterview(id)
      .then(()=>{
        transition(EMPTY);
      });
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
          onEdit = {()=>transition(EDIT)}
          onDelete={()=> {transition(CONFIRM)}}
          />) }
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          onCancel = {()=>{back()}}
          onSave = {save}
        />
      )}
      {mode === SAVING && (
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
      {mode === EDIT && (
        <Form 
          student = {interview.student}
          interviewer = {interview.interviewer.id}
          interviewers={interviewers}
          // onCancel = {()=> transition(SHOW)}
          onCancel = {()=>{back()}}
          onSave = {save}
          // transition = {transition}
        />
      )}
    </article>
  )
}

export default Appointment

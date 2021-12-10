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

const Appointment = ({time, interview}) => {
  const {mode, transition, back} = useVisualMode(interview? SHOW : EMPTY)

  console.log(mode);

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
          interviewers={[]}
          onCancel = {()=>{back()}}
        />
      )}
    </article>
  )
}

export default Appointment

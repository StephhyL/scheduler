import React from 'react'
import './styles.scss'
import Header from './Header'
import Empty from './Empty'
import Show from './Show'

const Appointment = ({time, interview}) => {
  // console.log("interview-in index--->", interview)
  return (
    <article className="appointment">
      {time && <Header time={time}/>}
      {interview ? 
        <Show student={interview.student} interviewer={interview.interviewer.name}/> :
         <Empty />}
    </article>
  )
}

export default Appointment

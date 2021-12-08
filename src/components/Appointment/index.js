import React from 'react'
import './styles.scss'

const Appointment = ({time}) => {
  return (
    <article className="appointment">
      {!time && "No Appointments"}
      {time && `Appointment at ${time}`}
    </article>
  )
}

export default Appointment

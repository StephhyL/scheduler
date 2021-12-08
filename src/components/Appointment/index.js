import React from 'react'
import './styles.scss'
import Header from './Header'

const Appointment = ({time}) => {
  return (
    <article className="appointment">
      <Header />
      {!time && "No Appointments"}
      {time && `Appointment at ${time}`}
    </article>
  )
}

export default Appointment

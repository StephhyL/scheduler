import React from 'react'
import './styles.scss'
import Header from './Header'
import Empty from './Empty'

const Appointment = ({time}) => {
  return (
    <article className="appointment">
      <Header />
      <Empty />
    </article>
  )
}

export default Appointment

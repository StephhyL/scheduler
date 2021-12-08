import React from 'react'
import './styles.scss'
import Header from './Header'
import Empty from './Empty'
import Show from './Show'
import Confirm from './Confirm'

const Appointment = ({time}) => {
  return (
    <article className="appointment">
      <Header />
      <Empty />
    </article>
  )
}

export default Appointment

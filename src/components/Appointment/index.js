import React, {Fragment} from 'react'
import './styles.scss'
import Header from './Header'
import Empty from './Empty'
import Show from './Show'
import Confirm from './Confirm'
import Status from './Status'
import Form from './Form'

const Appointment = ({time, interview}) => {
  return (
    <article className="appointment">
      {time && <Header time={time}/>}
      {interview ? <Show /> : <Empty />}
      {/* <Empty />
      <Show /> */}
    </article>
  )
}

export default Appointment

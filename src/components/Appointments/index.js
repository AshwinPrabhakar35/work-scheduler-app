import './index.css'
import {useState} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'


const ReactApp =()=>{
  const [appointmentsList, setAppointmentsList] = useState([])
  const [titleInput, setTitleInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [isFilterActive, setIsFilterActive] = useState(false)

  const toggleIsStarred = id => {
    setAppointmentsList(prevList =>
      prevList.map(appointment =>
        appointment.id === id
          ? {...appointment, isStarred: !appointment.isStarred}
          : appointment,
      ),
    )
  }

  const onAddAppointment = event => {
    event.preventDefault()
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    setAppointmentsList(prevList => [...prevList, newAppointment])
    setTitleInput('')
    setDateInput('')
  }

  const filteredAppointmentsList = isFilterActive
    ? appointmentsList.filter(appointment => appointment.isStarred)
    : appointmentsList

  return (
    <div className="app-con">
      <div className="res-con">
        <div className="appointment-con">
          <div className="add-appointment-con">
            <form className="form" onSubmit={onAddAppointment}>
              <h1 className="add-appointment-heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={event => setTitleInput(event.target.value)}
                className="input"
                placeholder="Title"
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                id="date"
                value={dateInput}
                onChange={event => setDateInput(event.target.value)}
                className="input"
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>
          <hr className="hr" />
          <div className="header-with-filter-con">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={`filter-style ${
                isFilterActive ? 'filter-filled' : 'filter-empty'
              }`}
              onClick={() => setIsFilterActive(prev => !prev)}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentsList.map(appointment => (
              <AppointmentItem
                key={appointment.id}
                appointmentDetails={appointment}
                toggleIsStarred={toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ReactApp
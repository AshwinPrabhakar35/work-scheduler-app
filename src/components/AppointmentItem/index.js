import {Component} from 'react'
import './index.css'

class AppointmentItem extends Component {
  onClickStar = () => {
    const {appointmentDetails, toggleIsStarred} = this.props
    toggleIsStarred(appointmentDetails.id)
  }

  render() {
    const {appointmentDetails} = this.props
    const {title, date, isStarred} = appointmentDetails

    const starImgUrl = isStarred
      ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

    return (
      <li className="appointment-item">
        <div className="header-con">
          <p className="title">{title}</p>
          <button
            className="star-button"
            type="button"
            onClick={this.onClickStar}
            aria-label="Toggle Star"
          >
            <img src={starImgUrl} className="star" alt="star" />
          </button>
        </div>
        <p className="date">Date: {date}</p>
      </li>
    )
  }
}

export default AppointmentItem
